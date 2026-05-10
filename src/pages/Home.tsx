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
      
      // Get sets to exclude (TCG Pocket related)
      // We know from investigation that 'tcgp' and 'me' series are Pocket-related in TCGdex
      const pocketSerie = await tcgdex.serie.get('tcgp').catch(() => null);
      const meSerie = await tcgdex.serie.get('me').catch(() => null);
      const excludedSetIds = new Set([
        ...(pocketSerie?.sets.map(s => s.id) || []),
        ...(meSerie?.sets.map(s => s.id) || [])
      ]);

      // Sort sets by length descending so longer set names match first (e.g. "Base Set 2" before "Base Set")
      const sortedSets = sets.sort((a, b) => b.name.length - a.name.length);
      
      const matchedSet = sortedSets.find(s => lowerQuery.includes(s.name.toLowerCase()) || lowerQuery.includes(s.id.toLowerCase()));

      if (matchedSet && !excludedSetIds.has(matchedSet.id)) {
        // The query contains a valid (non-pocket) set name. 
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
        // No set name found (or it's an excluded set), search globally by name
        const rawResults = await tcgdex.card.list(
          Query.create().contains('name', query)
        );
        // Filter out pocket cards from global search
        results = rawResults.filter(c => !excludedSetIds.has(c.id.split('-')[0]));
      }
      
      setAllCards(results);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setAllCards([]);
    } finally {
      setLoading(false);
    }
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
