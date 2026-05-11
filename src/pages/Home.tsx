import { useState } from 'react';
import tcgdex from '../tcgdex';
import PokemonCard from '../components/PokemonCard';
import CardModal from '../components/CardModal';
import { Query } from '@tcgdex/sdk';
import type { CardResume, Card } from '@tcgdex/sdk';

const CARDS_PER_PAGE = 20;

export default function Home() {
  const [query, setQuery] = useState('');
  const [allCards, setAllCards] = useState<CardResume[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'oldest', 'name'

  const getCardWeight = (id: string) => {
    // Improved regex to handle prefixes at start or after a year (e.g. 'sv01', '2024sv', 'fut2020')
    const match = id.match(/^(?:\d+)?([a-z]+)?(\d+)?/i);
    if (!match) return 0;
    
    const prefix = (match[1] || '').toLowerCase();
    const num = parseFloat(match[2] || '0');
    
    const weights: Record<string, number> = {
      'me': 10000,
      'sv': 9000,
      'swsh': 8000,
      'fut': 8000, // Futsal promos are from the SWSH era
      'sm': 7000,
      'xy': 6000,
      'mc': 5500,
      'bw': 5000,
      'col': 4800,
      'hgss': 4600,
      'pl': 4400,
      'dp': 4200,
      'tk': 4000,
      'pop': 3800,
      'ex': 3600,
      'ecard': 3400,
      'lc': 3200,
      'neo': 3000,
      'si': 2800,
      'gym': 2600,
      'base': 2400,
      'misc': 1000
    };
    
    // Using a large multiplier ensures series order always wins over set numbers/years
    return (weights[prefix] || 0) * 10000 + num;
  };

  const sortCards = (cards: CardResume[], method: string) => {
    const sorted = [...cards];
    if (method === 'name') {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (method === 'latest') {
      return sorted.sort((a, b) => getCardWeight(b.id) - getCardWeight(a.id));
    } else if (method === 'oldest') {
      return sorted.sort((a, b) => getCardWeight(a.id) - getCardWeight(b.id));
    }
    return sorted;
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setPage(1);
    
    try {
      let results: CardResume[] = [];
      const lowerQuery = query.toLowerCase();
      
      const sets = await tcgdex.set.list();
      
      const pocketSerie = await tcgdex.serie.get('tcgp').catch(() => null);
      const excludedSetIds = new Set([
        ...(pocketSerie?.sets.map(s => s.id) || [])
      ]);

      const sortedSets = sets.sort((a, b) => b.name.length - a.name.length);
      const matchedSet = sortedSets.find(s => lowerQuery.includes(s.name.toLowerCase()) || lowerQuery.includes(s.id.toLowerCase()));

      if (matchedSet && !excludedSetIds.has(matchedSet.id)) {
        const pokemonName = lowerQuery.replace(matchedSet.name.toLowerCase(), '').replace(matchedSet.id.toLowerCase(), '').trim();
        const fullSet = await tcgdex.set.get(matchedSet.id);
        if (fullSet && fullSet.cards) {
          if (pokemonName) {
            results = fullSet.cards.filter(c => c.name.toLowerCase().includes(pokemonName));
          } else {
            results = fullSet.cards;
          }
        }
      } else {
        const rawResults = await tcgdex.card.list(
          Query.create().contains('name', query)
        );
        results = rawResults.filter(c => !excludedSetIds.has(c.id.split('-')[0]));
      }
      
      setAllCards(sortCards(results, sortBy));
    } catch (error) {
      console.error("Error fetching cards:", error);
      setAllCards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setAllCards(sortCards(allCards, newSort));
    setPage(1);
  };

  const totalPages = Math.ceil(allCards.length / CARDS_PER_PAGE);
  const currentCards = allCards.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Find Your Pokémon Cards</h1>
        <p>Explore the complete Pokémon TCG database</p>
        
        <div className="search-controls">
          <form className="search-container" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by name, set, or both (e.g. 'Pikachu Base Set')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </form>

          {hasSearched && (
            <div className="sort-container">
              <label htmlFor="sort">Sort By:</label>
              <select 
                id="sort" 
                className="sort-select" 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="latest">Latest Released</option>
                <option value="oldest">Oldest Released</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          )}
        </div>
      </section>

      <div className="grid-container">
        {loading ? (
          <div className="loader"></div>
        ) : allCards.length > 0 ? (
          <>
            <div className="search-stats">
              Found {allCards.length} result{allCards.length !== 1 && 's'}
            </div>
            <div className="cards-grid">
              {currentCards.map(card => (
                <PokemonCard 
                  key={card.id} 
                  card={card} 
                  onClick={setSelectedCard}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination-container">
                <button 
                  className="pagination-btn" 
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <button 
                  className="pagination-btn" 
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : hasSearched ? (
          <div className="empty-state">
            <h2>No cards found</h2>
            <p>Try adjusting your search terms</p>
          </div>
        ) : null}
      </div>

      {selectedCard && (
        <CardModal 
          card={selectedCard} 
          onClose={() => setSelectedCard(null)} 
        />
      )}
    </div>
  );
}
