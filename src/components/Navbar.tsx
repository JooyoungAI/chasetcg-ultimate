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
      <Link to="/" className="logo">Chase<span>TCG</span></Link>
      
      <div className="nav-center">
        <form className="nav-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search cards..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="nav-links">
        <a href="https://pokemon-card-guesser.vercel.app" target="_blank" rel="noopener noreferrer">Guess</a>
        <a href="https://pokemon-card-rater.vercel.app" target="_blank" rel="noopener noreferrer">Rate</a>
      </div>
    </nav>
  );
}
