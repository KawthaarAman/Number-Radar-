
/*-------------------------------- Constants --------------------------------*/

const MIN_NUMBER = 1
const MAX_NUMBER = 100
const MAX_ATTEMPTS = 7

/*-------------------------------- Variables --------------------------------*/

let gameMode = ""
let secretNumber = 0
let attempts = 0
let isPaused = false
let highScore = Number(localStorage.getItem("numberRadarHighScore")) || 0

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
const highScoreElement = document.querySelector("#high-score")
const currentScoreElement = document.querySelector("#current-score")

const modeButtons = document.querySelectorAll("#mode-selection button")
const lockButton = document.querySelector("#p1-input-area button")
const checkButton = document.querySelector("#guess-area button")
const restartButton = document.querySelector("#restart-btn")
const pauseButton = document.querySelector("#pause-btn")
const resumeButton = document.querySelector("#resume-btn")
const themeToggle = document.querySelector("#theme-toggle")

/*----------------------------- Sound Effects -----------------------------*/

const winSound = new Audio("./sounds/clap.mp3")
const wrongSound = new Audio("./sounds/wrong.wav")
const gameOverSound = new Audio("./sounds/game-over.wav")

/*-------------------------------- Functions --------------------------------*/

function selectMode(mode) {
    gameMode = mode
    attempts = 0
    message.textContent = ""
    currentScoreElement.textContent = ""

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

    if (isPaused) {
        return
    }

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

        winSound.currentTime = 0
        winSound.play()

        updateHighScore()

        guessArea.classList.add("hidden")
        return
    }

    if (attempts === MAX_ATTEMPTS) {
        message.textContent =
            "Game Over! The correct number was " + secretNumber

        gameOverSound.currentTime = 0
        gameOverSound.play()

        guessArea.classList.add("hidden")
        return
    }

    if (guess < secretNumber) {
        message.textContent =
            "Higher! Attempts left: " + (MAX_ATTEMPTS - attempts)
    } else {
        message.textContent =
            "Lower! Attempts left: " + (MAX_ATTEMPTS - attempts)
    }

    wrongSound.currentTime = 0
    wrongSound.play()

    guessInput.value = ""
    guessInput.focus()

}

function pauseGame() {
    if (isPaused || guessArea.classList.contains("hidden")) {
        return
    }

    isPaused = true

    checkButton.disabled = true
    guessInput.disabled = true

    pauseButton.classList.add("hidden")
    resumeButton.classList.remove("hidden")

    message.textContent = "Game Paused"
}

function resumeGame() {
    if (!isPaused) {
        return
    }

    isPaused = false

    checkButton.disabled = false
    guessInput.disabled = false

    pauseButton.classList.remove("hidden")
    resumeButton.classList.add("hidden")

    message.textContent = "Game Resumed"
    guessInput.focus()
}

function resetGame() {
    gameMode = ""
    secretNumber = 0
    attempts = 0
    isPaused = false

    modeSelection.classList.remove("hidden")
    gameArea.classList.add("hidden")
    p1InputArea.classList.add("hidden")
    guessArea.classList.add("hidden")

    secretInput.value = ""
    guessInput.value = ""
    message.textContent = ""

    checkButton.disabled = false
    guessInput.disabled = false

    pauseButton.classList.remove("hidden")
    resumeButton.classList.add("hidden")

}

function updateHighScore() {
    const score = (MAX_ATTEMPTS - attempts + 1) * 100

    currentScoreElement.textContent = "Your Score: " + score

    if (score > highScore) {
        highScore = score

        localStorage.setItem("numberRadarHighScore", highScore)

        highScoreElement.textContent = "High Score: " + highScore
    }
}

highScoreElement.textContent = "High Score: " + highScore

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

pauseButton.addEventListener("click", pauseGame)

resumeButton.addEventListener("click", resumeGame)

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode")

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "Light Mode"
    } else {
        themeToggle.textContent = "Dark Mode"
    }

})
