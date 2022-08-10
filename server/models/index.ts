import { Sequelize } from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize('postgres', 'postgres', process.env.PASSWORD_DB, {
	host: 'localhost',
	port: 5432,
	dialect: 'postgres',
});

export default sequelize;
