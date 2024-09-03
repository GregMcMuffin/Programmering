let currentPage = 1;

let pages; // Array containing all elements with class = page
let menuItems; // Array containing all menu items

function setup() {
    pages = selectAll('.page');
    menuItems = selectAll('.menuitem');

    // Menu items should switch pages when it reacts by the mousepressed function
    for (let m of menuItems) {
        m.mousePressed(function(e) {
            let nr = e.target.id.slice(-1); // Get the last character in a string
            shiftPage(nr); // Switch to the page
        });
    }
    
    shiftPage(currentPage);
    //shiftPage is the function that takes a number and changes it to a page
    setTimeout(function() {
        select('header').addClass('hidden');
    }, 10000);
    // Hide the menu after 10 seconds
}

function shiftPage(num) {
    if (num == "ArrowLeft") {
        num = currentPage - 1;
    }
    if (num == "ArrowRight") {
        num = currentPage + 1;
    }

    if (isNaN(num) || num > pages.length || num == 0) {
        return;
    }

    select("#page" + currentPage).removeClass('visible');
    select("#menu" + currentPage).removeClass('active');
    currentPage = num;
    select("#page" + currentPage).addClass('visible');
    select("#menu" + currentPage).addClass('active');

    // Automatically displays the image if page 3 is the "active" page so to speak
    if (currentPage == 3) {
        displayImage();
    }
}

function displayImage() {
    const imageUrl = "https://i.ibb.co/GPYK01Q/babadabooey.png"; // image URL

    // I create an img element and set the src attribute to the URL
    let imgElement = createImg(imageUrl, 'Uploaded image');
    imgElement.style('max-width', '100%');
    imgElement.style('height', 'auto');

    // Set the image to the image container on page 3
    let container = select('#imageContainer');
    container.html(''); // Clear the container before adding a new image
    container.child(imgElement);
}

function keyPressed() {
    shiftPage(key);
}
