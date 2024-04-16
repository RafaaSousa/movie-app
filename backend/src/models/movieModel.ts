import mongoose, { Document, Schema } from 'mongoose';

interface Movie extends Document {
    title: string;
    releaseDate: Date;
    ratings: number;
    actors: string[];
    reviews: string[];
}

const movieSchema = new Schema({
    title: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    ratings: { type: Number, default: 0 },
    actors: { type: [String], default: [] },
    reviews: { type: [String], default: [] },
});

export default mongoose.model<Movie>('Movie', movieSchema);