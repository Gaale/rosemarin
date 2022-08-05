import sequelize from './index';
const { DataTypes } = require('sequelize');
import { Model } from 'sequelize/types';
import Recipe from './Recipe';
import ShoppingListItem from './ShoppingListItem';
import { User } from '../types/User';

const User = sequelize.define<Model<User>>('User', {
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

User.hasMany(Recipe, { onDelete: 'cascade' });
User.hasMany(ShoppingListItem, { onDelete: 'cascade' });

module.exports = User;
