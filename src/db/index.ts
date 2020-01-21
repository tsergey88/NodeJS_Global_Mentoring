import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbUserName = process.env.dbUserName || "";
const dbPassword = process.env.dbPassword || "";
const dbHost = process.env.dbHost || "";
const dbPort = process.env.dbPort || 5432;
const dbName = process.env.dbName || "NodeJS";

export const db = new Sequelize(`postgres://${dbUserName}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`);