import { useState, useEffect } from 'react';
import tcgdex from '../tcgdex';
import PokemonCard from '../components/PokemonCard';
import { CardResume, Query } from '@tcgdex/sdk';

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name'); // 'name' or 'set'
  const [cards, setCards] = useState<CardResume[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    
    try {
      let results: CardResume[] = [];
      
      if (searchType === 'name') {
        results = await tcgdex.card.list(
          Query.create()
            .contains('name', query)
            .paginate(1, 20)
        );
      } else if (searchType === 'set') {
        // TCGdex set query: we can try to find sets and then their cards,
        // or search cards by set name. Let's search cards by set name or ID.
        // The SDK doesn't directly allow .contains('set.name', query) easily,
        // but we can search for the set first, then get its cards.
        const sets = await tcgdex.set.list();
        const matchedSet = sets.find(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.id.toLowerCase() === query.toLowerCase());
        
        if (matchedSet) {
          const fullSet = await tcgdex.set.get(matchedSet.id);
          if (fullSet && fullSet.cards) {
            results = fullSet.cards.slice(0, 20); // Limit to 20 for display
          }
        }
      }
      
      setCards(results);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setCards([]);
    } finally {
      setLoading(false);
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
          <div className="cards-grid">
            {cards.map(card => (
              <PokemonCard key={card.id} card={card} />
            ))}
          </div>
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
