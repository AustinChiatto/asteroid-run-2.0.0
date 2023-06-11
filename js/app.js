// Global Variables
// ===========================
const canvas = document.querySelector(".game-canvas");
const c = canvas.getContext("2d");

// Canvas
// ===========================
// define dimensions
canvas.width = 800;
canvas.height = 900;

// create a new image object
const canvasBackdrop = new Image();
// set the objects path to grab the image
canvasBackdrop.src = "./assets/backdrop/space-backrop-01.png";

// create backdrop class
class CanvasBackdrop {
    constructor() {
        // adjust position to top right
        this.position = {
            x: 0,
            y: 0,
        };

        this.image = canvasBackdrop;
        this.width = canvas.width;
        this.height = canvas.height;
        this.patternPosition = 0; // initialize pattern position

        this.buffer = document.createElement("canvas");
        this.buffer.width = this.width;
        this.buffer.height = this.height;
        this.bufferCtx = this.buffer.getContext("2d");
    }

    // draw image method
    draw() {
        const pattern = c.createPattern(this.image, "repeat-y");
        c.fillStyle = pattern;
        c.save();

        // calculate position of top of pattern
        const top = this.position.y + this.patternPosition - this.height;

        // draw pattern at new position
        c.translate(this.position.x, this.position.y + this.patternPosition);
        c.fillRect(0, 0, this.width, this.height);

        // draw new pattern above old one if top is below canvas
        if (top < 0) {
            c.translate(0, -this.height);
            c.fillRect(0, 0, this.width, this.height);
        }

        c.restore();
    }

    update() {
        // update pattern position
        this.patternPosition += 0.5;
        if (this.patternPosition >= this.height) {
            this.patternPosition = 0;
        }
        this.draw();
    }
}

const backdrop = new CanvasBackdrop();
backdrop.draw();

// Player
// ===========================
const movementSpeed = 5;
class Player {
    constructor() {
        // define player speed
        this.velocity = {
            x: 0,
            y: 0,
        };

        // controls player visibility
        this.opacity = 1;

        // create a new image object
        const image = new Image();
        // set image path to path of image
        image.src = "./assets/player/player-ship.gif";
        // when the image loads, set image and dimensions
        image.onload = () => {
            this.image = image;
            this.width = image.width;
            this.height = image.height;
            // define player position
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height * 2,
            };
        };
    }

    // draw image method
    draw() {
        c.save();
        c.globalAlpha = this.opacity;
        // if the image exists, set props
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        c.restore();
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}

// create a new player object
const player = new Player();

// Player Projectiles
// ===========================
const projectileSpeed = -10;
class PlayerProjectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;

        // create a new image object
        const projectile = new Image();
        // set image path to path of image
        projectile.src = "./assets/player/bullet-001.png";
        // when the image loads, set image and dimensions
        projectile.onload = () => {
            this.image = projectile;
            this.width = projectile.width * 2;
            this.height = projectile.height * 2;
        };
    }

    // draw image method
    draw() {
        // if the image exists, set props
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}

const playerProjectiles = [];

// Player Control Object
// ===========================
const controls = {
    left: {
        pressed: false,
    },
    right: {
        pressed: false,
    },
    up: {
        pressed: false,
    },
    down: {
        pressed: false,
    },
    x: {
        pressed: false,
    },
    z: {
        pressed: false,
    },
};

// enemy
// ===========================
class Enemy {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        // saves frame count from when enemy spawned in
        // used to start the frame count for the enemy projectiles
        this.spawnFrame = frameCount;
        // create a new image object
        const image = new Image();
        // set image path to path of image
        image.src = "./assets/enemy/enemy-placeholder.png";
        // when the image loads, set image and dimensions
        image.onload = () => {
            this.image = image;
            this.width = image.width;
            this.height = image.height;
            // define enemy position
            this.position = {
                x: Math.floor(Math.random() * (canvas.width - this.width / 2 - this.width / 2 + 1) + this.width / 2),
                y: 0 - this.height,
            };
        };
    }

    // draw image method
    draw() {
        // if the image exists, set props
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }

    fire(enemyProjectiles) {
        if (frameCount - this.spawnFrame >= 100 && (frameCount - this.spawnFrame) % 100 === 0) {
            enemyProjectiles.push(
                new EnemyProjectile({
                    position: {
                        x: this.position.x + this.width / 2,
                        y: this.position.y + this.height,
                    },
                    velocity: {
                        x: 0,
                        y: enemyProjectileSpeed,
                    },
                })
            );
        }
    }
}

let maximumEnemies = 2;
const enemySpawnMinFrames = 100;
const enemySpawnMaxFrames = 200;
const enemies = [];

function spawnEnemies() {
    if (enemies.length < maximumEnemies) {
        enemies.push(
            new Enemy({
                position: {
                    // x: (canvas.width / 2) - (this.width / 2),
                    x: 0,
                    y: 0,
                },
                velocity: {
                    x: 0,
                    y: 2,
                },
            })
        );
    }
}

// Player Projectiles
// ===========================
const enemyProjectileSpeed = 7;
class EnemyProjectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;

        // create a new image object
        const projectile = new Image();
        // set image path to path of image
        projectile.src = "./assets/player/bullet-001.png";
        // when the image loads, set image and dimensions
        projectile.onload = () => {
            this.image = projectile;
            this.width = projectile.width * 2;
            this.height = projectile.height * 2;
        };
    }

    // draw image method
    draw() {
        // if the image exists, set props
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}

const enemyProjectiles = [];

// animation loop
// ===========================
// continuously draws items
let frameCount = 0; // sets frame count
// defines game logic
let game = {
    over: false,
    active: true,
};

function render() {
    if (!game.active) return;
    requestAnimationFrame(render);
    frameCount++;
    c.clearRect(0, 0, canvas.width, canvas.height);
    // objects
    backdrop.update();
    player.update();

    // Player Projectiles
    // ===========================
    playerProjectiles.forEach((projectile, i) => {
        // if the projectile exits the top of the canvas
        if (projectile.position.y + projectile.height <= 0) {
            // delete the object from the array
            setTimeout(() => {
                playerProjectiles.splice(i, 1);
            }, 0);
        } else {
            projectile.update();
        }
    });

    // Enemy Spawning
    // ===========================
    let randomFrame = Math.floor(Math.random() * 100) + frameCount;
    if (frameCount >= randomFrame) {
        spawnEnemies();
        randomFrame = Math.floor(Math.random() * (enemySpawnMaxFrames - enemySpawnMinFrames + 1)) + enemySpawnMinFrames + frameCount;
    }

    // Enemy Projectiles &
    // Enemy Player Projectile Collision
    // ===========================
    enemies.forEach((enemy, i) => {
        enemy.update();
        // enemy projectile control
        // fire a projectile every 100 frames
        if (frameCount - enemy.spawnFrame >= 100 && (frameCount - enemy.spawnFrame) % 100 === 0) {
            enemy.fire(enemyProjectiles);
        }

        // Player Projectile Hits Enemy
        // ===========================
        playerProjectiles.forEach((projectile, j) => {
            if (projectile.position.y - projectile.height <= enemy.position.y + enemy.height && projectile.position.x + projectile.width >= enemy.position.x && projectile.position.x - projectile.width <= enemy.position.x + enemy.width && projectile.position.y + projectile.height >= enemy.position.y) {
                setTimeout(() => {
                    // finds the enemy in the enemies array
                    const enemyExists = enemies.find((foundEnemy) => {
                        return foundEnemy === enemy;
                    });
                    // finds the projectile in the playerProjectiles array
                    const projectileExists = playerProjectiles.find((foundProjectile) => {
                        return foundProjectile === projectile;
                    });

                    // if the enemy that is being removed exists inside the enemies array
                    // splice/remove it from the array
                    if (enemyExists && projectileExists) {
                        enemies.splice(i, 1);
                        playerProjectiles.splice(j, 1);
                    }
                }, 0);
            }
        });
    });

    // Enemy Projectile Hits Player
    // ===========================
    enemyProjectiles.forEach((enemyProjectile, i) => {
        if (enemyProjectile.position.y + enemyProjectile.height >= canvas.height) {
            // delete the object from the array
            setTimeout(() => {
                enemyProjectiles.splice(i, 1);
            }, 0);
        } else {
            enemyProjectile.update();
        }

        if (enemyProjectile.position.y - enemyProjectile.height <= player.position.y + player.height && enemyProjectile.position.x + enemyProjectile.width >= player.position.x && enemyProjectile.position.x - enemyProjectile.width <= player.position.x + player.width && enemyProjectile.position.y + enemyProjectile.height >= player.position.y) {
            console.log("boop");
            setTimeout(() => {
                enemyProjectiles.splice(i, 1);
                player.opacity = 0;
                game.over = true;
            }, 0);

            setTimeout(() => {
                game.active = false;
            }, 1500);
        }
    });

    // Player Controls
    // ===========================
    // horizontal movement
    if (controls.left.pressed && player.position.x >= 0) {
        // if left arrow is pressed
        player.velocity.x = -movementSpeed;
    } else if (controls.right.pressed && player.position.x + player.width <= canvas.width) {
        // if right arrow is pressed
        player.velocity.x = movementSpeed;
    } else {
        player.velocity.x = 0;
    }

    // vertical movement
    if (controls.up.pressed && player.position.y >= 0) {
        // if up arrow is pressed
        player.velocity.y = -movementSpeed;
    } else if (controls.down.pressed && player.position.y + player.height <= canvas.height) {
        // if down arrow is pressed
        player.velocity.y = movementSpeed;
    } else {
        player.velocity.y = 0;
    }
}

render();

// player movement
// ===========================
// when a key is pressed down
addEventListener("keydown", ({ key }) => {
    // check if game.over is true
    // if true return - doesn't run following code
    if (game.over) return;
    // switch statement to check if/what key has been pressed down
    switch (key) {
        case "ArrowLeft":
            controls.left.pressed = true;
            break;
        case "ArrowRight":
            controls.right.pressed = true;
            break;
        case "ArrowUp":
            controls.up.pressed = true;
            break;
        case "ArrowDown":
            controls.down.pressed = true;
            break;
        case "x":
            console.log("shield");
            console.log(enemies);
            controls.x.pressed = true;
            break;
        case "z":
            controls.z.pressed = true;
            playerProjectiles.push(
                new PlayerProjectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y,
                    },
                    velocity: {
                        x: 0,
                        y: projectileSpeed,
                    },
                })
            );
            break;
    }
});

addEventListener("keyup", ({ key }) => {
    // switch statement to check if/what key has been un-pressed
    switch (key) {
        case "ArrowLeft":
            controls.left.pressed = false;
            break;
        case "ArrowRight":
            controls.right.pressed = false;
            break;
        case "ArrowUp":
            controls.up.pressed = false;
            break;
        case "ArrowDown":
            controls.down.pressed = false;
            break;
        case "x":
            controls.x.pressed = false;
            break;
        case "z":
            controls.z.pressed = false;
            break;
    }
});
