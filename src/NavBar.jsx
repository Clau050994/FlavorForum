import { Link } from 'react-router-dom';
import './NavBar.css'; 

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">FlavorForum</h1>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/recipe" className="navbar-link">Create New Post</Link>
      </div>
    </nav>
  );
}

export default NavBar;
