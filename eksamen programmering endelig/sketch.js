let animeList = []
let nameInput;
let button;
let greeting;
let pageOne;
let contentDiv;

function setup() {
  console.log("setup kører!");
  noCanvas();

  contentDiv = select('#content');

  pageOne = createDiv().addClass('greeting');

  greeting = createElement('h2', 'Find Anime character');

  nameInput = createInput();
  nameInput.attribute('placeholder', 'Skriv et anime-navn');

  button = createButton('submit');
  button.mousePressed(getAnime);

  pageOne.child(greeting);
  pageOne.child(nameInput);
  pageOne.child(button);
  contentDiv.child(pageOne);
}

function getAnime() {
  console.log('fetching character');
  let anime = nameInput.value();
  let apiUrl = `https://api.jikan.moe/v4/characters?q=${anime}`;

  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('Network response was not ok.');
      }
    })
    .then(json => {
      console.log(json); // Du kan udskrive json.data her
      if (json.data.length > 0) {
        json.data.slice(0, 5).forEach(character => {
          let characterDiv = createDiv(`${character.name}`).addClass('character');
          contentDiv.child(characterDiv);
        });
      } else {
        contentDiv.child(createDiv("Ingen karakterer fundet."));
      }
    })
    .catch(error => {
      console.error("Fejl ved hentning af data:", error);
    });
}
