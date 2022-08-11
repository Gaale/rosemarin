"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { DataTypes } = require('sequelize');
const ShoppingListItem = index_1.default.define('ShoppingListItem', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});
exports.default = ShoppingListItem;
