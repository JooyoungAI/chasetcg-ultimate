import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';

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
  "https://assets.tcgdex.net/en/swsh/swsh7/212/high.png",
  "https://assets.tcgdex.net/en/sm/sm2/151/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/234/high.png",
  "https://assets.tcgdex.net/en/sv/sv03.5/204/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh5/180/high.png",
  "https://assets.tcgdex.net/en/me/me01/150/high.png",
  "https://assets.tcgdex.net/en/sm/sm6/144/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh3.5/74/high.png",
  "https://assets.tcgdex.net/en/sm/sm10/1/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/176/high.png",
  "https://assets.tcgdex.net/en/xy/xy12/111/high.png",
  "https://assets.tcgdex.net/en/sm/sm1/156/high.png",
  "https://assets.tcgdex.net/en/sm/sm5/171/high.png",
  "https://assets.tcgdex.net/en/me/me01/180/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh10.5/087/high.png",
  "https://assets.tcgdex.net/en/sv/sv04.5/236/high.png",
  "https://assets.tcgdex.net/en/sm/sm3/151/high.png",
  "https://assets.tcgdex.net/en/sv/sv03/224/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/199/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh9/177/high.png",
  "https://assets.tcgdex.net/en/bw/bw4/103/high.png",
  "https://assets.tcgdex.net/en/sv/sv08/239/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh11/200/high.png",
  "https://assets.tcgdex.net/en/sm/sm7/173/high.png",
  "https://assets.tcgdex.net/en/sv/sv09/184/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh3/201/high.png",
  "https://assets.tcgdex.net/en/xy/xy2/108/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh2/201/high.png",
  "https://assets.tcgdex.net/en/sm/sm3/150/high.png",
  "https://assets.tcgdex.net/en/bw/bw9/120/high.png",
  "https://assets.tcgdex.net/en/sm/sm4/124/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh2/204/high.png",
  "https://assets.tcgdex.net/en/sv/sv03.5/174/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh8/281/high.png",
  "https://assets.tcgdex.net/en/sm/sm1/162/high.png",
  "https://assets.tcgdex.net/en/sv/sv08.5/167/high.png",
  "https://assets.tcgdex.net/en/sv/sv06.5/067/high.png",
  "https://assets.tcgdex.net/en/me/me03/098/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/268/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh12/214/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/207/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/231/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/257/high.png",
  "https://assets.tcgdex.net/en/sm/sm12/243/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh3.5/79/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh10.5/086/high.png",
  "https://assets.tcgdex.net/en/sm/sm2/161/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/258/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/113/high.png",
  "https://assets.tcgdex.net/en/sm/sm9/184/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh7/207/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/209/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh5/170/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh6/199/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/211/high.png",
  "https://assets.tcgdex.net/en/sm/sm1/162/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/169/high.png",
  "https://assets.tcgdex.net/en/sv/sv08.5/163/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/173/high.png",
  "https://assets.tcgdex.net/en/sv/sv08.5/155/high.png",
  "https://assets.tcgdex.net/en/sv/sv09/166/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/214/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/267/high.png",
  "https://assets.tcgdex.net/en/xy/xy7/96/high.png",
  "https://assets.tcgdex.net/en/sm/sm5/165/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/210/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh7/215/high.png",
  "https://assets.tcgdex.net/en/me/me01/141/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh1/204/high.png",
  "https://assets.tcgdex.net/en/me/me01/181/high.png",
  "https://assets.tcgdex.net/en/sv/sv06.5/090/high.png",
  "https://assets.tcgdex.net/en/sv/sv08.5/152/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/269/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/218/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/219/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/219/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/218/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh2/204/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/112/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/097/high.png",
  "https://assets.tcgdex.net/en/sv/sv05/169/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh10/204/high.png",
  "https://assets.tcgdex.net/en/sv/sv03.5/174/high.png",
  "https://assets.tcgdex.net/en/sv/sv10/234/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/279/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/213/high.png",
  "https://assets.tcgdex.net/en/me/me01/133/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/132/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/284/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh5/176/high.png",
  "https://assets.tcgdex.net/en/swsh/swsh1/208/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/285/high.png",
  "https://assets.tcgdex.net/en/me/me01/142/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/128/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/121/high.png",
  "https://assets.tcgdex.net/en/me/me01/178/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/136/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/123/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/137/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/124/high.png",
  "https://assets.tcgdex.net/en/sv/sv06.5/075/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/100/high.png",
  "https://assets.tcgdex.net/en/me/me02/125/high.png",
  "https://assets.tcgdex.net/en/me/me01/139/high.png",
  "https://assets.tcgdex.net/en/me/me02/097/high.png",
  "https://assets.tcgdex.net/en/sv/sv06.5/066/high.png",
  "https://assets.tcgdex.net/en/me/me02/126/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/126/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/122/high.png",
  "https://assets.tcgdex.net/en/me/me01/133/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/120/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/097/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/101/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/092/high.png",
  "https://assets.tcgdex.net/en/sv/sv06.5/076/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/087/high.png",
  "https://assets.tcgdex.net/en/sv/sv06.5/068/high.png",
  "https://assets.tcgdex.net/en/sv/sv06.5/069/high.png",
  "https://assets.tcgdex.net/en/me/me03/091/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/250/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/263/high.png",
  "https://assets.tcgdex.net/en/me/me03/122/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/280/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/102/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/123/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/282/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/168/high.png",
  "https://assets.tcgdex.net/en/me/me03/099/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/137/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/292/high.png",
  "https://assets.tcgdex.net/en/me/me01/151/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/251/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/102/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/147/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/116/high.png",
  "https://assets.tcgdex.net/en/me/me02/105/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/106/high.png",
  "https://assets.tcgdex.net/en/me/me02/098/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/144/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/211/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/213/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/230/high.png",
  "https://assets.tcgdex.net/en/me/me01/183/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/100/high.png",
  "https://assets.tcgdex.net/en/sv/sv10/188/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/185/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/147/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/202/high.png",
  "https://assets.tcgdex.net/en/sv/sv09/187/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/133/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/152/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/107/high.png",
  "https://assets.tcgdex.net/en/sv/sv08/196/high.png",
  "https://assets.tcgdex.net/en/sv/sv03.5/178/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/142/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/197/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/089/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/127/high.png",
  "https://assets.tcgdex.net/en/sv/sv08.5/159/high.png",
  "https://assets.tcgdex.net/en/me/me03/120/high.png",
  "https://assets.tcgdex.net/en/sv/sv06.5/074/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/154/high.png",
  "https://assets.tcgdex.net/en/sv/sv05/179/high.png",
  "https://assets.tcgdex.net/en/sv/sv05/170/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/099/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/093/high.png",
  "https://assets.tcgdex.net/en/sv/sv05/176/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/098/high.png",
  "https://assets.tcgdex.net/en/me/me03/123/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/187/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/135/high.png",
  "https://assets.tcgdex.net/en/sv/sv10/197/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/167/high.png",
  "https://assets.tcgdex.net/en/me/me03/092/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/172/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/168/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/093/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/142/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/183/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/148/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/177/high.png",
  "https://assets.tcgdex.net/en/me/me02/099/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/194/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/119/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/121/high.png",
  "https://assets.tcgdex.net/en/sv/sv08.5/173/high.png",
  "https://assets.tcgdex.net/en/sv/sv08/201/high.png",
  "https://assets.tcgdex.net/en/me/me01/135/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/132/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/122/high.png",
  "https://assets.tcgdex.net/en/sv/sv03.5/173/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/250/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5b/138/high.png",
  "https://assets.tcgdex.net/en/sv/sv08/205/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/244/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/220/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/211/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/219/high.png",
  "https://assets.tcgdex.net/en/sv/sv06.5/065/high.png",
  "https://assets.tcgdex.net/en/me/me02/102/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/209/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/179/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/216/high.png",
  "https://assets.tcgdex.net/en/sv/sv05/212/high.png",
  "https://assets.tcgdex.net/en/sv/sv09/168/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/213/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/256/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/222/high.png",
  "https://assets.tcgdex.net/en/sv/sv09/170/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/224/high.png",
  "https://assets.tcgdex.net/en/sv/sv05/205/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/258/high.png",
  "https://assets.tcgdex.net/en/me/me03/119/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/243/high.png",
  "https://assets.tcgdex.net/en/sv/sv08.5/149/high.png",
  "https://assets.tcgdex.net/en/sv/sv03.5/200/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/216/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/153/high.png",
  "https://assets.tcgdex.net/en/me/me02/100/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/203/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/223/high.png",
  "https://assets.tcgdex.net/en/sv/sv07/144/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/221/high.png",
  "https://assets.tcgdex.net/en/sv/sv10/184/high.png",
  "https://assets.tcgdex.net/en/sv/sv02/265/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/118/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/241/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/113/high.png",
  "https://assets.tcgdex.net/en/sv/sv03/226/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/156/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/146/high.png",
  "https://assets.tcgdex.net/en/sv/sv01/199/high.png",
  "https://assets.tcgdex.net/en/me/me02/106/high.png",
  "https://assets.tcgdex.net/en/sv/sv08.5/174/high.png",
  "https://assets.tcgdex.net/en/sv/sv10.5w/119/high.png",
  "https://assets.tcgdex.net/en/sv/sv06/188/high.png",
  "https://assets.tcgdex.net/en/sv/sv04.5/238/high.png",
  "https://assets.tcgdex.net/en/sv/sv04/204/high.png",
  "https://assets.tcgdex.net/en/me/me01/149/high.png",
  "https://assets.tcgdex.net/en/me/me02.5/236/high.png",
  "https://assets.tcgdex.net/en/me/me01/182/high.png"
];

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
    return [...Array(4)].map(() => ({
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
