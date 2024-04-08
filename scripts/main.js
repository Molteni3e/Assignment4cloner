const textDuplicationSection = document.getElementById("text-duplication");

const textInput = textDuplicationSection.querySelector("input");
const textOutput = textDuplicationSection.querySelector("p");

const buttons = textDuplicationSection.querySelectorAll("button");
const clearButton = buttons[0];
const boldButton = buttons[1];
let isBold = false; // Flag to track bold state

const listContainer = document.getElementById("list-container");

const heading = document.querySelector("section h2");
const contentContainer = heading.parentElement; // Traverse to parent section


// for hiding the image (1)
function hideImage() {
  const image = document.querySelector("img");
  image.style.display = "none";
}


// for changing paragraph color on clicks (2)
let originalColor; 
const paragraph = document.querySelector(".default-color");
originalColor = paragraph.style.backgroundColor || "inherit"; 

paragraph.addEventListener("click", () => {
  paragraph.classList.toggle("deep-pink");
});

paragraph.addEventListener("dblclick", () => {
  paragraph.style.color = "purple"; 
});

// for printing typed key (3)
textInput.addEventListener("keyup", (event) => {
  const typedChar = event.key;
  if (typedChar === "Backspace") {
    // Handle Backspace
    textOutput.textContent = textOutput.textContent.slice(0, -1);
  } else {
    textOutput.textContent += typedChar;
  }
});

// for clearing text (3)
clearButton.addEventListener("click", () => {
  textInput.value = "";
  textOutput.textContent = "";
  textInput.focus(); // Set focus back to input field
  boldButton.style.display = "inline"; // Show bold button again
  isBold = false;
});

// for bolding cloned text (3)
boldButton.addEventListener("click", () => {
  if (!isBold) {
    const halfLength = Math.floor(textOutput.textContent.length / 2);
    const boldText = textOutput.textContent.substring(0, halfLength);
    const remainingText = textOutput.textContent.substring(halfLength);
    textOutput.innerHTML = `<b>${boldText}</b>` + remainingText;
    boldButton.style.display = "none"; // Hide bold button after use
    isBold = true;
  }
});

// for list manipulation (4)
listContainer.addEventListener("mouseover", (event) => {
  const target = event.target;
  if (target.tagName === "LI") {
    const firstListItem = listContainer.querySelector("li:first-child");
    const lastListItem = listContainer.querySelector("li:last-child");
    if (target === firstListItem || target === lastListItem) {
      target.classList.add("pink");
    }
  }
});
// also for list manipulation (4)
listContainer.addEventListener("mouseout", (event) => {
  const target = event.target;
  if (target.tagName === "LI") {
    target.classList.remove("pink");
  }
});

// for adding new list item (4)
listContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "LI") {
    const newListItem = document.createElement("li");
    newListItem.textContent = "New Item";
    listContainer.querySelector("ul").insertBefore(newListItem, target.nextSibling);
  }
});

// for changing content in paragraph on click (5)
heading.addEventListener("click", () => {
  const contentUrl = "alternate_content.html"; // Replace with actual path

  fetch(contentUrl)
    .then(response => response.text()) // Get response as text
    .then(data => {
      contentContainer.innerHTML = data; // Replace content
    })
    .catch(error => console.error("Error fetching content:", error));
});


