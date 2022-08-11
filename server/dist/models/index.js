"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config();
const sequelize = new sequelize_1.Sequelize('postgres', 'postgres', process.env.PASSWORD_DB, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});
exports.default = sequelize;
