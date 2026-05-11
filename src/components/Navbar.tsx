import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Keep navbar search input in sync with URL if on the search page
  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search);
      const q = params.get('q');
      if (q) setQuery(q);
    } else {
      setQuery('');
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        TCG<span>Dex</span>
      </Link>
      
      <div className="nav-center">
        <form className="nav-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search cards..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </div>

      <div className="nav-links">
        <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>Search</Link>
        <Link to="/guess" className={location.pathname === '/guess' ? 'active' : ''}>Guess</Link>
        <Link to="/rate" className={location.pathname === '/rate' ? 'active' : ''}>Rate</Link>
      </div>
    </nav>
  );
}
