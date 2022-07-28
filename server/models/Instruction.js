const sequelize = require('./index');
const {DataTypes} = require('sequelize');

const Instruction = sequelize.define('Instruction', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    temperature: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});


module.exports = Instruction;