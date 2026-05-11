import type { CardResume, Card } from '@tcgdex/sdk';
import { useState, useEffect } from 'react';
import tcgdex from '../tcgdex';

const EUR_TO_NZD = 1.80; // Approximate conversion rate

interface Props {
  card: CardResume;
  onClick: (card: Card) => void;
}

export default function PokemonCard({ card, onClick }: Props) {
  const [imgError, setImgError] = useState(false);
  const [fullCard, setFullCard] = useState<Card | undefined>(undefined);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoadingDetails(true);
    
    tcgdex.card.get(card.id)
      .then((res) => {
        if (mounted) {
          // @ts-ignore - The SDK types might not be perfectly up to date with the latest fields, so we ignore type errors for pricing
          setFullCard(res);
          setLoadingDetails(false);
        }
      })
      .catch(() => {
        if (mounted) setLoadingDetails(false);
      });

    return () => {
      mounted = false;
    };
  }, [card.id]);

  const imageUrl = card.image ? `${card.image}/high.png` : undefined;

  let priceDisplay = null;
  // @ts-ignore
  if (!loadingDetails && fullCard?.pricing) {
    // @ts-ignore
    const pricing = fullCard.pricing;
    if (pricing.tcgplayer) {
      const tcg = pricing.tcgplayer;
      const bestVariant = tcg.holo || tcg.normal || tcg.reverse || tcg['1stEdition'] || tcg.unlimited;
      if (bestVariant && bestVariant.marketPrice) {
        priceDisplay = `$${bestVariant.marketPrice.toFixed(2)}`;
      } else if (bestVariant && bestVariant.midPrice) {
        priceDisplay = `$${bestVariant.midPrice.toFixed(2)}`;
      }
    } else if (pricing.cardmarket) {
      const cm = pricing.cardmarket;
      const price = cm.trend || cm.avg;
      if (price) {
        const nzdPrice = price * EUR_TO_NZD;
        priceDisplay = `NZ$${nzdPrice.toFixed(2)}`;
      }
    }
  }

  const handleClick = () => {
    if (fullCard) {
      onClick(fullCard);
    }
  };

  return (
    <div className="pokemon-card" onClick={handleClick}>
      <div className="card-image-container">
        {imageUrl && !imgError ? (
          <img 
            src={imageUrl} 
            alt={card.name} 
            className="card-image"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="empty-state">No Image</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{card.name}</h3>
        <p className="card-set">
          {!loadingDetails && fullCard ? (
            `${fullCard.set.name} - ${fullCard.localId}${fullCard.set.cardCount?.official ? '/' + fullCard.set.cardCount.official : ''}`
          ) : (
            card.id
          )}
        </p>
        
        <div className="card-market-info">
          {loadingDetails ? (
            <span className="price-loading">Loading price...</span>
          ) : priceDisplay ? (
            <span className="card-price">{priceDisplay}</span>
          ) : (
            <span className="price-unavailable">Price Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
}
