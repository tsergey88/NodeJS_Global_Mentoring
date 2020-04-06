import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { db } from './datasources';
import { userRouter, groupRouter, userGroupRouter, loginRouter } from './routes';
import { errorHandler, consoleLogger, winstonLogger, authenticateJWT } from './middlewares';

dotenv.config();
const PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use('/users', authenticateJWT, userRouter);
app.use('/groups', authenticateJWT, groupRouter);
app.use('/user-group', authenticateJWT, userGroupRouter);
app.use('/login', loginRouter);
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