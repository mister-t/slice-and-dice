import colors from 'colors';
import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default server;
