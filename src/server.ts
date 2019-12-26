import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/errorHandler.middleware';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Express server has started on ${PORT} port`);
});