import { useState } from 'react';
import tcgdex from '../tcgdex';
import PokemonCard from '../components/PokemonCard';
import { Query } from '@tcgdex/sdk';
import type { CardResume } from '@tcgdex/sdk';

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name'); // 'name' or 'set'
  const [cards, setCards] = useState<CardResume[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [allSetCards, setAllSetCards] = useState<CardResume[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setPage(1);
    setAllSetCards([]);
    
    try {
      let results: CardResume[] = [];
      
      if (searchType === 'name') {
        results = await tcgdex.card.list(
          Query.create()
            .contains('name', query)
            .paginate(1, 20)
        );
        setHasMore(results.length === 20);
      } else if (searchType === 'set') {
        const sets = await tcgdex.set.list();
        const matchedSet = sets.find(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.id.toLowerCase() === query.toLowerCase());
        
        if (matchedSet) {
          const fullSet = await tcgdex.set.get(matchedSet.id);
          if (fullSet && fullSet.cards) {
            const fullCards = fullSet.cards;
            setAllSetCards(fullCards);
            results = fullCards.slice(0, 20);
            setHasMore(fullCards.length > 20);
          }
        } else {
          setHasMore(false);
        }
      }
      
      setCards(results);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setCards([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      if (searchType === 'name') {
        const moreResults = await tcgdex.card.list(
          Query.create()
            .contains('name', query)
            .paginate(nextPage, 20)
        );
        setCards(prev => [...prev, ...moreResults]);
        setHasMore(moreResults.length === 20);
      } else if (searchType === 'set') {
        const moreResults = allSetCards.slice((nextPage - 1) * 20, nextPage * 20);
        setCards(prev => [...prev, ...moreResults]);
        setHasMore(allSetCards.length > nextPage * 20);
      }
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more cards:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Find Your Pokémon Cards</h1>
        <p>Explore the complete Pokémon TCG database</p>
        
        <form className="search-container" onSubmit={handleSearch}>
          <select 
            className="search-select" 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="set">Set</option>
          </select>
          <input 
            type="text" 
            className="search-input" 
            placeholder={searchType === 'name' ? "e.g. Charizard" : "e.g. Base Set"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </section>

      <div className="grid-container">
        {loading ? (
          <div className="loader"></div>
        ) : cards.length > 0 ? (
          <>
            <div className="cards-grid">
              {cards.map(card => (
                <PokemonCard key={card.id} card={card} />
              ))}
            </div>
            {hasMore && (
              <div className="pagination-container">
                <button 
                  className="load-more-btn" 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
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
    </div>
  );
}
