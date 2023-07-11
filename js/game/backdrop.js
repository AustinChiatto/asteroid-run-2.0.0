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
