export function login(username: string, password: string) {
  cy.visit("/signin", { failOnStatusCode: false });
  cy.get("#signin_username").type(username);

  cy.get("#signin_password").type(password);

  cy.get('[name="signin_submit"]').click();

  cy.get('.nv-topnav-content').should('contain', username)

}

export function logout(username: string) {
  cy.get(".vd-nav-item-label")
    .contains(username)
    .click();
  cy.get(".vd-flex .vd-text--negative").click();
}
