"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
require('dotenv').config();
const sequelize = new sequelize_1.default('postgres', 'postgres', process.env.PASSWORD_DB, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});
module.exports = sequelize;
