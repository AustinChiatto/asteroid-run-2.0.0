// Player Settings
// ===========================
const movementSpeed = 5;

// Player Projectile Settings
// ===========================
const projectileSpeed = -10;
let heatCap = 20; // how many projectiles the user can fire before over-heating

// Enemy Settings
// ===========================
// how fast the enemy moves on screen
let enemyMovementSpeed = 2;
// point value of enemy
let enemyValue; // point value of an enemy awarded to a player when eliminated
// spawn rates & totals
let maxEnemiesOnScreen = 0; // total number of enemies allowed on screen at any given time
let levelSpawnCap = 0; // how many enemies CAN spawn in the level
let historicLevelSpawnCount = 0; // how many enemies HAVE spawned in the level
let levelKillCount = 0; // how many enemies have been eliminated in the current level
// spawn timing
const enemySpawnMinFrames = 100;
const enemySpawnMaxFrames = 200;

// Enemy Projectile Settings
// ===========================
let enemyProjectileSpeed = 7;
