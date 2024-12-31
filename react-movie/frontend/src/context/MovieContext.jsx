import React, { createContext, useState, useEffect, useContext } from 'react';

const MovieContext = createContext();

// Custom hook to use the MovieContext
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  // Initialize the state with an empty array as fallback
  const [favorites, setFavorites] = useState(() => {
    // Try to retrieve favorites from localStorage or use an empty array as default
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Sync the favorites state with localStorage whenever favorites change
  useEffect(() => {
    // Update localStorage with the latest favorites whenever the state changes
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]); // This effect runs every time `favorites` changes

  // Function to add a movie to the favorites
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  // Function to remove a movie from the favorites
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Function to check if a movie is in favorites
  const isFavorites = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // The value provided to the context consumers
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorites,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
