import { MongoClient } from 'mongodb';

export async function connectToDatabase(uri: string) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conectado ao MongoDB');
    return client.db();
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}
