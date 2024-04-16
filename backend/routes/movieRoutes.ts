import express from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../db/conn';
import { InsertOneResult, Document } from 'mongodb';

export const movieRoutes = express.Router();

// Rota para criar um novo filme
movieRoutes.post('/', async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const moviesCollection = db.collection('movies');
  
  const result: InsertOneResult<Document> = await moviesCollection.insertOne(req.body);
  
  if (!result || !('ops' in result) || !Array.isArray(result.ops) || result.ops.length === 0) {
    return res.status(500).json({ message: 'Erro ao criar filme' });
  }

  const newMovie = result.ops[0];  // Acessar o documento inserido
  
  res.json(newMovie);
});

// Rota para obter todos os filmes
movieRoutes.get('/', async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const moviesCollection = db.collection('movies');
  const movies = await moviesCollection.find({}).toArray();
  res.json(movies);
});

// Rota para obter detalhes de um filme
movieRoutes.get('/:id', async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const moviesCollection = db.collection('movies');
  const movie = await moviesCollection.findOne({ _id: new ObjectId(req.params.id) });
  
  if (!movie) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  
  res.json(movie);
});

// Rota para atualizar um filme
movieRoutes.put('/:id', async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const moviesCollection = db.collection('movies');
  const result = await moviesCollection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  
  if (result.modifiedCount === 0) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  
  res.json({ message: 'Filme atualizado com sucesso' });
});

// Rota para deletar um filme
movieRoutes.delete('/:id', async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const moviesCollection = db.collection('movies');
  const result = await moviesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  
  res.json({ message: 'Filme deletado com sucesso' });
});
