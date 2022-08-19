import colors from 'colors';
import express from 'express';
import routes from './routes/salaries.js';
import { urlNotFound, errorHandler } from './middlewares/errorMiddleware.js';
import { connectDB } from './config/db.js';
import { importData } from './data/dbSeeder.js';

await connectDB();
await importData();

const app = express();
app.use(express.json());
app.use('/api/salaries', routes);

const port = process.env.PORT || 3000;

app.use(urlNotFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default server;
