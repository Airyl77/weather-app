import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
    </nav>
  );
}

export default Navbar;
