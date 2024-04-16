import express from 'express';
import { connectToDatabase } from './db/conn';
import { movieRoutes } from './routes/movieRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Conectar ao MongoDB
connectToDatabase(MONGODB_URI!);

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/api/movies', movieRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
