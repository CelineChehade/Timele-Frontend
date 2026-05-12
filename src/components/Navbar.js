import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Timele</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/play">Play</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;