import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

import { User, Group, UserGroup } from '../models';

dotenv.config();

const dbUserName = process.env.dbUserName || "";
const dbPassword = process.env.dbPassword || "";
const dbHost = process.env.dbHost || "";
const dbPort = process.env.dbPort || 5432;
const dbName = process.env.dbName || "NodeJS";

export const db =  new Sequelize({
  database: dbName,
  dialect: 'postgres',
  username: dbUserName,
  password: dbPassword,
  storage: `0.0.0.0://${dbUserName}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  models: [User, Group, UserGroup]
});
