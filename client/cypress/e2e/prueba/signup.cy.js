describe('Sign up Test', () => {
	it('Should render the signup page', () => {
		cy.visit('http://localhost:3000/signup');
	});
	it('Should type name, email, password and confirm password', () => {
		cy.visit('http://localhost:3000/signup');
		cy.get('#name').type('New User').should('have.value', 'New User');
		cy.get('#email').type('testmail@mail.com').should('have.value', 'testmail@mail.com');
		cy.get('#password').type('123').should('have.value', '123');
		cy.get('#confirmPassword').type('12').should('have.value', '12');
	});
	it('Should not allow signup If user exists', () => {
		cy.get('button').should('be.disabled');
		// cy.url().should('include', '/signup');
	});
	it('Should display home page if signed up properly', () => {
		cy.get('#confirmPassword').clear();
		cy.get('#confirmPassword').type('123').should('have.value', '123');
		cy.get('button').click();
		cy.url().should('include', '/home');
	});
});
