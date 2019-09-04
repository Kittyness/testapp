/// <reference types="Cypress" />

const SALE_CUSTOMER = ".sale .sale-header";

export interface CustomerInfo {
  firstName: string;
  lastName?: string;
  name?: string;
  companyName?: string;
  customerGroup: string;
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
      .type(name);

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

export function addCustomer(customer: CustomerInfo) {
  cy.get(".vd-button-group .vd-button--primary").click();

  cy.get("#vend_customer_customer_contact_first_name").type(customer.firstName);
  cy.get("#vend_customer_customer_contact_last_name").type(customer.lastName);
  cy.get("#vend_customer_customer_code").type(customer.customerCode);
  cy.get("#vend_customer_customer_contact_phone").type(customer.phone);

  cy.get(".form-button-bar .btn--primary").click();
}

export function checkCustomerExists(customer: CustomerInfo, exists: boolean) {
  cy.get(".cv-expand-customer .vd-text--secondary")
    .contains(customer.customerCode)
    .should(exists ? "exist" : "not.exist");
}

export function deleteCustomer(customer: CustomerInfo) {
  cy.get(".cv-expand-customer .vd-text--secondary")
    .contains(customer.customerCode)
    .click();
  cy.get(`.delete-dialog[title='${customer.name}']`).click();
  cy.get(".vd-button--negative").click();
}
