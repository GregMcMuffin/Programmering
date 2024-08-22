let currentPage = 1
let pages // Array med alle elementer 

function setup(){
    console.log("P5.js er loaded")
    pages = selectAll('.page')
    // Nu kan man se at pages er blevet til en liste med alle class = page ting
    console.log(pages.length)

}

function shiftPage(num){
    if(num == "ArrowLeft"){
        num = currentPage - 1
    }

    if(num == "ArrowRight"){
        num = currentPage + 1
    }




    if(isNaN(num)  num > pages.length  num == 0){
        return
    }

    select("#page" + currentPage).removeClass('visible')
    currentPage = num
    select("#page" + currentPage).addClass('visible')

}


function keyPressed(){
    console.log(key)
    shiftPage(key)
}
