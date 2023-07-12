let bullet = 0; // currently selected bullet type
let counter = 0; // Counter for generating unique IDs
let indent = 0;
let lastIndent = 0;
let anItemExists = false;
const indentLevel = document.querySelector(".indent-level");
const bulletType = document.querySelector(".bullet-type");
const bulletName = document.querySelector(".bullet-name");
const items = document.querySelector(".items");
const textInput = document.querySelector(".text-input");

// this block adds today's date formatted in the BuJo style when the page loads
const opts = { day: "numeric", month: "numeric", weekday: "short" };
let d = Intl.DateTimeFormat("en-UK", opts)
  .format(new Date())
  .split("")
  .filter((x) => /[\w]/.test(x));
const formattedDate = [
  d.slice(3, 5).join(""),
  d.slice(5, 7).join(""),
  d.slice(0, 2).join("").toUpperCase(),
].join(".");
document.querySelector(".date").textContent = formattedDate;

function indentMore() {
  if (anItemExists === false) {
    indentLevel.textContent = 0;
  } else {
  if (indent < lastIndent + 1 && anItemExists)
  {
    indentLevel.textContent = ++indent;
  }
}
}

function indentLess() {
  if (indent > 0)
    indentLevel.textContent = --indent;
}

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
// function addItem() {
//   // Create the new element
//   var newElement = document.createElement("p");
//   newElement.id = "item" + counter;
//   newElement.innerHTML = textInput.value;
//   textInput.value = "";

//   // Append the new element to items <div>
//   items.appendChild(newElement);
//   counter++;
// }

function addItemUsingTemplate() {
  if (!textInput.value) return;
  // get the template for to do list items (from the HTML)
  const template = document.querySelector("#toDoItemTemplate");
  // clone the content of the template (returns a DocumentFragment)
  const domFragment = template.content.cloneNode(true);

  domFragment.querySelector("div").id = "item" + counter;
  domFragment.querySelector("div").style.gridColumn = `${indent + 2} / 24`;
  lastIndent = indent;

  domFragment.querySelector(".toDoBullet").innerHTML = bulletType.innerHTML;
  domFragment.querySelector(".toDoBullet").id = "itemBullet" + counter;
  domFragment.querySelector(".toDoItemText").innerHTML = textInput.value;
  domFragment.querySelector(".toDoItemText").id = "itemText" + counter;

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
  anItemExists = true;
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
  /* got rid of parentElement for now because it was breaking on the new grid
    layout and haven't figured out how to fix yet */
  if (clickedItem.classList.contains("strikethrough")) {
    clickedItem.classList.remove("strikethrough");
  } else {
    // clickedItem.parentElement.querySelector(".toDoBullet").innerHTML = "•";
    clickedItem.classList.add("strikethrough");
  }
}

// Adding enter key function to text-area
const inputElement = document.getElementById("text-input");
const submitButton = document.getElementById("submit-button");

inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission behavior
    submitButton.click();
  }
});
