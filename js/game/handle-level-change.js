// handle level change
// ===========================
function handleLevel(newLevel) {
    level = newLevel;
    levels[level].init();
}

function handleLevelChange() {
    level++;
    historicLevelSpawnCount = 0; // reset level spawn count
    levelKillCount = 0; // reset level kill count
    gameLevelNum.textContent = level - 2;
    handleLevel(level);
    console.log("current level: " + level);
}
