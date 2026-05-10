async function test() {
  const res = await fetch('https://api.tcgdex.net/v2/en/sets/base1');
  const set = await res.json();
  let found = 0;
  for (let card of set.cards.slice(0, 50)) {
    const cardRes = await fetch(`https://api.tcgdex.net/v2/en/cards/${card.id}`);
    const cardData = await cardRes.json();
    if (cardData.pricing && cardData.pricing.tcgplayer) {
      found++;
    }
  }
  console.log(`Found TCGPlayer pricing on ${found}/50 cards`);
}
test();
