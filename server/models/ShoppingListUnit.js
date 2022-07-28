const sequelize = require('./index');
const {DataTypes} = require('sequelize');

const ShoppingListUnit = sequelize.define('ShoppingListUnit', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unit: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});


module.exports = ShoppingListUnit;