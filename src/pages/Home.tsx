import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const WALL_CARDS = [
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png",
  "${c.image}/high.png"
];


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
    <div className="home-container">
      <div className="background-wrapper">
        {[...Array(4)].map((_, rowIndex) => (
          <div key={rowIndex} className="card-row">
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{display: 'flex'}}>
                {WALL_CARDS.map((url, idx) => (
                  <img key={idx} className="bg-card" src={url} alt="Pokemon Card" loading="lazy" />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hero-wrapper">
        <div className="hero-content">
          <h1>Welcome to TCG Explorer</h1>
          <p>Your ultimate companion for Pokémon Trading Card Game data</p>
          
          <form className="landing-search" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search for cards (e.g., 'Charizard Base Set')" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <div className="landing-actions">
            <a href="https://pokemon-card-guesser.vercel.app" target="_blank" rel="noopener noreferrer" className="action-card">
              <h2>🎮 Guess the Card</h2>
            </a>
            
            <a href="https://pokemon-card-rater.vercel.app" target="_blank" rel="noopener noreferrer" className="action-card">
              <h2>⭐ Rate Cards</h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
