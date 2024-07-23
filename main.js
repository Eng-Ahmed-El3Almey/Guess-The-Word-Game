//Setting Game Name
let gameName = "Gusee The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By El3Almey`;
// Setting Game Options
let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
// Manage Word
let wordToGusee = "";
const words = [
  "Create",
  "Update",
  "Deleta",
  "Master",
  "Branch",
  "mainly",
  "Elzero",
  "School",
];
wordToGusee = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGusee);
function generateInput() {
  const inputContainer = document.querySelector(".inputs");
  // Create Main Try Div
  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    // Create Inputes
    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `gusee-${i}-Letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputContainer.appendChild(tryDiv);
    inputContainer.children[0].children[1].focus();
  }
    // Disable All Inputes Expect First One
  const inputsInDisavledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisavledDiv.forEach((input) => (input.disabled = true));
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    // Convert Input To Uppercase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // console.log(index);
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target); // Or This
      // console.log(currentIndex);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}
const guseeButton = document.querySelector(".check");
guseeButton.addEventListener("click", handleGuesses);

console.log(wordToGusee);

function handleGuesses() {
  let successGuess = true;
  console.log(wordToGusee);
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGusee(i - 1);

    // Game Logic
    if (letter === actualLetter) {
      // Letter Is Correct And In Place
      inputField.classList.add("yes-in-place");
    } else if (wordToGusee.includes(letter) && letter !== "") {
      // Letter Is Correct And Not In Place
      inputField.classList.add("no-in-place");
      successGuess = false;
    }
  }
}

window.onload = function () {
  generateInput();
};
