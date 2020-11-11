import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import { notFound, erroHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import projectPhaseRoutes from './routes/projectPhaseRoutes.js';
import miniPhaseRoutes from './routes/miniPhaseRoutes.js';
import laborRoutes from './routes/laborRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import miscellanyRoutes from './routes/miscellanyRoutes.js';
import clientRoutes from './routes/clientRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projectphases', projectPhaseRoutes);
app.use('/api/miniphases', miniPhaseRoutes);
app.use('/api/labors', laborRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/miscellanies', miscellanyRoutes);
app.use('/api/clients', clientRoutes);

app.use(notFound);

app.use(erroHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow
      .bold
  );
});
