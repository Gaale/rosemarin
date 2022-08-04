"use strict";
const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('postgres', 'postgres', process.env.PASSWORD_DB, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});
module.exports = sequelize;
