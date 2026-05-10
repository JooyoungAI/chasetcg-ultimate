import type { Card } from '@tcgdex/sdk';

interface Props {
  card: Card;
  onClose: () => void;
}

const EUR_TO_NZD = 1.80; // Approximate conversion rate

export default function CardModal({ card, onClose }: Props) {
  const imageUrl = card.image ? `${card.image}/high.png` : undefined;

  // Render prices
  const renderPricing = () => {
    // @ts-ignore
    const pricing = card.pricing;
    if (!pricing) return <p className="modal-text">No pricing data available.</p>;

    return (
      <div className="pricing-details">
        {pricing.tcgplayer && (
          <div className="pricing-box">
            <h4>TCGPlayer (USD)</h4>
            <ul>
              {pricing.tcgplayer.normal?.marketPrice && <li>Normal: ${pricing.tcgplayer.normal.marketPrice.toFixed(2)}</li>}
              {pricing.tcgplayer.reverse?.marketPrice && <li>Reverse: ${pricing.tcgplayer.reverse.marketPrice.toFixed(2)}</li>}
              {pricing.tcgplayer.holo?.marketPrice && <li>Holo: ${pricing.tcgplayer.holo.marketPrice.toFixed(2)}</li>}
            </ul>
          </div>
        )}
        {pricing.cardmarket && (
          <div className="pricing-box">
            <h4>Cardmarket (NZD)</h4>
            <ul>
              {pricing.cardmarket.trend && <li>Trend: NZ${(pricing.cardmarket.trend * EUR_TO_NZD).toFixed(2)}</li>}
              {pricing.cardmarket.avg && <li>Average: NZ${(pricing.cardmarket.avg * EUR_TO_NZD).toFixed(2)}</li>}
              {pricing.cardmarket['trend-holo'] && <li>Holo Trend: NZ${(pricing.cardmarket['trend-holo'] * EUR_TO_NZD).toFixed(2)}</li>}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          <div className="modal-image-col">
            {imageUrl ? (
              <img src={imageUrl} alt={card.name} className="modal-image" />
            ) : (
              <div className="empty-state">No Image</div>
            )}
          </div>
          
          <div className="modal-info-col">
            <h2>{card.name}</h2>
            <p className="subtitle">{card.category} - {card.rarity}</p>
            
            <div className="modal-section">
              <h3>Set Information</h3>
              <p className="modal-text"><strong>Set:</strong> {card.set?.name || 'Unknown'}</p>
              <p className="modal-text"><strong>Card Number:</strong> {card.localId}/{card.set?.cardCount?.official || '?'}</p>
              <p className="modal-text"><strong>Illustrator:</strong> {card.illustrator || 'Unknown'}</p>
            </div>

            {card.hp && (
              <div className="modal-section">
                <h3>Stats</h3>
                <p className="modal-text"><strong>HP:</strong> {card.hp}</p>
                <p className="modal-text"><strong>Types:</strong> {card.types?.join(', ') || 'None'}</p>
              </div>
            )}

            {card.attacks && card.attacks.length > 0 && (
              <div className="modal-section">
                <h3>Attacks</h3>
                {card.attacks.map((attack, idx) => (
                  <div key={idx} className="attack-item">
                    <p><strong>{attack.name}</strong> {attack.damage ? `(${attack.damage})` : ''}</p>
                    <p className="attack-effect">{attack.effect}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-section">
              <h3>Market Pricing</h3>
              {renderPricing()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
