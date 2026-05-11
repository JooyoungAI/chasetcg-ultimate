import { useNavigate } from 'react-router-dom';
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
          <a href="https://pokemon-card-guesser.vercel.app" target="_blank" rel="noopener noreferrer" className="action-card">
            <h2>Guess the Card</h2>
            <p>Test your Pokémon TCG knowledge with our daily puzzle.</p>
          </a>
          
          <a href="https://pokemon-card-rater.vercel.app" target="_blank" rel="noopener noreferrer" className="action-card">
            <h2>Rate Cards</h2>
            <p>Share your opinions and see community ratings.</p>
          </a>
        </div>
      </section>
    </div>
  );
}
