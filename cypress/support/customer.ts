const SALE_CUSTOMER = ".sale .sale-header";

export interface CustomerInfo {
  firstName: string;
  lastName?: string;
  name?: string;
  companyName?: string;
  customerGroup: string;
  customerEmail: string;
  customerCode?: string;
  phone?: string;
  email?: string;
}

export function addExistingCustomer(name: string) {
  function enterCustomerNameAndSelectFromAutocomplete(tryNumber: number) {
    if (tryNumber > 10) {
      assert.fail(false, true, "Too many tries.");
    }

    cy.get(".wr-customer-search vd-autocomplete .vd-autocomplete-input")
      .clear()
      .type(name, { delay: 50 });

    cy.get(".vd-suggestion").then(elements => {
      let actual = elements.not(".pro-suggestion-create"); // Excluding the add new option.
      if (actual.length) {
        cy.wrap(actual.eq(0)).click();
        
      } else {
        cy.wait(200);

        // Another try.
        return enterCustomerNameAndSelectFromAutocomplete(tryNumber + 1);
      }
    });
  }

  enterCustomerNameAndSelectFromAutocomplete(0);
}

export function checkCustomerBadgeDetails(
  customer: CustomerInfo,
  containerClass: string = SALE_CUSTOMER
) {
  cy.get(`${containerClass} .wr-customer-badge`).as("customerBadge");

  cy.get("@customerBadge")
    .find(".vd-id-badge__header-title")
    .should("contain", customer.name);

  cy.get("@customerBadge")
    .find(".vd-id-badge__description")
    .should("contain", customer.customerCode);

  cy.get("@customerBadge")
    .find(".vd-id-badge__description")
    .should("contain", customer.phone);

  cy.get("@customerBadge")
    .find(".vd-flag")
    .should("contain", customer.customerGroup);

  cy.get("@customerBadge")
    .find(".wr-customer-badge-content .vd-avatar")
    .should("be.visible");
}

export function checkCustomerIsAddedToSale(customer: CustomerInfo) {
  checkCustomerBadgeDetails(customer);
}

export function removeCustomerFromSale() {
  cy.get(`${SALE_CUSTOMER} .wr-customer-badge`)
    .find(".wr-customer-badge-remove")
    .click();
}


function enterData(data:string) {
  return cy.get(`[name="${data}"]`)
}

export function addCustomer(customer: CustomerInfo) {
  cy.get(".vd-btn-group ,vd-btn").contains('Add Customer').click();
  
  
  enterData("customer.firstName").type(customer.firstName);
  enterData("customer.lastName").type(customer.lastName);
  enterData("customer.email").type(customer.customerEmail);
  enterData("customer.mobile").type(customer.phone);

  cy.get('.vd-tabs .vd-tab-button').contains('Details').click();
  enterData("customer.customerCode").type(customer.customerCode);

  cy.get(".vd-dialog-actions .vd-btn--do").click();
  cy.wait(1000);
}

export function checkCustomerExists(customer: CustomerInfo, exists: boolean) {
  cy.get(".vd-table-list-cell .vd-id-badge__content")
    .contains(customer.customerCode)
    .should(exists ? "exist" : "not.exist");
}

export function deleteCustomer(customer: CustomerInfo) {
  cy.get(".vd-table-list-cell .vd-id-badge__content")
    .contains(customer.customerCode)
    .click();
  cy.get('.vd-table-list-row--expanded-content .vd-table-list-expanded-actions .vd-btn').contains('Delete').click();
  cy.get(".vd-btn--no").click();
}
