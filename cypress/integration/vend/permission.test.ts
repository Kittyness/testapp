/// <reference types="Cypress" />
import { addOrRemovePermission } from '../../support/API/role'

context('Permissions Test', () => {
    [
        { permissionExists: true },
        { permissionExists: false }

    ].forEach(testCase => {
        it(`should ${testCase.permissionExists ? 'enable' : 'disable'} Delete Product for Manager`, () => {
            addOrRemovePermission(testCase.permissionExists, "Manager", "product.delete");
            
            cy.visit('/signin', { failOnStatusCode: false });
            cy.get('#signin_username')
                .should('be.visible')
                .type(Cypress.env("managerUser"));
            
            cy.get('#signin_password')
                .type(Cypress.env("managerPassword"));
    
            cy.get('[name="signin_submit"]')
                .click();
    
           cy.get('.nv-topnav-content .vd-nav-item-label')
                .contains(Cypress.env("managerUser"))
                .should('be.visible');
    
            cy.get('.vd-sidebar-tabs .vd-nav-item-action')
                .contains("Products")
                .click();
    
            cy.get('table.p-table tr td .p-link .vd-id-badge')
                .first()
                .click();
    
            cy.get('[value="Delete Product"]')
                .should(testCase.permissionExists ? 'be.visible' : 'not.be.visible');
        });
    });

    it(`should not ${true ? 'enable' : 'disable'} Delete Product for Cashier`, () => {
        addOrRemovePermission(true, "Cashier", "reporting.payments");
        
        cy.visit('/signin', { failOnStatusCode: false });
        cy.get('#signin_username')
            .should('be.visible')
            .type(Cypress.env("cashierUser"));
        
        cy.get('#signin_password')
            .type(Cypress.env("cashierPassword"));

        cy.get('[name="signin_submit"]')
            .click();

       cy.get('.nv-topnav-content .vd-nav-item-label')
            .contains(Cypress.env("cashierUser"))
            .should('be.visible');

        cy.get('.vd-sidebar-tabs .vd-nav-item-action')
            .contains("Reporting")
            .click();

        cy.get('.vd-nav-item-action')
            .should('contain', 'Inventory Reports');

            cy.get('.vd-nav-item-action')
            .should('not.contain', 'Payment Reports');
    });

});