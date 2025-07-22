// config/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,           // 'railway'
  process.env.DB_USER,           // 'root'
  process.env.DB_PASSWORD,       // password string
  {
    host: process.env.DB_HOST,   // 'nozomi.proxy.rlwy.net'
    port: process.env.DB_PORT,   // '41857'
    dialect: 'mysql',
  }
);

export default sequelize;
