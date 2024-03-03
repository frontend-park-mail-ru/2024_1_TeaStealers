import express from 'express';
import { resolve } from 'path';

const app = express();
const port = 3000;

app.use(resolve(__dirname, '.', 'public'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
