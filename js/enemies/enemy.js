// enemy
// ===========================
class Enemy {
    constructor({ position, velocity, type }) {
        this.position = position; // sets position
        this.velocity = velocity; // sets velocity
        this.type = type; // sets the type of enemy
        this.spawnFrame = frameCount; // used to start the frame count for the enemy projectiles

        // create a new image object
        const image = new Image();

        switch (type) {
            case 1:
                // set image path to path of image
                image.src = "./assets/enemy/enemy-001.png";
                // set enemy value
                enemyValue = 50;
                break;
            case 2:
                // set image path to path of image
                image.src = "./assets/enemy/enemy-001.png";
                // set enemy value
                enemyValue = 100;
                break;
            case 3:
                // set image path to path of image
                image.src = "./assets/enemy/enemy-001.png";
                // set enemy value
                enemyValue = 200;
                break;
            default:
                console.log("Unknown enemy type.");
                break;
        }

        // console.log(this.type);

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

    enemyMovement() {
        // horizontal movement
        if (this.position.x >= 0 && this.position.x + this.width <= canvas.width) {
            this.velocity.x = (Math.floor(Math.random() * 3) - 1) * enemyMovementSpeed;
        }

        // vertical movement
        if (this.position.y >= 0 && this.position.y + this.height <= canvas.height) {
            this.velocity.y = (Math.floor(Math.random() * 3) - 1) * enemyMovementSpeed;
        }
    }
}

const enemies = [];

// Handle Enemy Spawning
// ===========================

// take total enemy spawn cap
// most of cap will be type 1
// some of cap will be type 2
// some of cap will be type 3

function spawnEnemies() {
    if (enemies.length < maxEnemiesOnScreen && historicLevelSpawnCount <= levelSpawnCap) {
        historicLevelSpawnCount++;
        enemies.push(
            new Enemy({
                position: {
                    x: 0,
                    y: 0,
                },
                velocity: {
                    x: 0,
                    y: 2,
                },
                type: 1,
            })
        );
    }
}

// Handle Enemy Projectiles
// ===========================
class EnemyProjectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;

        // create a new image object
        const projectile = new Image();
        // set image path to path of image
        projectile.src = "./assets/enemy/enemy-projectile-001.png";
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
