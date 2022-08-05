import sequelize from './index';
const {DataTypes} = require('sequelize');

const ShoppingListItem = sequelize.define('ShoppingListItem', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unit: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: true
    },
});


module.exports = ShoppingListItem;