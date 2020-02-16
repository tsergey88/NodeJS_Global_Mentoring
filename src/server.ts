import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { db } from './datasources';
import { userRouter, groupRouter, userGroupRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/user-group', userGroupRouter);
app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await db.authenticate();
    console.log('\x1b[32m%s\x1b[0m', 'Connection has been established successfully.');

    await db.sync({ alter: true });
    console.log('\x1b[32m%s\x1b[0m', 'All tables was synchronized.');    
  } catch (e) {
    console.error('\x1b[31m%s\x1b[0m', 'Unable to connect to the database:', e);
  } 

  console.log('\x1b[34m%s\x1b[0m', `Express server has started on ${PORT} port`);
});