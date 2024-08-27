let currentPage = 1

let pages //array med alle elementer med class = page 
let menuItems //array med alle menupunkterne  

function setup(){
    //shiftPage er funktionen der tager et tal og skifter til en side


    pages = selectAll('.page')
    menuItems = selectAll('.menuitem')

    //menu items skal reagere ved at skifte side
    for( m of menuItems ){
        m.mousePressed( function(e) {
            //e.target er selve html div'en 
            console.log(e.target.id)
            //slice -1 henter det sidste bogstav i en string
            let nr = e.target.id.slice(-1)
            //nu kan vi kalde shiftPage som skifter side
            shiftPage(nr)
        })
    }
        
    shiftPage(currentPage)
    //vent to sekunder og sæt så klassen "hidden" på headeren - så menuen bliver væk
    setTimeout(function(){
        select('header').addClass('hidden')
    }, 10000)
}

function shiftPage(num){
    if(num == "ArrowLeft"){
        num = currentPage - 1
    }
    if(num == "ArrowRight"){
        num = currentPage + 1
    }

    if(isNaN(num) || num > pages.length || num == 0){
        return
    }

    select("#page" + currentPage).removeClass('visible')
    select("#menu" + currentPage).removeClass('active')
    currentPage = num
    select("#page" + currentPage).addClass('visible')
    select("#menu" + currentPage).addClass('active')
}

function keyPressed(){
    console.log(key)
    shiftPage(key)
}