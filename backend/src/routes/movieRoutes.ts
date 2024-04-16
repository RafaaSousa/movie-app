import express from 'express';
import Movie from '../models/movieModel';

const router = express.Router();

// GET - Todos os filmes
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar filmes' });
    }
});

//POST - Adicionar novo filme
router.post('/', async (req, res) =>{
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao adicionar filme' });
    }
});

// ... Implementar rotas PUT, DELETE e outras conforme necessário

export default router;