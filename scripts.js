let bullet = 0; // currently selected bullet type
let counter = 0; // Counter for generating unique IDs
const bulletType = document.querySelector('.bullet-type');
const bulletName = document.querySelector('.bullet-name');
const items = document.querySelector('.items');
const textInput = document.querySelector('.text-input');

// cycles forwards through bullet types when creating a new item
function nextBullet() {
    bullet = bullet < 2 ? ++bullet : 0;
    updateBullet();
}

// cycles backwards through bullet types when creating a new item
function prevBullet() {
    bullet = bullet > 0 ? --bullet : 2;
    updateBullet();
}

// updates the currently selected bullet type
function updateBullet() {
    switch(bullet) {
        case 0:
            bulletType.innerHTML = "•";
            bulletName.innerHTML = "Task";
            return;
        case 1:
            bulletType.innerHTML = "—";
            bulletName.innerHTML = "Note";
            return;
        case 2:
            bulletType.innerHTML = "0";
            bulletName.innerHTML = "Event";
            return;
    }
}

function addItem() {
    // Create the new element
    var newElement = document.createElement("p");
    newElement.id = "item" + counter;
    newElement.innerHTML = textInput.value;
    textInput.value = "";

    // Append the new element to items <div>
    items.appendChild(newElement);
    counter++;
}