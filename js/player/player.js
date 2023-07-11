// Player
// ===========================
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

    beforeStart() {
        if (this.image) {
            this.draw();
            this.position.x = canvas.width / 2 - this.width / 2;
            this.position.y = canvas.height / 2 - this.height / 2;
        }
    }
}

// create a new player object
const player = new Player();

// Player Projectiles
// ===========================
class PlayerProjectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;

        // create a new image object
        const projectile = new Image();
        // set image path to path of image
        projectile.src = "./assets/player/player-projectile-001.png";
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
