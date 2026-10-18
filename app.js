
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



/*----------------------------- Event Listeners -----------------------------*/


