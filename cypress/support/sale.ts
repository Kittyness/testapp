import { ProductInfo } from "./product";

export function getSaleHeaderButton(label: string) {
  return cy.get(".sale-actions .vd-btn").contains(label);
}

export function checkEnabledSaleHeaderActions() {
  getSaleHeaderButton("Retrieve Sale").should("be.enabled");
  getSaleHeaderButton("Park Sale").should("be.enabled");
  getSaleHeaderButton("Discard Sale").should("be.enabled");
}

export function clickPayButton() {
  return cy.get(".sale-footer .btn--pay").click();
}

export function checkProductIsAddedToSale(
  product: ProductInfo,
  added: boolean
) {
  if (added) {
    cy.get(".li-cell-summary--name-container .pro-li-cell-summary-name")
      .contains(product.name)
      .should("exist");
  } else {
    cy.get(".li-cell-summary--name-container .pro-li-cell-summary-name").should(
      "not.exist"
    );
  }
}
