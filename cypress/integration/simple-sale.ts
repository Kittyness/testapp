/// <reference types="Cypress" />

import * as product from "../support/product";

describe("Simple Test for a Cashier", function() {
  it("Adding a product to a sale", function() {
    cy.visit("/signin", { failOnStatusCode: false });
    cy.get("#signin_username")
      .should("be.visible")
      .type("Cashier");

    cy.get("#signin_password").type("testCashier");

    cy.get('[name="signin_submit"]').click();

    cy.get(".nv-topnav-content .vd-nav-item-label")
      .contains("Cashier")
      .should("be.visible");

    const currentProduct: product.ProductInfo = {
      name: "Chocolate Brown",
      price: "3.50",
      taxRate: 15,
      taxLabel: "GST"
    };

    const taxValue = "0.46";

    cy.get(".wr-global-search vd-autocomplete .vd-autocomplete-input").type(
      currentProduct.name
    );

    // Select the first product from suggestions
    cy.get("vd-suggestion")
      .eq(0)
      .parent()
      .click();

    cy.get(".sale-list > .sale-list-item")
      .eq(0)
      .should("contain", currentProduct.price);

    cy.get(".sale-total-line.sale-add-line.pro-total-line-total-tax")
      .should("contain", "Tax")
      .should("contain", currentProduct.taxLabel)
      .should("contain", taxValue);

    cy.get(".sale-footer .btn--pay .label-and-items-container")
      .should("contain", "Pay")
      .should("contain", "1 item");

    cy.get(".sale-footer .btn--pay .pay-action-value").should(
      "contain",
      `$${currentProduct.price}`
    );

    // Pay for Sale
    cy.get(".pro-sale-ready .btn--pay").click();

    cy.contains(".pro-payments-ready .btn--payment-type", "Cash").click();

    cy.get(".btn--complete-sale")
      .contains("Done (ESC)")
      .click();
  });
});
