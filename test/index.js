const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const animeList = document.getElementById('animeList');
const favList = document.getElementById('favList');

searchBtn.addEventListener('click', searchAnime);

async function searchAnime() {
  const query = searchInput.value.trim();
  if (!query) return;

  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
  const data = await response.json();

  displayAnimes(data.data);
}

function displayAnimes(animes) {
  animeList.innerHTML = '';
  animes.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" width="100">
      <div>
        <h3>${anime.title}</h3>
        <p>${anime.synopsis || 'Ingen beskrivelse'}</p>
        <button onclick="addToFavorites('${anime.title}')">Favorit</button>
      </div>
    `;
    animeList.appendChild(card);
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
    favList.innerHTML = '';
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    favs.forEach(fav => {
      const li = document.createElement('li');
      li.textContent = fav;
  
      // Tilføjer 'Fjern' knap
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Fjern';
      removeBtn.onclick = () => removeFromFavorites(fav);
      removeBtn.style.marginLeft = '10px';
  
      li.appendChild(removeBtn);
      favList.appendChild(li);
    });
  }
  

// Loader favoritter når siden loader
updateFavList();