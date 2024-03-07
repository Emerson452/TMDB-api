import './index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FavMovie() {
    const APIkey = "YOUR API KEY";
    const account_id = "20530043";
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const url = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies`;
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTIyZjRhNjE1MzBhZDliOWI5MmQ1YmE3OWNhYTY2ZiIsInN1YiI6IjY1MWQ1NWNhYzUwYWQyMDEwYjAwMTc3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBWKkPsy8TZxLqtaWo__lHsB96cUVZp9d5tGwchPcq4'
                }
              };
                
            try {
                const response = await axios.get(url, options);
                setMovies(response.data.results);
            } catch (error) {
                console.error("Axios fetch error: ", error);
            }
        };

        fetchMovies();
    }, []); 

    return (
        <div className='container-card'>
            <h1>Favorites</h1>
             <div className='card'>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>No favorite movies found.</p>
                )}
            </div>
        </div>
    );
}

export default FavMovie;
