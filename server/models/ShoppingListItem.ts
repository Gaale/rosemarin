import sequelize from './index';
const { DataTypes } = require('sequelize');
import { Model } from 'sequelize';
import { ShoppingListItem } from '../types/ShoppingListItem';

const ShoppingListItem = sequelize.define<Model<ShoppingListItem>>(
  'ShoppingListItem',
  {
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
  }
);

export default ShoppingListItem;
