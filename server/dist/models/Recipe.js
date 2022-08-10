"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { DataTypes } = require('sequelize');
const Ingredient_1 = __importDefault(require("./Ingredient"));
const Instruction_1 = __importDefault(require("./Instruction"));
const Recipe = index_1.default.define('Recipe', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    img_data: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
    img_alt_text: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    total_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_tasty: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
});
Recipe.hasMany(Ingredient_1.default, { onDelete: 'cascade' });
Recipe.hasMany(Instruction_1.default, { onDelete: 'cascade' });
exports.default = Recipe;
