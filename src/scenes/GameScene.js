import Phaser from 'phaser';
import Meteor from '../entities/Meteor.js';
import PowerUp, { PowerUpType } from '../entities/PowerUp.js';
import Boss from '../entities/Boss.js';
import WaveManager from '../managers/WaveManager.js';
import Explosion from '../effects/Explosion.js';
import HUD from '../ui/HUD.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        // Game state
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;

        // Power-up states
        this.activePowerUps = {
            shield: false,
            rapidFire: false,
            spreadShot: false
        };

        // Timers
        this.meteorSpawnTimer = 0;
        this.enemyShootTimer = 0;

        // Boss tracking
        this.currentBoss = null;
    }

    preload() {
        // Load assets
        const assetPath = '/kenney_space-shooter-redux/PNG/';

        // Player ship
        this.load.image('player', assetPath + 'playerShip1_blue.png');

        // Enemies
        this.load.image('enemy1', assetPath + 'Enemies/enemyBlack1.png');
        this.load.image('enemy2', assetPath + 'Enemies/enemyBlack2.png');
        this.load.image('enemy3', assetPath + 'Enemies/enemyBlack3.png');
        this.load.image('enemyRed1', assetPath + 'Enemies/enemyRed1.png');

        // Boss UFOs
        this.load.image('ufoBlue', assetPath + 'ufoBlue.png');
        this.load.image('ufoGreen', assetPath + 'ufoGreen.png');
        this.load.image('ufoRed', assetPath + 'ufoRed.png');

        // Projectiles
        this.load.image('playerLaser', assetPath + 'Lasers/laserBlue01.png');
        this.load.image('enemyLaser', assetPath + 'Lasers/laserRed01.png');

        // Meteors
        this.load.image('meteorBig1', assetPath + 'Meteors/meteorBrown_big1.png');
        this.load.image('meteorBig2', assetPath + 'Meteors/meteorBrown_big2.png');
        this.load.image('meteorMed1', assetPath + 'Meteors/meteorBrown_med1.png');
        this.load.image('meteorSmall1', assetPath + 'Meteors/meteorBrown_small1.png');
        this.load.image('meteorGrey1', assetPath + 'Meteors/meteorGrey_big1.png');
        this.load.image('meteorGrey2', assetPath + 'Meteors/meteorGrey_med1.png');

        // Power-ups
        this.load.image('powerupShield', assetPath + 'Power-ups/powerupBlue_shield.png');
        this.load.image('powerupRapidFire', assetPath + 'Power-ups/powerupRed_bolt.png');
        this.load.image('powerupSpreadShot', assetPath + 'Power-ups/powerupGreen_star.png');

        // Effects - Load explosion frames
        for (let i = 0; i <= 14; i++) {
            const frameNum = i.toString().padStart(2, '0');
            this.load.image(`explosion${i}`, assetPath + `Effects/fire${frameNum}.png`);
        }

        // UI
        this.load.image('lifeIcon', assetPath + 'UI/playerLife1_blue.png');
    }

    create() {
        // Create scrolling starfield background
        this.createStarfield();

        // Create explosion animation
        this.anims.create({
            key: 'explode',
            frames: [
                { key: 'explosion0' }, { key: 'explosion1' }, { key: 'explosion2' },
                { key: 'explosion3' }, { key: 'explosion4' }, { key: 'explosion5' },
                { key: 'explosion6' }, { key: 'explosion7' }, { key: 'explosion8' },
                { key: 'explosion9' }, { key: 'explosion10' }, { key: 'explosion11' },
                { key: 'explosion12' }, { key: 'explosion13' }, { key: 'explosion14' }
            ],
            frameRate: 20,
            repeat: 0
        });

        // Create player
        this.player = this.physics.add.sprite(400, 550, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.5);
        this.player.setDepth(15); // Above enemies and meteors

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        // Pause key
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.escKey.on('down', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });

        // Touch controls - track if touch is active
        this.touchActive = false;
        this.input.on('pointerdown', () => {
            this.touchActive = true;
        });
        this.input.on('pointerup', () => {
            this.touchActive = false;
        });

        // Create groups
        this.playerLasers = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.enemyLasers = this.physics.add.group();
        this.meteors = this.physics.add.group();
        this.powerUps = this.physics.add.group();

        // Collisions
        this.physics.add.overlap(this.playerLasers, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.playerLasers, this.meteors, this.hitMeteor, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hitPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemyLasers, this.hitPlayer, null, this);
        this.physics.add.overlap(this.player, this.meteors, this.hitPlayerWithMeteor, null, this);
        this.physics.add.overlap(this.player, this.powerUps, this.collectPowerUp, null, this);

        // Initialize managers
        this.waveManager = new WaveManager(this);
        this.hud = new HUD(this);

        // Auto-fire setup
        this.lastFired = 0;
        this.fireRate = 200;

        // Start first wave
        this.time.delayedCall(1000, () => {
            this.waveManager.startNextWave();
        });

    }

    createStarfield() {
        // Create scrolling star particles
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            const star = this.add.circle(
                Phaser.Math.Between(0, 800),
                Phaser.Math.Between(0, 600),
                Phaser.Math.FloatBetween(0.5, 2),
                0xffffff,
                Phaser.Math.FloatBetween(0.3, 0.9)
            );
            star.scrollSpeed = Phaser.Math.FloatBetween(0.5, 2);
            this.stars.push(star);
        }
    }

    update(time, delta) {
        if (this.gameOver) return;

        // Debug: Log enemy count every 2 seconds
        if (!this.lastDebugTime || time - this.lastDebugTime > 2000) {
            const bossInfo = this.currentBoss ?
                `active: ${this.currentBoss.active}, visible: ${this.currentBoss.visible}, pos: (${Math.round(this.currentBoss.x)}, ${Math.round(this.currentBoss.y)}), health: ${this.currentBoss.health}` :
                'none';
            console.log('Enemies:', this.enemies.children.size, 'Wave:', this.waveManager.getCurrentWave(), 'Boss:', bossInfo);
            this.lastDebugTime = time;
        }

        // Update boss if active
        if (this.currentBoss && this.currentBoss.active) {
            this.currentBoss.update(time, delta);
        }

        // Update starfield
        this.updateStarfield();

        // Player movement
        this.handlePlayerMovement();

        // Player shooting (auto-fire with power-ups)
        const currentFireRate = this.activePowerUps.rapidFire ? this.fireRate / 2 : this.fireRate;
        if (time > this.lastFired) {
            this.shootPlayerLaser();
            this.lastFired = time + currentFireRate;
        }

        // Spawn meteors (but not during boss fights)
        if (!this.currentBoss || !this.currentBoss.active) {
            this.meteorSpawnTimer += delta;
            const meteorInterval = Math.max(1000, 1800 - (this.waveManager.getCurrentWave() * 80));
            if (this.meteorSpawnTimer > meteorInterval) {
                this.spawnMeteor();
                this.meteorSpawnTimer = 0;
            }
        }

        // Enemy shooting
        this.enemyShootTimer += delta;
        const shootInterval = Math.max(1000, 1500 - (this.waveManager.getCurrentWave() * 50));
        if (this.enemyShootTimer > shootInterval) {
            this.enemiesShoot();
            this.enemyShootTimer = 0;
        }

        // Clean up off-screen objects
        this.cleanupOffScreen();
    }

    updateStarfield() {
        this.stars.forEach(star => {
            star.y += star.scrollSpeed;
            if (star.y > 600) {
                star.y = 0;
                star.x = Phaser.Math.Between(0, 800);
            }
        });
    }

    handlePlayerMovement() {
        const speed = 300;

        // Reset velocity
        this.player.setVelocity(0);

        // Touch/pointer movement - move toward finger position
        const pointer = this.input.activePointer;
        if (this.touchActive && pointer.isDown) {
            const dx = pointer.worldX - this.player.x;
            const dy = pointer.worldY - this.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only move if finger is far enough from ship (dead zone of 10px)
            if (distance > 10) {
                // Normalize and apply speed
                this.player.setVelocityX((dx / distance) * speed);
                this.player.setVelocityY((dy / distance) * speed);
            }
            return; // Touch overrides keyboard
        }

        // Keyboard: Horizontal movement
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.setVelocityX(speed);
        }

        // Keyboard: Vertical movement
        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.player.setVelocityY(speed);
        }
    }

    shootPlayerLaser() {
        if (this.activePowerUps.spreadShot) {
            // Spread shot - 3 lasers
            const angles = [-15, 0, 15];
            angles.forEach(angle => {
                const laser = this.playerLasers.create(this.player.x, this.player.y - 20, 'playerLaser');
                laser.setScale(0.5);
                laser.setDepth(12);
                this.physics.velocityFromAngle(angle - 90, 400, laser.body.velocity);
            });
        } else {
            // Normal shot
            const laser = this.playerLasers.create(this.player.x, this.player.y - 20, 'playerLaser');
            laser.setVelocityY(-400);
            laser.setScale(0.5);
            laser.setDepth(12);
        }
    }

    spawnMeteor() {
        const meteorTypes = ['meteorBig1', 'meteorBig2', 'meteorMed1', 'meteorSmall1', 'meteorGrey1', 'meteorGrey2'];
        const randomType = Phaser.Math.RND.pick(meteorTypes);
        const x = Phaser.Math.Between(50, 750);

        // Create meteor in group
        const meteor = this.meteors.create(x, -50, randomType);
        if (!meteor) return;

        // Configure meteor
        const scale = Phaser.Math.FloatBetween(0.3, 0.7);
        meteor.setScale(scale);
        meteor.setDepth(10); // Above starfield

        const speed = Phaser.Math.Between(80, 180);
        meteor.setVelocityY(speed);
        meteor.setVelocityX(Phaser.Math.Between(-30, 30));
        meteor.setAngularVelocity(Phaser.Math.Between(-100, 100));

        // Health based on size
        meteor.health = Math.ceil(scale * 3);
        meteor.maxHealth = meteor.health;
        meteor.points = Math.ceil(scale * 15);

        // Method to damage meteor
        meteor.takeDamage = function(amount = 1) {
            this.health -= amount;
            this.setTint(0xff0000);
            this.scene.time.delayedCall(100, () => {
                this.clearTint();
            });
            return this.health <= 0;
        };
    }

    enemiesShoot() {
        this.enemies.children.entries.forEach(enemy => {
            const shootChance = 30 + (this.waveManager.getCurrentWave() * 5);
            if (Phaser.Math.Between(0, 100) < shootChance) {
                const laser = this.enemyLasers.create(enemy.x, enemy.y + 20, 'enemyLaser');
                laser.setVelocityY(300);
                laser.setScale(0.5);
                laser.setDepth(12);
            }
        });
    }

    hitEnemy(laser, enemy) {
        console.log('Enemy destroyed by laser at pos:', Math.round(enemy.x), Math.round(enemy.y));
        laser.destroy();
        enemy.destroy();

        // Create explosion
        Explosion.createExplosion(this, enemy.x, enemy.y, 0.5);

        // Add score
        this.score += 10;
        this.hud.updateScore(this.score);

        // Update wave manager
        this.waveManager.enemyDestroyed();

        // Chance to drop power-up (25% chance)
        if (Phaser.Math.Between(0, 100) < 25) {
            this.dropPowerUp(enemy.x, enemy.y);
        }
    }

    hitMeteor(laser, meteor) {
        laser.destroy();

        // Damage meteor
        const destroyed = meteor.takeDamage(1);

        if (destroyed) {
            // Create explosion
            Explosion.createExplosion(this, meteor.x, meteor.y, meteor.scale);

            // Add score
            this.score += meteor.points;
            this.hud.updateScore(this.score);

            meteor.destroy();
        }
    }

    hitPlayer(player, threat) {
        console.log('Player hit by threat at pos:', Math.round(threat.x), Math.round(threat.y), 'texture:', threat.texture.key);

        // Don't destroy bosses on collision - they're too big to be destroyed by ramming
        const isBoss = threat === this.currentBoss;

        // Check if threat is a regular enemy (for wave tracking)
        const isEnemy = this.enemies.contains(threat);

        // Shield protects player
        if (this.activePowerUps.shield) {
            console.log('Shield protected player', isBoss ? '(boss collision)' : ', destroying threat');
            if (!isBoss) {
                threat.destroy();
                // Notify wave manager if it was a regular enemy
                if (isEnemy) {
                    this.waveManager.enemyDestroyed();
                }
            }
            return;
        }

        // Only destroy non-boss threats
        if (!isBoss) {
            threat.destroy();
            // Notify wave manager if it was a regular enemy
            if (isEnemy) {
                this.waveManager.enemyDestroyed();
            }
        }

        // Lose a life
        this.lives--;
        this.hud.updateLives(this.lives);

        // Flash player and camera
        this.cameras.main.flash(200, 255, 0, 0);
        this.cameras.main.shake(200, 0.01);

        // Player invincibility for a moment
        this.player.setAlpha(0.5);
        this.time.delayedCall(1000, () => {
            this.player.setAlpha(1);
        });

        // Check game over
        if (this.lives <= 0) {
            this.endGame();
        }
    }

    hitPlayerWithMeteor(player, meteor) {
        // Shield protects player
        if (this.activePowerUps.shield) {
            meteor.destroy();
            Explosion.createExplosion(this, meteor.x, meteor.y, meteor.scale);
            return;
        }

        meteor.destroy();
        Explosion.createExplosion(this, meteor.x, meteor.y, meteor.scale);

        // Lose a life
        this.lives--;
        this.hud.updateLives(this.lives);

        // Flash player and camera
        this.cameras.main.flash(200, 255, 0, 0);
        this.cameras.main.shake(300, 0.015);

        // Player invincibility
        this.player.setAlpha(0.5);
        this.time.delayedCall(1000, () => {
            this.player.setAlpha(1);
        });

        // Check game over
        if (this.lives <= 0) {
            this.endGame();
        }
    }

    dropPowerUp(x, y) {
        const type = PowerUp.getRandomType();

        // Map power-up types to textures
        const textureMap = {
            [PowerUpType.SHIELD]: 'powerupShield',
            [PowerUpType.RAPID_FIRE]: 'powerupRapidFire',
            [PowerUpType.SPREAD_SHOT]: 'powerupSpreadShot'
        };

        // Add random offset to prevent overlapping (30-50 pixels in random direction)
        const offsetDistance = Phaser.Math.Between(30, 50);
        const offsetAngle = Phaser.Math.Between(0, 360);
        const offsetX = Math.cos(offsetAngle * Math.PI / 180) * offsetDistance;
        const offsetY = Math.sin(offsetAngle * Math.PI / 180) * offsetDistance;

        // Create power-up directly in group (like meteors)
        const powerUp = this.powerUps.create(x + offsetX, y + offsetY, textureMap[type]);
        if (!powerUp) return;

        // Configure power-up
        powerUp.powerUpType = type;
        powerUp.setScale(0.5);
        powerUp.setVelocityY(100);
        // Add random horizontal drift to spread them out
        powerUp.setVelocityX(Phaser.Math.Between(-30, 30));
        powerUp.setDepth(10); // Above starfield
        powerUp.setAngularVelocity(50);

        // Pulsing animation
        this.tweens.add({
            targets: powerUp,
            scaleX: 0.6,
            scaleY: 0.6,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    collectPowerUp(player, powerUp) {
        const type = powerUp.powerUpType;
        powerUp.destroy();

        // Activate power-up
        this.activatePowerUp(type);

        // Add score bonus
        this.score += 25;
        this.hud.updateScore(this.score);
    }

    activatePowerUp(type) {
        const durations = {
            [PowerUpType.SHIELD]: 5000,
            [PowerUpType.RAPID_FIRE]: 8000,
            [PowerUpType.SPREAD_SHOT]: 10000
        };

        const duration = durations[type];
        this.activePowerUps[type] = true;

        // Visual feedback
        if (type === PowerUpType.SHIELD) {
            this.player.setTint(0x00ffff);
        }

        // Show in HUD
        this.hud.showPowerUp(type, duration);

        // Deactivate after duration
        this.time.delayedCall(duration, () => {
            this.deactivatePowerUp(type);
        });
    }

    deactivatePowerUp(type) {
        this.activePowerUps[type] = false;

        // Remove visual effects
        if (type === PowerUpType.SHIELD) {
            this.player.clearTint();
        }
    }

    cleanupOffScreen() {
        // Clean up player lasers
        this.playerLasers.children.entries.forEach(laser => {
            if (laser.y < -50) {
                laser.destroy();
            }
        });

        // Clean up enemy lasers
        this.enemyLasers.children.entries.forEach(laser => {
            if (laser.y > 650) {
                laser.destroy();
            }
        });

        // Clean up enemies
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.y > 650) {
                console.log('Enemy cleaned up (went off-screen bottom) at y:', Math.round(enemy.y));
                enemy.destroy();
                this.waveManager.enemyDestroyed();
            }
        });

        // Clean up meteors
        this.meteors.children.entries.forEach(meteor => {
            if (meteor.y > 650) {
                meteor.destroy();
            }
        });

        // Clean up power-ups
        this.powerUps.children.entries.forEach(powerUp => {
            if (powerUp.y > 650) {
                powerUp.destroy();
            }
        });
    }

    spawnBoss() {
        // Determine boss type based on wave
        const bossWave = Math.floor(this.waveManager.getCurrentWave() / 3);
        let bossTexture = 'ufoBlue';
        if (bossWave === 2) bossTexture = 'ufoGreen';
        if (bossWave >= 3) bossTexture = 'ufoRed';

        // Create boss
        this.currentBoss = new Boss(this, 400, -100, bossTexture);

        // Ensure boss is visible
        this.currentBoss.setActive(true);
        this.currentBoss.setVisible(true);

        console.log('Boss spawned:', bossTexture, 'for wave', this.waveManager.getCurrentWave());

        // Collision detection
        this.physics.add.overlap(this.playerLasers, this.currentBoss, this.hitBoss, null, this);
        this.physics.add.overlap(this.player, this.currentBoss, this.hitPlayer, null, this);

        // Use physics movement for entry instead of tween
        this.currentBoss.setVelocityY(100); // Move down slowly

        // Check when boss reaches position and stop entry
        this.currentBoss.entryTimer = this.time.addEvent({
            delay: 100,
            callback: () => {
                if (this.currentBoss && this.currentBoss.y >= 100) {
                    this.currentBoss.setVelocityY(0);
                    this.currentBoss.setY(100);
                    this.currentBoss.setX(400); // Reset to center
                    this.currentBoss.setVelocityX(150); // Start horizontal movement
                    this.currentBoss.setCollideWorldBounds(true); // Enable world bounds now
                    this.currentBoss.isEntering = false;
                    this.currentBoss.entryTimer.remove();
                    console.log('Boss entry complete, activating combat mode');
                }
            },
            loop: true
        });
    }

    hitBoss(obj1, obj2) {
        // CRITICAL: Phaser collision callbacks pass unreliable parameters!
        // We need to identify which object is the laser by checking texture keys

        if (!this.currentBoss || !this.currentBoss.active) {
            return;
        }

        // Don't damage boss during entry animation
        if (this.currentBoss.isEntering) {
            return;
        }

        // Identify which parameter is the laser by checking texture key
        let laser = null;
        if (obj1.texture && obj1.texture.key === 'playerLaser') {
            laser = obj1;
        } else if (obj2.texture && obj2.texture.key === 'playerLaser') {
            laser = obj2;
        }

        if (!laser) {
            console.log('No valid playerLaser found in collision, skipping');
            return;
        }

        // Mark laser for destruction - don't modify it during collision callback
        if (!laser.markedForDestruction) {
            laser.markedForDestruction = true;

            const destroyed = this.currentBoss.takeDamage(1);
            console.log('Boss hit! Health:', this.currentBoss.health, '/', this.currentBoss.maxHealth);

            // Destroy laser on next frame to avoid collision callback issues
            // Double-check it's not the boss before destroying
            this.time.delayedCall(1, () => {
                if (laser && laser.active && laser !== this.currentBoss) {
                    laser.destroy();
                }
            });

                if (destroyed) {
                    console.log('Boss defeated! Moving to next wave...');

                    // Boss defeated
                    Explosion.createExplosion(this, this.currentBoss.x, this.currentBoss.y, 1.5);

                    // Award points
                    this.score += this.currentBoss.points;
                    this.hud.updateScore(this.score);

                    // Drop guaranteed power-up
                    this.dropPowerUp(this.currentBoss.x, this.currentBoss.y);

                    // Clean up entry timer if it exists
                    if (this.currentBoss.entryTimer) {
                        this.currentBoss.entryTimer.remove();
                    }

                    // Clean up boss
                    this.currentBoss.destroy();
                    this.currentBoss = null;

                    // Screen effects
                    this.cameras.main.flash(500, 255, 255, 0);
                    this.cameras.main.shake(500, 0.02);

                    // Show victory message
                    const victoryText = this.add.text(400, 300, 'BOSS DEFEATED!', {
                        fontSize: '48px',
                        fill: '#ffff00',
                        fontFamily: 'Arial',
                        fontStyle: 'bold'
                    }).setOrigin(0.5);
                    victoryText.setDepth(103);

                    // Fade out and start next wave
                    this.tweens.add({
                        targets: victoryText,
                        alpha: 0,
                        duration: 1000,
                        delay: 1500,
                        onComplete: () => {
                            victoryText.destroy();
                            // Continue to next wave
                            console.log('Starting wave after boss defeat');
                            this.waveManager.startNextWave();
                        }
                    });
                }
        }
    }

    endGame() {
        this.gameOver = true;
        this.physics.pause();

        // Clean up boss if exists
        if (this.currentBoss) {
            this.currentBoss.destroy();
        }

        // Pass score to game over scene
        this.scene.start('GameOverScene', { score: this.score });
    }
}
