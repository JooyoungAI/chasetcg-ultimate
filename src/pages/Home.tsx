import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const WALL_CARDS = [
  "https://assets.tcgdex.net/en/base/base1/4/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh7/215/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh11/186/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh7/218/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh12/186/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh9/154/high.png",
  "https://assets.tcgdex.net/en/neo/neo4/107/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh8/271/high.png",
  "https://assets.tcgdex.net/en/sv/sv03.5/199/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/201/high.png",
  "https://assets.tcgdex.net/en/sm/sm9/170/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh10/172/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh4/188/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh4.5/SV107/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh11/180/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh8/270/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh7/209/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh7/212/high.png"
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
