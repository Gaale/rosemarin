"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { DataTypes } = require('sequelize');
const Instruction = index_1.default.define('Instruction', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    temperature: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    recipeId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Instruction;
