import express, { Application } from 'express';
import cors from 'cors';
import playersRoutes from './routes/players';
import statsRoutes from './routes/stats';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/players', playersRoutes);
app.use('/api/stats', statsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});