// Start Screen
// ===========================
// if space bar is pressed while on home screen, change level to first level
if (level == 1) {
    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            handleLevel(3);
            levels[level].init();
        }
    });
}
