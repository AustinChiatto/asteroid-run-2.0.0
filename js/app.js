// Global Variables
// ===========================
const canvas = document.querySelector(".game-canvas");
const c = canvas.getContext('2d');

// Canvas Dimensions
// ===========================
canvas.width = 800;
canvas.height = innerHeight - 64;

// create backdrop class
class CanvasBackdrop {
    constructor() {
        // adjust position to top right
        this.position = {
            x: 0,
            y: 0
        };

        // create a new image object
        const canvasBackdrop = new Image();
        // set the objects path to grab the image
        canvasBackdrop.src = './assets/backdrop/space-backrop-01.png';

        this.image = canvasBackdrop;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    // draw image method
    draw() {
        // create a pattern
        const pattern = c.createPattern(this.image, "repeat-y");
        c.fillStyle = pattern;
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height*2
        );
    }
}

const backdrop = new CanvasBackdrop();
backdrop.draw();

// Player
// ===========================
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
    }

    // draw image method
    draw() {
        // if the image exists, set props
        if(this.image) {
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );

            
        }
    }
}

// create a new player object
const player = new Player();
// draw player object
player.draw();

// animation loop
// ===========================
// continuously draws items
function render() {
    requestAnimationFrame(render);

    backdrop.draw();
    player.draw();
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
            break
        case 'ArrowRight':
            console.log("right")
            break
        case 'ArrowUp':
            console.log("up")
            break
        case 'ArrowDown':
            console.log("down")
            break
    }
});