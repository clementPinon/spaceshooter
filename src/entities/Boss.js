import Phaser from 'phaser';

export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Explicitly store scene reference before anything else
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.8);
        this.setDepth(10);
        // Don't set world bounds yet - will be enabled after entry

        // Boss stats - scale health based on which boss this is (wave / 3)
        // Boss 1 (wave 3): 10 health, Boss 2 (wave 6): 20 health, etc.
        const bossNumber = Math.floor(scene.waveManager.getCurrentWave() / 3);
        this.maxHealth = bossNumber * 10;
        this.health = this.maxHealth;
        this.phase = 1;
        this.points = 500 + (bossNumber * 200);

        console.log('Boss initialized with health:', this.health, '/', this.maxHealth);

        // Movement
        this.moveDirection = 1;
        // Don't set initial velocity - will be set when entry completes

        // Random movement patterns for less predictability
        this.movementPhaseOffset = Math.random() * Math.PI * 2; // Random starting phase for sine waves
        this.movementSpeedVariation = Phaser.Math.FloatBetween(0.8, 1.2); // Random speed multiplier

        // Shooting
        this.shootTimer = 0;
        this.shootInterval = 1000;

        // Entry state - disable update until entry animation completes
        this.isEntering = true;

        // Damage cooldown to prevent multi-hit bugs
        this.lastDamageTime = 0;
        this.damageCooldown = 100; // 100ms between hits

        // Create health bar
        this.createHealthBar();

        // Support enemies
        this.supportTimer = 0;
        this.supportInterval = 5000;
    }

    createHealthBar() {
        // Health bar background
        this.healthBarBg = this.scene.add.rectangle(400, 30, 400, 20, 0x333333);
        this.healthBarBg.setDepth(100);
        this.healthBarBg.setScrollFactor(0);

        // Health bar fill
        this.healthBar = this.scene.add.rectangle(400, 30, 400, 20, 0xff0000);
        this.healthBar.setDepth(101);
        this.healthBar.setScrollFactor(0);

        // Boss name
        this.bossNameText = this.scene.add.text(400, 10, 'BOSS', {
            fontSize: '16px',
            fill: '#ff0000',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.bossNameText.setDepth(102);
        this.bossNameText.setScrollFactor(0);
    }

    updateHealthBar() {
        const healthPercent = this.health / this.maxHealth;
        this.healthBar.setScale(healthPercent, 1);

        // Change color based on health
        if (healthPercent > 0.66) {
            this.healthBar.setFillStyle(0xff0000); // Red
        } else if (healthPercent > 0.33) {
            this.healthBar.setFillStyle(0xff6600); // Orange
        } else {
            this.healthBar.setFillStyle(0xffff00); // Yellow
        }
    }

    destroyHealthBar() {
        if (this.healthBarBg) this.healthBarBg.destroy();
        if (this.healthBar) this.healthBar.destroy();
        if (this.bossNameText) this.bossNameText.destroy();
    }

    takeDamage(amount = 1) {
        // Don't take damage during entry
        if (this.isEntering) {
            return false;
        }

        // Damage cooldown to prevent multi-hit bugs
        const now = Date.now();
        if (now - this.lastDamageTime < this.damageCooldown) {
            console.log('Damage on cooldown, ignoring');
            return false;
        }
        this.lastDamageTime = now;

        this.health -= amount;
        console.log('Boss took damage! Health:', this.health, '/', this.maxHealth);
        this.updateHealthBar();

        // Flash effect
        this.setTint(0xffffff);
        if (this.scene && this.scene.time) {
            this.scene.time.delayedCall(100, () => {
                if (this.active) {
                    this.clearTint();
                }
            });
        }

        // Check phase transitions
        const healthPercent = this.health / this.maxHealth;
        if (healthPercent <= 0.66 && this.phase === 1) {
            this.phase = 2;
            this.onPhaseChange();
        } else if (healthPercent <= 0.33 && this.phase === 2) {
            this.phase = 3;
            this.onPhaseChange();
        }

        const isDestroyed = this.health <= 0;
        console.log('Boss destroyed:', isDestroyed);
        return isDestroyed;
    }

    onPhaseChange() {
        if (!this.scene) return;

        // Visual feedback
        if (this.scene.cameras && this.scene.cameras.main) {
            this.scene.cameras.main.flash(200, 255, 100, 0);
            this.scene.cameras.main.shake(300, 0.01);
        }

        // Speed up movement with some randomness
        const baseSpeed = 150 + (this.phase * 50);
        const speed = baseSpeed * Phaser.Math.FloatBetween(0.9, 1.1);
        this.setVelocityX(this.moveDirection * speed);

        // Update movement variation for next phase
        this.movementSpeedVariation = Phaser.Math.FloatBetween(0.8, 1.2);

        // Faster shooting
        this.shootInterval = Math.max(500, 1000 - (this.phase * 200));

        // Show phase text
        const phaseText = this.scene.add.text(400, 300, `PHASE ${this.phase}!`, {
            fontSize: '48px',
            fill: '#ff0000',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        phaseText.setDepth(103);

        if (this.scene.tweens) {
            this.scene.tweens.add({
                targets: phaseText,
                alpha: 0,
                scale: 2,
                duration: 1000,
                onComplete: () => {
                    phaseText.destroy();
                }
            });
        }
    }

    update(time, delta) {
        if (!this.active) return;

        // Skip movement logic during entry animation
        if (this.isEntering) {
            // Still alive, just entering
            return;
        }

        // Horizontal movement pattern
        if (this.x > 750) {
            this.moveDirection = -1;
            this.setVelocityX(-Math.abs(this.body.velocity.x));
        } else if (this.x < 50) {
            this.moveDirection = 1;
            this.setVelocityX(Math.abs(this.body.velocity.x));
        }

        // Phase-specific movement (use vertical velocity instead of direct position)
        if (this.phase === 2) {
            // Add vertical sine wave movement with randomness
            const baseFrequency = 500 * this.movementSpeedVariation;
            const targetY = 100 + Math.sin((time / baseFrequency) + this.movementPhaseOffset) * 30;
            // Occasionally add a sudden movement spike
            if (Math.random() < 0.01) {
                this.setVelocityY(Phaser.Math.Between(-100, 100));
            } else {
                this.setVelocityY((targetY - this.y) * 2);
            }
        } else if (this.phase === 3) {
            // Add more erratic movement with double sine waves for unpredictability
            const freq1 = 300 * this.movementSpeedVariation;
            const freq2 = 450 * this.movementSpeedVariation;
            const wave1 = Math.sin((time / freq1) + this.movementPhaseOffset) * 30;
            const wave2 = Math.sin((time / freq2) + this.movementPhaseOffset * 1.5) * 25;
            const targetY = 100 + wave1 + wave2;
            // More frequent sudden movements in phase 3
            if (Math.random() < 0.015) {
                this.setVelocityY(Phaser.Math.Between(-150, 150));
            } else {
                this.setVelocityY((targetY - this.y) * 3);
            }
        } else {
            // Phase 1 - stay at y: 100 with slight wobble
            const wobble = Math.sin((time / 800) + this.movementPhaseOffset) * 5;
            const targetY = 100 + wobble;
            if (Math.abs(this.y - targetY) > 5) {
                this.setVelocityY((targetY - this.y) * 2);
            } else {
                this.setVelocityY((targetY - this.y) * 0.5);
            }
        }

        // Shooting
        this.shootTimer += delta;
        if (this.shootTimer > this.shootInterval) {
            this.shoot();
            this.shootTimer = 0;
        }

        // Spawn support enemies in phase 3
        if (this.phase === 3) {
            this.supportTimer += delta;
            if (this.supportTimer > this.supportInterval) {
                this.spawnSupport();
                this.supportTimer = 0;
            }
        }
    }

    shoot() {
        if (!this.scene || !this.scene.enemyLasers) return;

        if (this.phase === 1) {
            // Single shot at player
            const laser = this.scene.enemyLasers.create(this.x, this.y + 30, 'enemyLaser');
            laser.setVelocityY(300);
            laser.setScale(0.5);
            laser.setDepth(10);
        } else if (this.phase === 2) {
            // Triple shot spread
            for (let i = -1; i <= 1; i++) {
                const laser = this.scene.enemyLasers.create(this.x + (i * 30), this.y + 30, 'enemyLaser');
                const angle = 90 + (i * 15);
                this.scene.physics.velocityFromAngle(angle, 300, laser.body.velocity);
                laser.setScale(0.5);
                laser.setDepth(10);
            }
        } else if (this.phase === 3) {
            // Five-way spread
            for (let i = -2; i <= 2; i++) {
                const laser = this.scene.enemyLasers.create(this.x + (i * 25), this.y + 30, 'enemyLaser');
                const angle = 90 + (i * 20);
                this.scene.physics.velocityFromAngle(angle, 350, laser.body.velocity);
                laser.setScale(0.5);
                laser.setDepth(10);
            }
        }
    }

    spawnSupport() {
        if (!this.scene || !this.scene.enemies) return;

        // Spawn 2 red support enemies
        for (let i = 0; i < 2; i++) {
            const enemy = this.scene.enemies.create(
                this.x + ((i === 0 ? -1 : 1) * 60),
                this.y + 40,
                'enemyRed1'
            );
            enemy.setVelocityY(100);
            enemy.setScale(0.5);
            enemy.setDepth(10);
        }
    }

    destroy() {
        console.log('Boss defeated!');
        this.destroyHealthBar();
        super.destroy();
    }
}
