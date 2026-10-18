
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
    gameMode = mode
    attempts = 0
    message.textContent = ""

    modeSelection.classList.add("hidden")
    gameArea.classList.remove("hidden")

    if (gameMode === "PvC") {
        gameTitle.textContent = "Player vs Computer"
        secretNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER

        p1InputArea.classList.add("hidden")
        guessArea.classList.remove("hidden")

        turnInstruction.textContent = "Guess the number (1-100):"
    } else {
        gameTitle.textContent = "Player vs Player"

        p1InputArea.classList.remove("hidden")
        guessArea.classList.add("hidden")

        secretInput.value = ""
        guessInput.value = ""
    }
}

function saveSecretNumber() {
    const number = Number(secretInput.value)

    if (
        secretInput.value === "" ||
        !Number.isInteger(number) ||
        number < MIN_NUMBER ||
        number > MAX_NUMBER
    ) {
        message.textContent = " Enter a valid number between 1 and 100 "
        return
    }

    secretNumber = number
    attempts = 0

    p1InputArea.classList.add("hidden")
    guessArea.classList.remove("hidden")

    secretInput.value = ""
    guessInput.value = ""

    turnInstruction.textContent = "Player 2: Guess the number (1-100)"
    message.textContent = "Player 2, it's your turn!"
}

function checkGuess() {
    const guess = Number(guessInput.value)

    if (
        guessInput.value === "" ||
        !Number.isInteger(guess) ||
        guess < MIN_NUMBER ||
        guess > MAX_NUMBER
    ) {
        message.textContent = "Enter a valid number between 1 and 100."
        return
    }

    attempts++

    if (guess === secretNumber) {
        if (gameMode === "PvC") {
            message.textContent =
                "Correct! You win! Attempts: " + attempts
        } else {
            message.textContent =
                "Correct! Player 2 wins! Attempts: " + attempts
        }

        guessArea.classList.add("hidden")
        return
    }

    if (attempts === MAX_ATTEMPTS) {
        message.textContent =
            "Game Over! The correct number was " + secretNumber

        guessArea.classList.add("hidden")
        return
    }

    if (guess < secretNumber) {
        message.textContent =
            "Too low! Attempts left: " + (MAX_ATTEMPTS - attempts)
    } else {
        message.textContent =
            "Too high! Attempts left: " + (MAX_ATTEMPTS - attempts)
    }

    guessInput.value = ""
    guessInput.focus()

}

function resetGame() {
    gameMode = ""
    secretNumber = 0
    attempts = 0

    modeSelection.classList.remove("hidden")
    gameArea.classList.add("hidden")
    p1InputArea.classList.add("hidden")
    guessArea.classList.add("hidden")

    secretInput.value = ""
    guessInput.value = ""
    message.textContent = ""

}

/*----------------------------- Event Listeners -----------------------------*/

modeButtons[0].addEventListener("click", function () {
    selectMode("PvC")
})

modeButtons[1].addEventListener("click", function () {
    selectMode("PvP")
})

lockButton.addEventListener("click", saveSecretNumber)

checkButton.addEventListener('click', checkGuess)

restartButton.addEventListener('click', resetGame)
