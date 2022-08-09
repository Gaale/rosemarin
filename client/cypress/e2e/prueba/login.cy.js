describe('Login and logout test', () => {
  it('Should render the login page', () => {
    cy.visit('http://localhost:3000');
  });
  it('Should type email and password', () => {
    cy.get('#email').type('a@a.com').should('have.value', 'a@a.com');
    cy.get('#password').type('b');
  });
  it('Should display Incorrect login', () => {
    cy.get('button').click();
    expect(cy.contains('Incorrect login'));
  });
  it('Should display home page', () => {
    cy.get('#password').clear().type('a');
    cy.get('button').click();

    cy.url().should('include', '/home');
  });
  it('Should display logout message', () => {
    cy.get('#logout').click();

    cy.url().should('include', '/logout');
  });

  it('Should logout and go back to login page', () => {
    cy.get('button:first').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });
});
