/// <reference types="Cypress" />

export interface ProductInfo {
  name: string;
  price: string;
  taxRate: number;
  taxLabel?: string;
  description?: string;
  supplierPrice?: string;
  initialQuantity?: string;
  sku?: string;
}

export function addProduct(name: string) {
  cy.get(".wr-global-search vd-autocomplete .vd-autocomplete-input").type(name);

  // Select the first product from suggestions
  cy.get(".vd-suggestion")
    .eq(0)
    .parent()
    .click();
}

export function getAddProductButton() {
  return cy.get(".vd-btn-group .vd-btn--do").contains("Add Product");
}

export function addNewProduct(product: ProductInfo) {
  cy.get(".vd-btn-group .vd-btn--do")
    .contains("Add Product")
    .click();
  cy.get("[data-cy=product-name]").type(product.name);
  cy.get(".vd-field .mce-edit-area").type(product.description);
  cy.get(".vd-radio-input-container .vd-radio-label")
    .contains("Enter a custom SKU")
    .closest(".vd-radio-input-container")
    .find(".vd-radio-input")
    .click();
  cy.get("[data-cy=sku-input]").type(product.sku);
  cy.get("#supply-price-standard").type(product.supplierPrice);
  cy.get(".pro-inventory-value input").type(product.initialQuantity);
  cy.get("[data-cy=retail-price-including-tax-input]").type(product.price);
  cy.get("[data-cy=save-button]").click();
}

export function deleteExistingProduct(product: ProductInfo) {
  cy.reload();
  cy.get(".vd-id-badge__content")
    .contains(product.sku)
    .click();
  cy.get(".button-bar .js-track-click-delete").click();
  cy.get(".lightbox-button-bar .vd-button--negative").click();
}

export function productExists(product: ProductInfo, exists: boolean) {
  cy.reload();
  cy.wait(5000);
  cy.reload();
  cy.reload();
  getProductBySKU(product.sku).should(exists ? "exist" : "not.exist");
}

function getProductBySKU(sku: string) {
  return cy.get(".content").contains(sku);
}
