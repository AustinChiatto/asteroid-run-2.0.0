// Animation Loop
// ===========================
// continuously draws items
let frameCount = 0; // sets frame count
const fps = 90;
let randomFrame = Math.floor(Math.random() * 100) + frameCount;
// defines game logic

// Handle Rendering
// ===========================
function render() {
    setTimeout(() => {
        requestAnimationFrame(render);
    });

    frameCount++;
    if (game.active) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        // show and move bg
        backdrop.update();
        // run player object update method
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
            // fire a projectile every 100 frames from the frame that the enemy was spawned
            if (frameCount - enemy.spawnFrame >= 100 && (frameCount - enemy.spawnFrame) % 100 === 0) {
                enemy.fire(enemyProjectiles);
                enemy.enemyMovement();
            }

            // return enemy to canvas is out of bounds
            // perform a "U" turn
            if (enemy.position.x <= 0) {
                enemy.velocity.x = enemyMovementSpeed;
            } else if (enemy.position.x + enemy.width >= canvas.width) {
                enemy.velocity.x = -enemyMovementSpeed;
            } else if (enemy.position.y + enemy.height >= canvas.height - player.height * 2) {
                enemy.velocity.y = -enemyMovementSpeed;
            } else if (enemy.position.y <= 0) {
                enemy.velocity.y = enemyMovementSpeed;
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

                        // Remove Enemy
                        // ===========================
                        // if the enemy that is being removed exists inside the enemies array
                        // splice/remove it from the array
                        if (enemyExists && projectileExists) {
                            gameScore += enemyValue;
                            gameScoreNum.textContent = gameScore;
                            enemies.splice(i, 1);
                            playerProjectiles.splice(j, 1);
                        }
                    }, 0);
                }
            });
        });

        // Enemy Projectile
        // ===========================
        enemyProjectiles.forEach((enemyProjectile, i) => {
            // delete projectile if projectile leaves canvas
            if (enemyProjectile.position.y + enemyProjectile.height >= canvas.height) {
                // delete the object from the array
                setTimeout(() => {
                    enemyProjectiles.splice(i, 1);
                }, 0);
            } else {
                enemyProjectile.update();
            }

            // Enemy Projectile - Player Collision
            // ===========================
            if (enemyProjectile.position.y - enemyProjectile.height <= player.position.y + player.height && enemyProjectile.position.x + enemyProjectile.width >= player.position.x && enemyProjectile.position.x - enemyProjectile.width <= player.position.x + player.width && enemyProjectile.position.y + enemyProjectile.height >= player.position.y) {
                console.log("boop");
                setTimeout(() => {
                    enemyProjectiles.splice(i, 1);
                    player.opacity = 0;
                    game.over = true;
                }, 0);

                setTimeout(() => {
                    game.active = false;
                    handleLevel(2);
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
    } else {
        backdrop.update();
        player.beforeStart();
        gameScoreContainer.style.opacity = 0;
    }
}

render();
