import type { CardResume } from '@tcgdex/sdk';
import { useState } from 'react';

interface Props {
  card: CardResume;
}

export default function PokemonCard({ card }: Props) {
  const [imgError, setImgError] = useState(false);

  // Use the image property which contains the base url, append extension if needed.
  // The SDK card resume object has image url, or we construct it.
  // Actually, TCGdex card resume object `image` property is the base URL.
  // We append '/low.webp' or '/high.png'.
  const imageUrl = card.image ? `${card.image}/high.png` : undefined;

  return (
    <div className="pokemon-card">
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
          <div className="empty-state">No Image Available</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{card.name}</h3>
        {/* We might not have set name in CardResume depending on the endpoint, but we can display ID */}
        <p className="card-set">{card.id}</p>
      </div>
    </div>
  );
}
