import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <ul>
      {favorites.map((city) => (
        <li key={city}>
          <button onClick={() => navigate("/", { state: { city } })}>
            {city}
          </button>
          <button onClick={() => removeFavorite(city)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default Favorites;
