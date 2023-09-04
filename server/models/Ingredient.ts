import sequelize from './index';
const { DataTypes } = require('sequelize');
const Recipe = require('./Recipe');
import { Model } from 'sequelize';
import { Ingredient } from '../types/Ingredient';

const Ingredient = sequelize.define<Model<Ingredient>>('Ingredient', {
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

export default Ingredient;
