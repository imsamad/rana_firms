import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';

import { NotFound } from './middlewares/not_found';
import { error_handler_mdlwr } from './middlewares/error_handler';

import routers from './routers';

const app = express();

app.disable('x-powered-by');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.text());

app.use('/api/v1', routers);

app.get(['/api/v1', '/'], async (_req, res) => {
  res.json({
    message: 'Hello running!',
  });
});

app.all('*', () => {
  throw new NotFound();
});

app.use(error_handler_mdlwr);

export { app };
