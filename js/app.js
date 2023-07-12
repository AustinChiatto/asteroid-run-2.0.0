// Global Variables
// ===========================
const gameScoreContainer = document.querySelector(".game-score");
const gameScoreNum = document.querySelector(".game-score__number");
const gameLevelNum = document.querySelector(".game-level__number");
const pointTotal = document.querySelector(".js-pointTotal");
const levelTotal = document.querySelector(".js-levelTotal");
const canvas = document.querySelector(".game-canvas");
const c = canvas.getContext("2d");
const startScreen = document.querySelector(".js-startScreen");
const gameOverScreen = document.querySelector(".js-gameOverScreen");

// Canvas
// ===========================
// define dimensions
canvas.width = 800;
canvas.height = innerHeight;

// resize & reload canvas on resize
window.addEventListener("resize", function () {
    location.reload(); // reloads the page if the window dimensions are changed. -- temp solution
});

// initialize level
// ===========================
let level = 1;
