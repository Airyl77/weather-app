import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(city) {
    if (favorites.includes(city)) return; // no duplicates
    setFavorites([...favorites, city]);
  }

  function removeFavorite(city) {
    setFavorites(favorites.filter((f) => f !== city));
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook for easy access
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  return useContext(FavoritesContext);
}
