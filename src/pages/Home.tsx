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
  "https://assets.tcgdex.net/en/swsh/swsh8/283/high.png",
  "https://assets.tcgdex.net/en/sv/sv05/207/high.png",
  "https://assets.tcgdex.net/en/sm/sm1/152/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh1/211/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh10/200/high.png",
  "https://assets.tcgdex.net/en/sm/sm3/151/high.png",
  "https://assets.tcgdex.net/en/xy/xy3/113/high.png",
  "https://assets.tcgdex.net/en/sm/sm12/243/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh4/189/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh11/214/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh11/208/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/204/high.png",
  "https://assets.tcgdex.net/en/sm/sm12/258/high.png",
  "https://assets.tcgdex.net/en/sm/sm4/118/high.png",
  "https://assets.tcgdex.net/en/bw/bw7/153/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh10/211/high.png",
  "https://assets.tcgdex.net/en/sm/sm10/221/high.png",
  "https://assets.tcgdex.net/en/sm/sm11/254/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/223/high.png",
  "https://assets.tcgdex.net/en/sm/sm8/215/high.png",
  "https://assets.tcgdex.net/en/bw/bw1/115/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/222/high.png",
  "https://assets.tcgdex.net/en/sm/sm7/174/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh10.5/085/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh2/207/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh7/220/high.png",
  "https://assets.tcgdex.net/en/sm/sm12/265/high.png",
  "https://assets.tcgdex.net/en/bw/bw6/126/high.png",
  "https://assets.tcgdex.net/en/sm/sm12/245/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh7/228/high.png",
  "https://assets.tcgdex.net/en/sm/sm3/149/high.png",
  "https://assets.tcgdex.net/en/xy/xy4/122/high.png",
  "https://assets.tcgdex.net/en/sm/sm10/225/high.png",
  "https://assets.tcgdex.net/en/sm/sm8/230/high.png",
  "https://assets.tcgdex.net/en/xy/xy2/108/high.png",
  "https://assets.tcgdex.net/en/sm/sm7/171/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/130/high.png",
  "https://assets.tcgdex.net/en/bw/bw10/105/high.png",
  "https://assets.tcgdex.net/en/sm/sm10/222/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh8/274/high.png",
  "https://assets.tcgdex.net/en/me/me02/098/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh8/266/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh8/282/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/091/high.png",
  "https://assets.tcgdex.net/en/bw/bw8/137/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/209/high.png",
  "https://assets.tcgdex.net/en/me/me03/099/high.png",
  "https://assets.tcgdex.net/en/me/me03/090/high.png",
  "https://assets.tcgdex.net/en/sm/sm4/120/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/199/high.png",
  "https://assets.tcgdex.net/en/sm/sm1/150/high.png",
  "https://assets.tcgdex.net/en/sm/sma/SV88/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh5/177/high.png",
  "https://assets.tcgdex.net/en/sm/sm10/228/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/208/high.png",
  "https://assets.tcgdex.net/en/sm/sm8/236/high.png",
  "https://assets.tcgdex.net/en/sm/sm3/167/high.png",
  "https://assets.tcgdex.net/en/sm/sm2/156/high.png",
  "https://assets.tcgdex.net/en/sm/sm12/246/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh5/168/high.png",
  "https://assets.tcgdex.net/en/sm/sm6/141/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/165/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/150/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/087/high.png",
  "https://assets.tcgdex.net/en/sm/sm5/163/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/164/high.png",
  "https://assets.tcgdex.net/en/sv/sv10/198/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/203/high.png",
  "https://assets.tcgdex.net/en/sv/sv05/204/high.png",
  "https://assets.tcgdex.net/en/sm/sm12/269/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/138/high.png",
  "https://assets.tcgdex.net/en/sv/sv05/212/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/148/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh5/169/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/147/high.png",
  "https://assets.tcgdex.net/en/sm/sm4/112/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/200/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/201/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/197/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh7/222/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/207/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/153/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh1/212/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/220/high.png",
  "https://assets.tcgdex.net/en/sm/sm12/262/high.png",
  "https://assets.tcgdex.net/en/sv/sv10/201/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/152/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/088/high.png",
  "https://assets.tcgdex.net/en/sm/sm12/270/high.png",
  "https://assets.tcgdex.net/en/me/me01/147/high.png"
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
