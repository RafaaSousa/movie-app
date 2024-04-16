import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/movies', movieRoutes);


mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch((err) => console.error('Erro ao conectar ao MongoDB' ,err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});