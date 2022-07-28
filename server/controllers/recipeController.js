const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');
const Instruction = require('../models/Instruction');

const createRecipe = async (req, res) => {
    try {
        // console.log(JSON.stringify(
        //     {
        //         recipeName: "pasta",
        //         ingredients: [{name: 'water'}],
        //         instructions: [{title: 'it is an instruction'}, {temperature: 200}]
        //     }
        // ));
        // console.log(typeof req.body.instructions);
        // => {"title":"pasta","ingredients":[{"name":"water"}],"instructions":[{"text":"it is an instruction"},{"temperature":200}]}

        let ingredients = req.body.ingredients;
        let instructions = req.body.instructions;
        const newRecipe = await Recipe.create({
            title: req.body.title,
            description: req.body.description,
            img_url: req.body.img_url,
            img_alt_text: req.body.img_alt_text,
            total_time: req.body.total_time,
            id_tasty: req.body.id_tasty,
            // todo add here user id from session
            UserId: 1
        });

        ingredients.map(ingredient => {
            Ingredient.create({
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: ingredient.quantity,
                RecipeId: newRecipe.id
            });
        })

        instructions.map(instruction => {
            Instruction.create({
                text: instruction.text,
                temperature: instruction.temperature,
                RecipeId: newRecipe.id
            });
        })

        res.json({"message": "Recipe successfully created"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "due to error recipe is not created"});
    }
}


const removeRecipe = async (req, res) => {
    try {
        // const id = req.body.id;
        const id = req.params.id;

        await Recipe.destroy({ where: { id: id } });
        res.json({"message": "Recipe has been successfully removed"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error recipe has not been created"})
    }
}

module.exports = { createRecipe, removeRecipe }
