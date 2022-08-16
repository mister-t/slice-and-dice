import colors from 'colors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
