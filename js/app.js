// Global Variables
// ===========================
const canvas = document.querySelector(".game-canvas");
const c = canvas.getContext('2d');

// Canvas
// ===========================
// define dimensions
canvas.width = 800;
canvas.height = innerHeight - 64;

// create a new image object
const canvasBackdrop = new Image();
// set the objects path to grab the image
canvasBackdrop.src = './assets/backdrop/space-backrop-01.png';

// create backdrop class
class CanvasBackdrop {
    constructor(image) {
        // adjust position to top right
        this.position = {
            x: 0,
            y: 0
        };

        this.image = canvasBackdrop;
        this.width = canvas.width;
        this.height = canvas.height;
        this.patternPosition = 0; // initialize pattern position

        this.buffer = document.createElement('canvas');
        this.buffer.width = this.width;
        this.buffer.height = this.height;
        this.bufferCtx = this.buffer.getContext('2d');
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
            y: 0
        };

        // create a new image object
        const image = new Image();
        // set image path to path of image
        image.src = './assets/player/player-ship.png';
        // when the image loads, set image and dimensions
        image.onload = () => {
            this.image = image;
            this.width = image.width;
            this.height = image.height;
            // define player position
            this.position = {
                x: (canvas.width / 2) - (this.width / 2),
                y: (canvas.height / 2) - (this.height / 2)
            };
        }
    };

    // draw image method
    draw() {
        // if the image exists, set props
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    };

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
// set all props as false
const controls = {
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    },
    x: {
        pressed: false
    },
    z: {
        pressed: false
    }
}

// animation loop
// ===========================
// continuously draws items
function render() {
    requestAnimationFrame(render);
    c.clearRect(0, 0, canvas.width, canvas.height);
    // objects
    backdrop.update();
    player.update();

    // controls
    // ===========================
    // horizontal movement
    if (controls.left.pressed && player.position.x >= 0) { // if left arrow is pressed
        player.velocity.x = -movementSpeed;
    } else if (controls.right.pressed && (player.position.x + player.width) <= canvas.width) { // if right arrow is pressed
        player.velocity.x = movementSpeed;
    } else {
        player.velocity.x = 0;
    }

    // vertical movement
    if (controls.up.pressed && player.position.y >= 0) { // if up arrow is pressed
        player.velocity.y = -movementSpeed;
    } else if (controls.down.pressed && (player.position.y + player.height) <= canvas.height) { // if down arrow is pressed
        player.velocity.y = movementSpeed;
    } else {
        player.velocity.y = 0;
    }
}

render();

// player movement
// ===========================
// when a key is pressed down
addEventListener('keydown', ({ key }) => {
    // switch statement to check if/what key has been pressed down
    switch(key) {
        case 'ArrowLeft':
            console.log("left");
            controls.left.pressed = true;
            break
        case 'ArrowRight':
            console.log("right")
            controls.right.pressed = true;
            break
        case 'ArrowUp':
            console.log("up")
            controls.up.pressed = true;
            break
        case 'ArrowDown':
            console.log("down")
            controls.down.pressed = true;
            break
        case 'x':
            console.log("shield")
            controls.x.pressed = true;
            break
        case 'z':
            console.log("shoot")
            controls.z.pressed = true;
            break
    }
});

addEventListener('keyup', ({ key }) => {
    // switch statement to check if/what key has been un-pressed
    switch(key) {
        case 'ArrowLeft':
            console.log("left");
            controls.left.pressed = false;
            break
        case 'ArrowRight':
            console.log("right")
            controls.right.pressed = false;
            break
        case 'ArrowUp':
            console.log("up")
            controls.up.pressed = false;
            break
        case 'ArrowDown':
            console.log("down")
            controls.down.pressed = false;
            break
        case 'x':
            console.log("shield")
            controls.x.pressed = false;
            break
        case 'z':
            console.log("shoot")
            controls.z.pressed = false;
            break
    }
});