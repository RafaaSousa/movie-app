import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

import './MoviesGrid.css'

const moviesURL = import.meta.env.VITE_API
const apikey = import.meta.env.VITE_API_KEY


const Home = () => {
    const [topMovies, setTopMovies] = useState([])

    const getTopRateMovies = async (url) => {

        const res = await fetch(url) 
        const data = await res.json()

        setTopMovies(data.results)
    }

    useEffect(() => {
        const topRatedUrl = `${moviesURL}top_rated?${apikey}`

        getTopRateMovies(topRatedUrl)
    }, [])


    return (
    <div className="container">
    <p>Para os amantes de filmes a Movie app é para vocês, clicando em detalhes você vai encontrar dados relacionados ao seu filme preferido.</p>    
    <h2 className="title">Melhores filmes:</h2>
    <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && 
            topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} /> )}
        </div> 
     </div>
  );
}

export default Home;