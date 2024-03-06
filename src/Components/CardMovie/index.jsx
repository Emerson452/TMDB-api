import "./index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function CardMovie() {
  const APIkey = "ba22f4a61530ad9b9b92d5ba79caa66f";
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=${page}`;
      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Axios fetch error: ", error);
      }
    };

    fetchMovies();
  }, [page]);

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleFavorite = async (movieId, isFavorite) => {
    const accountId = "20530043";
    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite`;
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTIyZjRhNjE1MzBhZDliOWI5MmQ1YmE3OWNhYTY2ZiIsInN1YiI6IjY1MWQ1NWNhYzUwYWQyMDEwYjAwMTc3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBWKkPsy8TZxLqtaWo__lHsB96cUVZp9d5tGwchPcq4'
        }
      };

    const data = {
      media_type: "movie",
      media_id: movieId,
      favorite: !isFavorite,
    };

    try {
      const response = await axios.post(url, data, options);
      if (response.status === 200 || response.status === 201) {
        console.log("Favorite status updated successfully");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="container-card">
      <button onClick={handlePreviousPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
      <h1>Tendances</h1>
      <div className="card">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <button
              onClick={() =>
                handleFavorite(
                  movie.id,
                  favorites.some((favorite) => favorite.id === movie.id)
                )
              }
            >
              {favorites.some((favorite) => favorite.id === movie.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardMovie;
