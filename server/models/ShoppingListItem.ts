import sequelize from './index';
const { DataTypes } = require('sequelize');
import { Model } from 'sequelize';
import { ShoppingListItemType } from '../types/ShoppingListItem';

const ShoppingListItem = sequelize.define<Model<ShoppingListItemType>>('ShoppingListItem', {
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

export default ShoppingListItem;
