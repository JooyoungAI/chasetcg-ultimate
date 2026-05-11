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

        <div className="moving-wall-container">
          <div className="moving-wall">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="wall-track">
                <img src="https://assets.tcgdex.net/en/base/base1/4/high.png" alt="Base Set Charizard" />
                <img src="https://assets.tcgdex.net/en/swsh/swsh7/215/high.png" alt="Umbreon VMAX Alt Art" />
                <img src="https://assets.tcgdex.net/en/swsh/swsh11/186/high.png" alt="Giratina V Alt Art" />
                <img src="https://assets.tcgdex.net/en/swsh/swsh7/218/high.png" alt="Rayquaza VMAX Alt Art" />
                <img src="https://assets.tcgdex.net/en/swsh/swsh12/186/high.png" alt="Lugia V Alt Art" />
                <img src="https://assets.tcgdex.net/en/swsh/swsh9/154/high.png" alt="Charizard V Alt Art" />
                <img src="https://assets.tcgdex.net/en/neo/neo4/107/high.png" alt="Shining Charizard" />
                <img src="https://assets.tcgdex.net/en/swsh/swsh8/271/high.png" alt="Gengar VMAX Alt Art" />
                <img src="https://assets.tcgdex.net/en/sv/sv03.5/199/high.png" alt="Charizard ex Alt Art" />
                <img src="https://assets.tcgdex.net/en/swsh/swsh6/201/high.png" alt="Blaziken VMAX Alt Art" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
