// Global Variables
// ===========================
const gameScoreContainer = document.querySelector(".game-score");
const gameScoreNum = document.querySelector(".game-score__number");
const canvas = document.querySelector(".game-canvas");
const c = canvas.getContext("2d");

// Canvas
// ===========================
// define dimensions
canvas.width = 800;
canvas.height = innerHeight;

// resize & reload canvas on resize
window.addEventListener("resize", function () {
    location.reload(); // reloads the page if the window dimensions are changed. -- temp solution
});

// Game States
// ===========================
let game = {
    over: false, // if game has ended -- used to trigger game over screen
    active: true, // if game is currently running - used to start game
};
