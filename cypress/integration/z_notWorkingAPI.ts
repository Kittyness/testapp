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

describe("Checking Adding customer via API", function() {
  xit("Cashier should be able to add customer to sale", function() {
    // Add customer if doesn't exist
    let customerId: any = api.getCustomerId(currentCustomer);
    if (customerId !== "") {
      console.log("LOGGING THE CUSTOMER ID");
      console.log(customerId);
    } else {
      api.createCustomer(currentCustomer);
    }

    login(Cypress.env("cashierUser"), Cypress.env("cashierPassword"));
    customer.addExistingCustomer(currentCustomer.name);
    customer.checkCustomerIsAddedToSale(currentCustomer);
    customer.removeCustomerFromSale();

    // Delete customer if it exists
    if (customerId !== "") {
      console.log("LOGGING THE CUSTOMER ID");
      console.log(customerId);
      api.deleteCustomer(customerId);
    }
  });
});
