describe('Search component test', () => {
	it('Should render the home page', () => {
		cy.visit('http://localhost:3000');
		cy.get('#email').type('testmail@mail.com');
		cy.get('#password').type('123');
		cy.get('button').click();
	});

	it('Should add & remove Ingredient and Instruction Fields', () => {
		cy.get('#createRecipe').click();
		// cy.visit('http://localhost:3000/create');
		//
		cy.get('#addIngredient').click();
		cy.get('#name-2-ingredient').should('be.visible');
		cy.get('#quantity-2-ingredient').should('be.visible');
		cy.get('#unit-2-ingredient').should('be.visible');

		cy.get('#addInstruction').click();
		cy.get('#text-2-instruction').should('be.visible');

		cy.get('#removeIngredient').click();
		cy.get('#name-2-ingredient').should('not.exist');
		cy.get('#quantity-2-ingredient').should('not.exist');
		cy.get('#unit-2-ingredient').should('not.exist');

		cy.get('#removeInstruction').click();
		cy.get('#text-2-instruction').should('not.exist');
	});

	it('Should type recipe Information', () => {
		cy.get('#title').type('NewIngredient').should('have.value', 'NewIngredient');
		cy.get('#description')
			.type('A really cool new recipe')
			.should('have.value', 'A really cool new recipe');

		cy.get('#addIngredient').click();
		cy.get('#name-1-ingredient').type('Ing1').should('have.value', 'Ing1');
		cy.get('#quantity-1-ingredient').type('2').should('have.value', '2');
		cy.get('#unit-1-ingredient').type('someUnit').should('have.value', 'someUnit');

		cy.get('#name-2-ingredient').type('Ing2').should('have.value', 'Ing2');
		cy.get('#quantity-2-ingredient').type('3').should('have.value', '3');
		cy.get('#unit-2-ingredient').type('someUnit2').should('have.value', 'someUnit2');

		cy.get('#addInstruction').click();
		cy.get('#text-1-instruction')
			.type('Instruction1 REALLY COOL')
			.should('have.value', 'Instruction1 REALLY COOL');
		cy.get('#text-2-instruction')
			.type('Instruction2 REALLY COOL')
			.should('have.value', 'Instruction2 REALLY COOL');

		cy.get('#url')
			.type(
				'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg'
			)
			.should(
				'have.value',
				'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg'
			);

		cy.get('button').click();
	});

	it('Should Clear All fields on submit', () => {
		cy.get('#title').should('have.value', '');
		cy.get('#description').should('have.value', '');

		// cy.get('#name-1-ingredient').should('have.value', '');
		// cy.get('#quantity-1-ingredient').should('have.value', '');
		// cy.get('#unit-1-ingredient').should('have.value', '');

		// cy.get('#name-2-ingredient').should('have.value', '');
		// cy.get('#quantity-2-ingredient').should('have.value', '');
		// cy.get('#unit-2-ingredient').should('have.value', '');

		// cy.get('#text-1-instruction').should('have.value', '');
		// cy.get('#text-2-instruction').should('have.value', '');

		cy.get('#url').should('have.value', '');
	});
	it('Should Show the Recipe', () => {
		cy.get('#home').click();
	});
});
