import { NavLink } from "react-router-dom";

//   This is the navigation bar that contains links to different pages of
//   the app // NavLink is a special version of the Link component that adds
//   styling attributes to the rendered element when it matches the current
//   URL. The 'end' prop ensures that the link is only active when the path
//   exactly matches the current URL. Without 'end', the Home link would also be active on the Favorites page,
//   since '/' is a prefix of '/favorites'.

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
