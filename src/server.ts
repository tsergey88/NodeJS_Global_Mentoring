import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ConnectionError } from 'sequelize';

import { db } from './db';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/errorHandler.middleware';

dotenv.config();
const PORT = process.env.PORT || 3000;
// const dbUserName = process.env.dbUserName || "";
// const dbPassword = process.env.dbPassword || "";
// const dbHost = process.env.dbHost || "";
// const dbPort = process.env.dbPort || 5432;
// const dbName = process.env.dbName || "NodeJS";

// const db = new Sequelize(`postgres://${dbUserName}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`);

db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error: ConnectionError) => console.error('Unable to connect to the database:', error));

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express server has started on ${PORT} port`);
});