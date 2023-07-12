// future game level plan
// ===========================
// version 2.1
// start level
// assign level a total enemy spawn cap
// once player has killed all enemies in cap
// move on to next level
// each increase in level:
//     ++ enemyMovementSpeed
//     ++ maxEnemiesOnScreen

// version 2.2
// add transition between levels
// each increase in level:
// spawn enemy variants that are worth more points and are more difficult
// every 5 levels is a boss level

// Game States
// ===========================
let game = {
    over: false, // if game has ended
    active: false, // if game is currently running
};

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
            gameScore = 0;
            gameScoreNum.textContent = gameScore;
            gameScoreContainer.style.opacity = 1;
            // reset enemy count
            historicLevelSpawnCount = 0;
            // hide html
            startScreen.style.display = "none";
            gameOverScreen.style.display = "none";
            // game settings
            console.log("level: 1");
            maxEnemiesOnScreen = 3;
            levelSpawnCap = 4;
            gameLevelNum.textContent = level - 2;
        },
    },
    4: {
        init: () => {
            console.log("level: 2");
            // game settings
            maxEnemiesOnScreen = 4;
            levelSpawnCap = 5; // number of enemies before next level
        },
    },
    5: {
        init: () => {
            console.log("level: 3");
            // game settings
            maxEnemiesOnScreen = 5;
            levelSpawnCap = 6; // number of enemies before next level
        },
    },
    6: {
        init: () => {
            console.log("level: 4");
            // game settings
            maxEnemiesOnScreen = 6;
            levelSpawnCap = 7; // number of enemies before next level
        },
    },
    7: {
        init: () => {
            console.log("level: 5");
            // game settings
            maxEnemiesOnScreen = 7;
            levelSpawnCap = 8; // number of enemies before next level
        },
    },
};
// load level on first load
levels[level].init();
