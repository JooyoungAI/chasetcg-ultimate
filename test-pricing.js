async function test() {
  const res = await fetch('https://api.tcgdex.net/v2/en/cards/swsh3-136');
  const data = await res.json();
  console.log("Raw object:", Object.keys(data));
  console.log("tcgplayer url:", data.tcgplayer?.url);
  console.log("tcgplayer root:", data.tcgplayer);
}
test();
