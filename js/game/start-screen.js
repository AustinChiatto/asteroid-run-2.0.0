// Start Screen
// ===========================
// if space bar is pressed while on home screen, change level to first level
if ((level == 1 && !game.active) || (level == 2 && !game.active)) {
    document.addEventListener("keydown", function (event) {
        if (event.code === "Space" && !game.active) {
            handleLevel(3);
            levels[level].init();
        }
    });
}
