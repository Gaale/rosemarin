const sequelize = require('./index');
const {DataTypes} = require('sequelize');
const Ingredient = require('./Ingredient');
const Instruction = require('./Instruction');

const Recipe = sequelize.define('Recipe', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    img_alt_text: {
        type: DataTypes.STRING,
        allowNull: true
    },
    total_time: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_tasty: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

Recipe.hasMany(Ingredient, { onDelete: "cascade" });
Recipe.hasMany(Instruction, { onDelete: "cascade" });

module.exports = Recipe;