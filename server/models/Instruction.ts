import sequelize from './index';
const { DataTypes } = require('sequelize');
import { Model } from 'sequelize';
import { Instruction } from '../types/Instruction';

const Instruction = sequelize.define<Model<Instruction>>('Instruction', {
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

export default Instruction;
