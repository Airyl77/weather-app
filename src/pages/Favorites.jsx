import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <ul>
      {favorites.map((city) => (
        <li key={city}>
          {city}
          <button onClick={() => removeFavorite(city)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default Favorites;
