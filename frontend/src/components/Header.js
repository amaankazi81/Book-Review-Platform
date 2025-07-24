import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, logout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <h1>📚 BookReview</h1>
          <div className="nav-links">
            <Link to="/" className={isActive('/')}>
              Books
            </Link>
            {user && (
              <Link to="/add-book" className={isActive('/add-book')}>
                Add Book
              </Link>
            )}
            {user ? (
              <>
                <span>Welcome, {user.username}!</span>
                <button onClick={logout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={isActive('/login')}>
                  Login
                </Link>
                <Link to="/register" className={isActive('/register')}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;