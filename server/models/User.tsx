import sequelize from './index';
const {DataTypes} = require('sequelize');
const Recipe = require('./Recipe');
const ShoppingListItem = require('./ShoppingListItem');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

User.hasMany(Recipe, { onDelete: "cascade" });
User.hasMany(ShoppingListItem, { onDelete: "cascade" });

module.exports = User;
