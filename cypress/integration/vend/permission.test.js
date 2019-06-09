/// <reference types="Cypress" />

context('Permissions Test', () => {

    const authHeaders = {
        'Authorization': `Bearer ${Cypress.env('accessToken')}`
    };

    /**
     * Adds or removes the product.delete permission from/to the Manager role.
     * @param {boolean} add Indicates whether the permission needs to be added.
     */
    const addOrRemoveDeletePermission = (add) => {
        cy.request({
            url: '/api/1.0/roles',
            headers: authHeaders
        })
            // Find the Manager role
            .then(response => response.body.data.find(role => role.name === 'Manager'))
            .then(role => {
                // If the permission presense matches the desired outcome.
                if ((!!role.permissions.find(p => p.name === 'product.delete')) === add) {
                    return; // do nothing.
                }

                cy.request({
                    url: `/api/1.0/roles/${role.id}`,
                    method: 'PATCH',
                    headers: authHeaders,
                    body: {
                        permissions: [
                            {
                                name: 'product.delete',
                                value: add ? 1 : 0
                            }
                        ]
                    }
                });
            })
    };

    [
        { permissionExists: true },
        { permissionExists: false }
    ].forEach(testCase => {
        it(`should ${testCase.permissionExists ? 'enable' : 'disable'} Delete Product for Manager`, () => {
            addOrRemoveDeletePermission(testCase.permissionExists);
            
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
});