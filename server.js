import colors from 'colors';
import express from 'express';
import routes from './routes';
import { urlNotFound, errorHandler } from './middlewares/errorMiddleware.js';

const app = express();
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 3000;

app.use(urlNotFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default server;
