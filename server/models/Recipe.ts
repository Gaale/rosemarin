import sequelize from './index';
const { DataTypes } = require('sequelize');
import { Model } from 'sequelize/types';
import { RecipeType } from '../types/Recipe';
import Ingredient from './Ingredient';
import Instruction from './Instruction';

const Recipe = sequelize.define<Model<RecipeType>>('Recipe', {
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

Recipe.hasMany(Ingredient, { onDelete: 'cascade' });
Recipe.hasMany(Instruction, { onDelete: 'cascade' });

export default Recipe;
