let animeList = []
let dateInput;
let button;
let greeting;
let pageOne
let contentDiv
 
function setup(){
  noCanvas()
 
  contentDiv = select('#content')
 
  pageOne = createDiv().addClass('greeting')
 
      // Use the greeting variable to ask for the person's name.
  greeting = createElement('h2', 'Find Anime character', );
 
  // Create the input and button in the canvas.
  nameInput = createInput()
  //lav nameInput til en P5 selector med ugedagene
 
  button = createButton('submit');
 
  // Use the mousePressed() method to call the greet()
  // function when the button is pressed.
  button.mousePressed(getAnime);
 
 
  pageOne.child(greeting)
  pageOne.child(nameInput)
  pageOne.child(button)
  contentDiv.child(pageOne)
}
 
function getAnime(){
  console.log('fetching character')
  //brug input value fra selevct i stedet for monday
  let anime = nameInput.value()
  let apiUrl = `https://api.jikan.moe/v4/characters?q=${anime}`
  fetch(apiUrl)
  .then( (response) => {
      if(response.ok){
        return response.json()
      }else{
        console.log('Network response was not ok.')
      }}
  )    
  .then((json) =>{
    console.log(json)
    //vis character entries
  })
}