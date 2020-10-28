import * as customer from "../support/customer";
import * as api from "../support/API/customerAPI";
import { login, logout } from "../support/setup";

const currentCustomer: customer.CustomerInfo = {
  name: "Tony Stark",
  firstName: "Tony",
  customerGroup: "All Customers",
  lastName: "Stark",
  customerCode: "TonyStark-111",
  customerEmail: "tony@starkinc.com",
  phone: "1234567890"
};

const updatedCustomer: customer.CustomerInfo = {
  name: "Iron Man",
  firstName: "Iron",
  customerGroup: "All Customers",
  lastName: "Man",
  customerCode: "TonyStark-111",
  customerEmail: "tony@starkinc.com",
  phone: "1234567890"
};

describe("Checking Adding customer via API", function() {
  it("Cashier should be able to add customer to sale", function() {
    // We definitely know that this customer doesn't exist
    api.createCustomer(currentCustomer);
    // Need the timeout to update the search
    login(Cypress.env("cashierUser"), Cypress.env("cashierPassword"));
    customer.addExistingCustomer(currentCustomer.name);
    customer.checkCustomerIsAddedToSale(currentCustomer);
    customer.removeCustomerFromSale();
  });

  it("Cashier should be able to add customer to sale with updated details", function() {
    // We definitely know that the customer with a particular customer ID exists
    api.getCustomerId(currentCustomer).then(customerId => {
      api.updateCustomer(updatedCustomer, customerId);
    });
    login(Cypress.env("cashierUser"), Cypress.env("cashierPassword"));
    // Need the timeout to update the search
    customer.addExistingCustomer(updatedCustomer.name);
    customer.checkCustomerIsAddedToSale(updatedCustomer);
    customer.removeCustomerFromSale();
  });

  it("Cashier should not be able to add customer to sale - customer deleted", function() {
    // We definitely know that the customer with a particular customer ID exists
    api.getCustomerId(updatedCustomer).then(customerId => {
      api.deleteCustomer(customerId);
    });
    login(Cypress.env("cashierUser"), Cypress.env("cashierPassword"));
    cy.get(".wr-customer-search vd-autocomplete .vd-autocomplete-input").type(
      updatedCustomer.name
    );
    cy.get(".vd-suggestion").should("contain", "as a new customer");
  });
});
