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
