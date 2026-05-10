import TCGdex from '@tcgdex/sdk';

async function test() {
  const sdk = new TCGdex('en');
  try {
    const card = await sdk.card.get('swsh3-136');
    console.log("Card found:", card.name);
    console.log("Pricing property type:", typeof card.pricing);
    if (card.pricing) {
       console.log("Pricing data:", JSON.stringify(card.pricing, null, 2));
    } else {
       console.log("No pricing data found on card.");
       // Let's fetch the raw API to see what it gives:
       const res = await fetch('https://api.tcgdex.net/v2/en/cards/swsh3-136');
       const data = await res.json();
       console.log("Raw fetch pricing:", JSON.stringify(data.pricing, null, 2));
    }
  } catch (err) {
    console.error(err);
  }
}

test();
