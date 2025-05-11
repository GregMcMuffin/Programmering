//henter til html elementerne
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const animeList = document.getElementById('animeList');
const favList = document.getElementById('favList');

searchBtn.onclick = searchAnime; //Når man klikker på søgeknappen kaldes funktionen "searchAnime"

//funktion til at søge efter anime ved hjælp af Jikan API
async function searchAnime() {
  const query = searchInput.value.trim(); // henter og trimmer søgeord
  if (!query) return; //hvis feltet er tomt abrydes funktionen ellers

  //Henter data fra Jikan API baseret på søgningen

  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
  const data = await response.json();

  //viser anime resultaterne
  displayAnimes(data.data);
}
//funktion til at vise en liste af anime-kortene

function displayAnimes(animes) {
  animeList.innerHTML = ''; //Rydder tidligere søgeresultater
  animes.forEach(anime => { 
    //Opretter en container til hvert animekort
    const card = document.createElement('div');
    card.className = 'anime-card'; //Tilføjer CSS-klasse
    //Fylder kortet med billede, titel, beskrivelse og favorit-knap
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" width="100">
      <div>
        <h3>${anime.title}</h3>
        <p>${anime.synopsis || 'Ingen beskrivelse'}</p>
        <button onclick="addToFavorites('${anime.title}')">Favorit</button>
      </div>
    `;
    //Tilføjer kortet til anime-listen i DOM'en (documentet)
    animeList.appendChild(card);
  });
}
//Funktion til at tilføje en anime til favoritter
function addToFavorites(title) {
  // Henter favoritlisten fra localStorage og konverterer den fra JSON til array. Hvis der ikke findes nogen gemt liste, starter vi med en tom array
    let favs = JSON.parse(localStorage.getItem('favorites')) || []; // Henter gemte favoritter eller starter med tom liste hvis der ikke er blevet tilføjet nogle favoritter
    if (!favs.includes(title)) { // Tjekker om titlen allerede er i listen
      favs.push(title); //Tilføjer anime titel hvis den ikke er i listen
      localStorage.setItem('favorites', JSON.stringify(favs)); // Gemmer opdateret favoritliste i localStorage
      updateFavList(); // Opdaterer favoritlisten
    }
  }
  // Funktion til at fjerne en anime fra favoritter
  function removeFromFavorites(title) {
    let favs = JSON.parse(localStorage.getItem('favorites')) || []; // Henter nuværende favoritter
    favs = favs.filter(fav => fav !== title); // Fjerner den valgte titel
    localStorage.setItem('favorites', JSON.stringify(favs)); // Gemmer den opdaterede liste
    updateFavList(); // Opdaterer favoritlisten
  }
  
  function updateFavList() { // Funktion til at opdatere favoritlisten 
    favList.innerHTML = ''; // Rydder den eksisterende favoritliste
    const favs = JSON.parse(localStorage.getItem('favorites')) || []; // Henter gemte favoritter
    favs.forEach(fav => {
      const li = document.createElement('li'); // Opretter listeelement
      li.textContent = fav; // Tilføjer animetitlen som tekst
  
      // Tilføjer 'Fjern' knap ved siden af titlen på animeen
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Fjern';
      removeBtn.onclick = () => removeFromFavorites(fav); // Fjerner anime ved klik
      removeBtn.style.marginLeft = '10px'; // Tilføjer lidt afstand
  
      li.appendChild(removeBtn); // Tilføjer knappen til listeelementet
      favList.appendChild(li); // Tilføjer elementet til listen i UI
    });
  }
  

// Loader favoritter når siden loader
updateFavList();
