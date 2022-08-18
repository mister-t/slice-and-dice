import colors from 'colors';
import express, { Router } from 'express';

const router = Router();
const app = express();
app.use(express.json());

app.post('/api/salaries', (req, res) => {
  res.status(201).json(req.body);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default server;
