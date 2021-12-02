// Grab DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgame = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words to display
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
  "abdomen",
  "water",
  "clock",
  "javascript",
  "speakers",
  "run",
  "appearance",
  "mixed",
  "firefly",
];

// Init variables
let randomWord;
let score = 0;
let time = 10;

// Set difficulty value from local storage if available
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value = difficulty;

// Generate random word from array
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// Update Time
const updateTime = () => {
  time--;
  timeElement.innerHTML = `${time} s`;
  if (time === 0) {
    clearInterval(timeInterval);

    // End game
    gameOver();
  }
};

// Game over, show end screen
const gameOver = () => {
  endgame.innerHTML = `
    <h1>Time ran out</h1> 
    <p>Your final score is: ${score}</p>
    <button onclick="location.reload()">Play again</button>
  `;
  text.disabled = true;
};

// Call the updateTime func every second
const timeInterval = setInterval(updateTime, 1000);

// Add word to DOM
const addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
};

// Update score
const updateScore = () => {
  score++;
  scoreElement.innerHTML = score;
};

// Add event listeners
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear input field
    e.target.value = "";
    if (difficulty === "easy") {
      time += 6;
    }
    if (difficulty === "medium") {
      time += 4;
    }
    if (difficulty === "hard") {
      time += 2;
    }
    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Add word to DOM on load
addWordToDOM();
