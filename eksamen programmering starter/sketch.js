let searchInput, searchBtn;
let animeList, favList;
let content;

function setup() {
  noCanvas();

  content = select('.overlay'); // Din side er indeni .overlay
  content.html(''); // Fjern eksisterende DOM, da vi bygger med p5

  // Header
  const header = createElement('header');
  const h1 = createElement('h1', 'Din Anime Database');
  const p = createP('Portal til Anime. Søg efter dine yndlingsserier og gem dem som dine favoritter.');
  p.id('startText');

  searchInput = createInput().attribute('placeholder', 'Søg efter en anime...');
  searchInput.id('searchInput');
  searchBtn = createButton('Søg');
  searchBtn.id('searchBtn');
  searchBtn.mousePressed(searchAnime);

  header.child(h1);
  header.child(p);
  header.child(searchInput);
  header.child(searchBtn);

  content.child(header);

  // Main
  const main = createElement('main');

  animeList = createDiv().id('animeList');
  const favSection = createDiv().id('favorites');
  const favTitle = createElement('h2', 'Dine favoritter');
  favList = createElement('ul').id('favList');

  favSection.child(favTitle);
  favSection.child(favList);

  main.child(animeList);
  main.child(favSection);
  content.child(main);

  updateFavList();
}

async function searchAnime() {
  const query = searchInput.value().trim();
  if (!query) return;

  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
  const data = await response.json();

  displayAnimes(data.data);
}

function displayAnimes(animes) {
  animeList.html(''); // Clear tidligere resultater

  animes.forEach(anime => {
    const card = createDiv().addClass('anime-card');

    const img = createImg(anime.images.jpg.image_url, anime.title).size(100, AUTO);
    const title = createElement('h3', anime.title);
    const synopsis = createP(anime.synopsis || 'Ingen beskrivelse');
    const favBtn = createButton('Favorit');

    favBtn.mousePressed(() => addToFavorites(anime.title));

    card.child(img);
    card.child(title);
    card.child(synopsis);
    card.child(favBtn);
    animeList.child(card);
  });
}

function addToFavorites(title) {
  let favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favs.includes(title)) {
    favs.push(title);
    localStorage.setItem('favorites', JSON.stringify(favs));
    updateFavList();
  }
}

function removeFromFavorites(title) {
  let favs = JSON.parse(localStorage.getItem('favorites')) || [];
  favs = favs.filter(fav => fav !== title);
  localStorage.setItem('favorites', JSON.stringify(favs));
  updateFavList();
}

function updateFavList() {
  favList.html('');
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];

  favs.forEach(fav => {
    const li = createElement('li', fav);
    const removeBtn = createButton('Fjern');
    removeBtn.mousePressed(() => removeFromFavorites(fav));
    removeBtn.style('margin-left', '10px');
    li.child(removeBtn);
    favList.child(li);
  });
}
