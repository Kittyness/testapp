/// <reference types="Cypress" />

import { CustomerInfo } from "../customer";

const authHeaders = {
  Authorization: `Bearer ${Cypress.env("accessToken")}`
};

export function createCustomer(customer: CustomerInfo) {
  cy.request({
    url: "/api/2.0/customers",
    method: "POST",
    headers: authHeaders,
    body: {
      customer_code: customer.customerCode,
      name: customer.name,
      first_name: customer.firstName,
      last_name: customer.lastName,
      phone: customer.phone,
      email: customer.email
    }
  });
}
