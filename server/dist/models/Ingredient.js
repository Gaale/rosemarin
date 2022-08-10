"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { DataTypes } = require('sequelize');
const Recipe = require('./Recipe');
const Ingredient = index_1.default.define('Ingredient', {
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
    recipeId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Ingredient;
