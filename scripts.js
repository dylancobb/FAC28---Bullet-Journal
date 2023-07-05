let bullet = 0; // currently selected bullet type
let counter = 0; // Counter for generating unique IDs
const bulletType = document.querySelector(".bullet-type");
const bulletName = document.querySelector(".bullet-name");
const items = document.querySelector(".items");
const textInput = document.querySelector(".text-input");

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
  switch (bullet) {
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

// Removed this function in favoour of the one below utilizing a template element
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

function addItemUsingTemplate() {
  // get the template for to do list items (from the HTML)
  const template = document.querySelector("#toDoItemTemplate");
  // clone the content of the template (returns a DocumentFragment)
  const domFragment = template.content.cloneNode(true);

  domFragment.querySelector("div").id = "item" + counter;

  domFragment.querySelector(".toDoBullet").innerHTML = bulletType.innerHTML;
  domFragment.querySelector(".toDoItemText").innerHTML = textInput.value;

  if (domFragment.querySelector(".toDoBullet").innerHTML === "•") {
    domFragment.querySelector(".toDoBullet").classList.add("clickable");
    domFragment.querySelector(".toDoItemText").classList.add("clickable");
    domFragment
      .querySelector(".toDoItemText")
      .addEventListener("click", function () {
        strikethroughSwitch(this);
      });
  }

  items.appendChild(domFragment);
  textInput.value = "";
  counter++;
}

function bulletSwitch(clickedBullet) {
  const toDoBullet = clickedBullet;

  if (
    clickedBullet.parentElement.classList.contains("strikethrough") === false
  ) {
    switch (toDoBullet.innerHTML) {
      case "•":
        toDoBullet.innerHTML = "X";
        break;
      case "X":
        toDoBullet.innerHTML = "•";
        break;
      default:
        // Handle any other cases here
        break;
    }
  }
}

function strikethroughSwitch(clickedItem) {
  if (clickedItem.parentElement.classList.contains("strikethrough")) {
    clickedItem.parentElement.classList.remove("strikethrough");
  } else {
    clickedItem.parentElement.classList.add("strikethrough");
    clickedItem.parentElement.firstChild.innerHTML = "•";
  }
}
