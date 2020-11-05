import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import { PROJECTS, HISTORY_PROJECTS } from './data/dummy-data.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/projects', (req, res) => {
  res.json(PROJECTS);
});

app.get('/api/historyprojects', (req, res) => {
  res.json(HISTORY_PROJECTS);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow
      .bold
  );
});
