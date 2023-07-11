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

window.addEventListener("resize", function () {
    location.reload(); // reloads the page if the window dimensions are changed. -- temp solution
});

// Player Settings
// ===========================
const movementSpeed = 5;

// Player Projectile Settings
// ===========================
const projectileSpeed = -10;

// Enemy Settings
// ===========================
const enemyMovementSpeed = 2;
const maximumEnemies = 3;
const enemyValue = 50;
const enemySpawnMinFrames = 100;
const enemySpawnMaxFrames = 200;

// Enemy Projectile Settings
// ===========================
const enemyProjectileSpeed = 7;
