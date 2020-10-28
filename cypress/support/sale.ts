import { ProductInfo } from "./product";

export function getSaleHeaderButton(label: string) {
  return cy.get(".sale-actions .vd-btn").contains(label);
}

export function checkEnabledSaleHeaderActions() {
  getSaleHeaderButton("Retrieve Sale").should("be.enabled");
  getSaleHeaderButton("Park Sale").should("be.enabled");
  getSaleHeaderButton("More Actions").should("be.enabled");
}

export function clickPayButton() {
  cy.wait(500)
  cy.get('.btn--pay')
    .should('not.be.disabled')
    .click()
}

export function selectPaymentType(paymentType: string) {
  cy.contains('.pro-payments-ready .btn--payment-type', paymentType).click()
}

export function clickCompleteSale() {
  cy.get('.btn--complete-sale')
    .should('contain', 'Complete Sale')
    .click()
}

export function checkProductIsAddedToSale(
  product: ProductInfo,
  added: boolean
) {
  if (added) {
    cy.get(".li-cell-summary--name-container .pro-li-cell-summary-name")
      .contains(product.name)
      .should("exist");
      cy.get(".li-cell-summary--name-container .wr-li-cell-summary-price-value")
      .contains(product.price)
      .should("exist");
  } else {
    cy.get(".li-cell-summary--name-container .pro-li-cell-summary-name").should(
      "not.exist"
    );
  }
}
