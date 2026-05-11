import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { WALL_CARDS } from '../data/wallCards';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Generate randomized rows and delays on mount
  const rowData = useMemo(() => {
    return [...Array(8)].map(() => ({
      cards: shuffleArray(WALL_CARDS),
      delay: Math.random() * -800 // Random negative delay to start at different points
    }));
  }, []);

  return (
    <div className="home-container">
      <div className="background-wrapper">
        {rowData.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="card-row" 
            style={{ animationDelay: `${row.delay}s` }}
          >
            <div style={{display: 'flex'}}>
              {row.cards.map((url, idx) => (
                <img key={idx} className="bg-card" src={url} alt="Pokemon Card" loading="lazy" />
              ))}
            </div>
            {/* Repeat once for seamless loop */}
            <div style={{display: 'flex'}}>
              {row.cards.map((url, idx) => (
                <img key={`repeat-${idx}`} className="bg-card" src={url} alt="Pokemon Card" loading="lazy" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="hero-wrapper">
        <div className="hero-content">
          <h1>Welcome to ChaseTCG</h1>
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
