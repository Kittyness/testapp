const authHeaders = {
    'Authorization': `Bearer ${Cypress.env('accessToken')}`
};

/**
     * Adds or removes the @param {string} permissionName from/to the @param {string} roleName.
     * @param {boolean} add Indicates whether the permission needs to be added.
     */
    export function addOrRemovePermission (add, roleName, permissionName) {
    cy.request({
        url: '/api/1.0/roles',
        headers: authHeaders
    })
        // Find the appropriate role
        .then(response => response.body.data.find(role => role.name === roleName))
        .then(role => {
            // If the permission presense matches the desired outcome.
            if ((!!role.permissions.find(p => p.name === permissionName)) === add) {
                return; // do nothing.
            }
            cy.request({
                url: `/api/1.0/roles/${role.id}`,
                method: 'PATCH',
                headers: authHeaders,
                body: {
                    permissions: [
                        {
                            name: permissionName,
                            value: add ? 1 : 0
                        }
                    ]
                }
            });
        });
}