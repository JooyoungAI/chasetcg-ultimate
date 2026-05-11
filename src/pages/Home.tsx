import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Welcome to TCG Explorer</h1>
        <p>Your ultimate companion for Pokémon Trading Card Game data</p>
        
        <form className="landing-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for cards (e.g., 'Charizard Base Set')" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="landing-actions">
          <Link to="/guess" className="action-card">
            <h2>Guess the Card</h2>
            <p>Test your Pokémon TCG knowledge with our daily puzzle.</p>
          </Link>
          
          <Link to="/rate" className="action-card">
            <h2>Rate Cards</h2>
            <p>Share your opinions and see community ratings.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
