import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

import userRoutes from './routes/user.routes';

const app = express();

app.use('/users', userRoutes);

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = error;

  console.log('Error status: ', status);
  console.log('Message: ', message);

  res.status(status);
  res.json({ status, message });
});

app.listen(3000, () => console.log('Express server has started on 3000 port'));
