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

describe('Sign up Test', () => {
	it('Should render the signup page', () => {
		cy.visit('http://localhost:3000/signup');
	});
	it('Should type name, email, password and confirm password', () => {
		cy.get('#name').type('New User').should('have.value', 'New User');
		cy.get('#email').type('testEmail@mail.com').should('have.value', 'testEmail@mail.com');
		cy.get('#password').type('123').should('have.value', '123');
		cy.get('#confirm-password').type('123').should('have.value', '123');
	});
	it('Should display home page', () => {
		cy.get('button').click();
		cy.url().should('include', '/home');
	});
});

describe('Search component test', () => {
	it('Should render the home page', () => {
		cy.visit('http://localhost:3000');
		cy.get('#email').type('a@a.com');
		cy.get('#password').clear().type('a');
		cy.get('button').click();
	});

	it('Should select vegetarian on options', () => {
		cy.get('select').select('Vegetarian');
	});

	it('Should submit options and update home results', () => {
		cy.get('form').submit();
	});
});
