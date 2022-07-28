const Sequelize  = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '1111', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres'
})


module.exports = sequelize;