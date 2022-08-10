"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { DataTypes } = require('sequelize');
const Recipe_1 = __importDefault(require("./Recipe"));
const ShoppingListItem_1 = __importDefault(require("./ShoppingListItem"));
const User = index_1.default.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
User.hasMany(Recipe_1.default, { onDelete: 'cascade' });
User.hasMany(ShoppingListItem_1.default, { onDelete: 'cascade' });
module.exports = User;
