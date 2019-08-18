/// <reference types="Cypress" />

import * as customer from "../support/customer";
import * as api from "../support/API/customerAPI";
import { login } from "../support/setup";

const currentCustomer: customer.CustomerInfo = {
  name: "Tony Stark",
  firstName: "Tony",
  customerGroup: "All Customers",
  lastName: "Stark",
  customerCode: "TonyStark-111",
  email: "tony@starkinc.com",
  phone: "1234567890"
};

describe("Checking Adding customer via API", function() {
  it("Cashier should be able to add customer to sale", function() {
    api.createCustomer(currentCustomer);
    login(Cypress.env("cashierUser"), Cypress.env("cashierPassword"));
    customer.addExistingCustomer(currentCustomer.name);
    customer.checkCustomerIsAddedToSale(currentCustomer);
  });
});
