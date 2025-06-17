import express, {Express, Request, Response } from 'express';
import cors from 'cors';
import itemRoutes from './routes/items.routes';

const app:Express = express();

app.use(cors());
app.use(express.json());

// Routes

app.use('/api', itemRoutes);

// Default route for basic testing

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is up!')
});

export default app; // Export the app for testing
