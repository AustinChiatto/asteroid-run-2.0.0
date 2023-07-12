// Game States
// ===========================
let game = {
    over: false, // if game has ended
    active: false, // if game is currently running
};

// Game Levels
// ===========================
function handleLevel(newLevel) {
    level = newLevel;
    levels[level].init();
}

let levels = {
    // start screen
    1: {
        init: () => {
            // stop game
            game.active = false;
            game.over = false;
            // show html
            startScreen.style.display = "flex";
        },
    },
    // game over
    2: {
        init: () => {
            // stop game
            game.active = false;
            // remove all enemies from canvas
            enemies.length = 0;
            enemyProjectiles.length = 0;
            pointTotal.textContent = gameScore;
            // show game over screen
            gameOverScreen.style.display = "flex";
        },
    },
    // game start
    3: {
        init: () => {
            // start game
            game.active = true;
            game.over = false;
            // show player
            player.opacity = 1;
            // show score
            gameScoreContainer.style.opacity = 1;
            // hide html
            startScreen.style.display = "none";
            gameOverScreen.style.display = "none";
        },
    },
};
// load level on first load
levels[level].init();
