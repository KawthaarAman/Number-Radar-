
/*-------------------------------- Constants --------------------------------*/

const MIN_NUMBER = 1
const MAX_NUMBER = 100
const MAX_ATTEMPTS = 7

/*-------------------------------- Variables --------------------------------*/

let gameMode = ""
let secretNumber = 0
let attempts = 0

/*------------------------ Cached Element References ------------------------*/

const modeSelection = document.querySelector("#mode-selection")
const gameArea = document.querySelector("#game-area")
const p1InputArea = document.querySelector("#p1-input-area")
const guessArea = document.querySelector("#guess-area")
const secretInput = document.querySelector("#secret-number")
const guessInput = document.querySelector("#user-guess")
const message = document.querySelector("#game-message")
const turnInstruction = document.querySelector("#turn-instruction")
const gameTitle = document.querySelector("#game-title")

const modeButtons = document.querySelectorAll("#mode-selection button")
const lockButton = document.querySelector("#p1-input-area button")
const checkButton = document.querySelector("#guess-area button")
const restartButton = document.querySelector("#restart-btn")

/*-------------------------------- Functions --------------------------------*/



function selectMode(mode) {
    gameMode = mode;
    attempts = 0;
    message.textContent = "";

    modeSelection.classList.add("hidden");
    gameArea.classList.remove("hidden");

    if (gameMode === "PvC") {
        gameTitle.textContent = "Player vs Computer";
        secretNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;

        p1InputArea.classList.add("hidden");
        guessArea.classList.remove("hidden");

        turnInstruction.textContent = "Guess the number (1-100):";
    } else {
        gameTitle.textContent = "Player vs Player";

        p1InputArea.classList.remove("hidden");
        guessArea.classList.add("hidden");

        secretInput.value = "";
        guessInput.value = "";
    }
}

function saveSecretNumber() {

}

function checkGuess() {

}

function resetGame() {

}

/*----------------------------- Event Listeners -----------------------------*/

modeButtons[0].addEventListener("click", function () {
    selectMode("PvC");
});

modeButtons[1].addEventListener("click", function () {
    selectMode("PvP");
});

