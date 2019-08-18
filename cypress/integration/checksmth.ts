/// <reference types="Cypress" />

import * as setup from "../support/setup";
import * as sale from "../support/sale";
import * as product from "../support/product";
import * as customer from "../support/customer";

describe("Checking Smth", function() {
  beforeEach(function() {
    setup.login(Cypress.env("cashierUser"), Cypress.env("cashierPassword"));
  });

  const currentProduct: product.ProductInfo = {
    name: "Chocolate",
    price: "4.50",
    taxRate: 15
  };

  const currentCustomer: customer.CustomerInfo = {
    customerGroup: "VIP",
    firstName: "Emmanuel",
    lastName: "Macron",
    customerCode: "Emmanuel-547Q",
    name: "Emmanuel Macron",
    phone: "33-1-234-5678"
  };

  it("Cashier should be able to add product and customer to sale", function() {
    customer.addExistingCustomer(currentCustomer.name);
    customer.checkCustomerIsAddedToSale(currentCustomer);
    product.addProduct(currentProduct.name);
    // Check available options
    sale.checkEnabledSaleHeaderActions();
    // sale.checkProductIsAddedToSale(currentProduct, true);
    sale.clickPayButton();
    setup.logout(Cypress.env("cashierUser"));
  });

  it("Cashier should be able to delete product and customer from sale", function() {
    cy.get(".sale-list .sale-list-item")
      .eq(0)
      .find(".li-cell-summary--remove")
      .click();
    sale.checkProductIsAddedToSale(currentProduct, false);
    customer.removeCustomerFromSale();
  });
});

describe("Checking Manager User", function() {
  beforeEach(function() {
    setup.login(Cypress.env("managerUser"), Cypress.env("managerPassword"));
  });

  const newCustomer: customer.CustomerInfo = {
    customerGroup: "All Customers",
    firstName: "Elvis",
    lastName: "Presley",
    customerCode: "Elvis-777",
    name: "Elvis Presley",
    phone: "64-1-234-5678"
  };

  it("manager should be able to add customer", function() {
    cy.visit("/customer");
    customer.addCustomer(newCustomer);
    cy.visit("/customer");
    customer.checkCustomerExists(newCustomer, true);
  });

  it("manager should be able to delete customer", function() {
    cy.visit("/customer");
    customer.checkCustomerExists(newCustomer, true);
    customer.deleteCustomer(newCustomer);
    customer.checkCustomerExists(newCustomer, false);
  });
});
