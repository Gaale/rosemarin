describe('Search component test', () => {
	it('Should render the home page', () => {
		cy.visit('http://localhost:3000');
		cy.get('#email').type('testmail@mail.com');
		cy.get('#password').type('123');
		cy.get('button').click();
	});

	it('Should select vegetarian on options', () => {
		cy.get('select').select('Vegetarian');
	});

	it('Should submit options and update home results', () => {
		cy.get('form').submit();
	});
});
