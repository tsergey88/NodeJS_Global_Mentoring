import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { db } from './datasources';
import { userRouter, groupRouter, userGroupRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { consoleLogger } from './middlewares/consoleLogger.middleware';
import { winstonLogger } from './middlewares/winstonLogger.middleware';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/user-group', userGroupRouter);
app.use(consoleLogger);
app.use(errorHandler);

process
  .on('unhandledRejection', (reason, promise) => {
    winstonLogger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    process.exit(1);
  })
  .on('uncaughtException', error => {
    winstonLogger.error(`Unhandled Exception: ${error}`);
    process.exit(1);
  });

app.listen(PORT, async () => {
  try {
    await db.authenticate();
    winstonLogger.info('Connection has been established successfully.')

    await db.sync({ alter: true });
    winstonLogger.info('All tables was synchronized.')  
  } catch (e) {
    winstonLogger.error(`Unable to connect to the database: ${e}`);
  } 

  winstonLogger.info(`Express server has started on ${PORT} port`);
});