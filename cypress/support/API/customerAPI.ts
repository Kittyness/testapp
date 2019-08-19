/// <reference types="Cypress" />

import { CustomerInfo } from "../customer";

const authHeaders = {
  Authorization: `Bearer ${Cypress.env("accessToken")}`
};

export function createCustomer(customer: CustomerInfo) {
  return cy.request({
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

export function updateCustomer(
  updatedCustomer: CustomerInfo,
  customerId: string
) {
  return cy.request({
    url: `/api/2.0/customers/${customerId}`,
    method: "PUT",
    headers: authHeaders,
    body: {
      customer_code: updatedCustomer.customerCode,
      name: updatedCustomer.name,
      first_name: updatedCustomer.firstName,
      last_name: updatedCustomer.lastName,
      phone: updatedCustomer.phone,
      email: updatedCustomer.email
    }
  });
}

export function deleteCustomer(customerId: string) {
  return cy.request({
    url: `/api/2.0/customers/${customerId}`,
    method: "DELETE",
    headers: authHeaders,
    body: {}
  });
}

export function getCustomerId(customer: CustomerInfo) {
  return cy
    .request({
      url: "/api/2.0/customers/",
      method: "GET",
      headers: authHeaders
    })
    .then(response =>
      response.body.data.find(
        cust => cust.customer_code === customer.customerCode
      )
    )
    .then(parsedCustomer => {
      console.log("getCustomerId - PARSED RESULT");
      console.log(parsedCustomer.id);
      return parsedCustomer.id as string;
    });
}
