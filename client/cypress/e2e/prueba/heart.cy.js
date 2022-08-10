describe('Add recipes to my list', () => {
  it('Should render the home page', () => {
    cy.visit('http://localhost:3000');
    cy.get('#email').type('testmail@mail.com');
    cy.get('#password').clear().type('123');
    cy.get('button').click();
  });

  it('Should change first element to red heart', () => {
    cy.get('[data-testid=icon-no-fav]:nth(2)').click();
    cy.get('[data-testid=icon-no-fav]:nth(1)').click();
  });
});
