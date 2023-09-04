describe('Login and logout test', () => {
  it('Should render the login page', () => {
    cy.visit('http://localhost:3000');
  });
  it('Should type email and password', () => {
    cy.get('#email')
      .type('testmail@mail.com')
      .should('have.value', 'testmail@mail.com');
    cy.get('#password').type('b');
  });
  it('Should display Incorrect login', () => {
    cy.get('button').click();
    expect(cy.contains('Incorrect login'));
  });
  it('Should display home page', () => {
    cy.get('#password').clear().type('123');
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

describe('Search component test', () => {
  it('Should render the home page', () => {
    cy.visit('http://localhost:3000');
    cy.get('#email').type('testmail@mail.com');
    cy.get('#password').clear().type('123');
    cy.get('button').click();
  });

  it('Should select vegetarian on options', () => {
    cy.get('select').select('Vegetarian');
  });

  it('Should submit options and update home results', () => {
    cy.get('form').submit();
  });
});
