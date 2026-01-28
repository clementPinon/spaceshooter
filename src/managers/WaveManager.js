export default class WaveManager {
    constructor(scene) {
        this.scene = scene;
        this.gameWidth = scene.scale.width;
        this.gameHeight = scene.scale.height;
        this.currentWave = 0;
        this.enemiesInWave = 0;
        this.enemiesRemaining = 0;
        this.waveInProgress = false;
        this.betweenWaves = false;
    }

    startNextWave() {
        this.currentWave++;
        this.betweenWaves = false;
        this.waveInProgress = true;

        console.log('Starting wave', this.currentWave, '- Boss wave:', this.currentWave % 3 === 0);

        // Update HUD
        if (this.scene.hud) {
            this.scene.hud.updateWave(this.currentWave);
        }

        // Check if this is a boss wave (every 3 waves)
        if (this.currentWave % 3 === 0) {
            this.startBossWave();
        } else {
            // Calculate enemies for this wave (5 base + 2 per wave)
            this.enemiesInWave = 5 + (this.currentWave * 2);
            this.enemiesRemaining = this.enemiesInWave;

            console.log('Regular wave:', this.currentWave, '- Spawning', this.enemiesInWave, 'enemies');

            // Show wave text
            this.showWaveText();

            // Spawn enemies over time
            this.spawnWaveEnemies();
        }
    }

    startBossWave() {
        // Boss wave - no regular enemies
        this.enemiesInWave = 0;
        this.enemiesRemaining = 0;

        // Show boss warning
        this.showBossWarning();

        // Spawn boss after warning
        this.scene.time.delayedCall(3000, () => {
            if (this.scene.spawnBoss) {
                this.scene.spawnBoss();
            }
        });
    }

    showBossWarning() {
        const warningText = this.scene.add.text(
            this.gameWidth / 2, this.gameHeight / 2,
            'WARNING!\nBOSS APPROACHING',
            {
                fontSize: '32px',
                fill: '#ff0000',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Pulsing animation
        this.scene.tweens.add({
            targets: warningText,
            scale: 1.2,
            duration: 300,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: warningText,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        warningText.destroy();
                    }
                });
            }
        });

        // Screen flash
        this.scene.cameras.main.flash(2000, 255, 0, 0);
    }

    showWaveText() {
        const waveText = this.scene.add.text(
            this.gameWidth / 2, this.gameHeight / 2,
            `Wave ${this.currentWave}`,
            {
                fontSize: '36px',
                fill: '#00ff00',
                fontFamily: 'Arial',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Fade out after 2 seconds
        this.scene.tweens.add({
            targets: waveText,
            alpha: 0,
            duration: 1000,
            delay: 1000,
            onComplete: () => {
                waveText.destroy();
            }
        });
    }

    spawnWaveEnemies() {
        const spawnInterval = Math.max(800, 2000 - (this.currentWave * 100));
        let enemiesSpawned = 0;

        console.log('Setting up spawn timer with interval:', spawnInterval, 'ms');

        const spawnTimer = this.scene.time.addEvent({
            delay: spawnInterval,
            callback: () => {
                if (enemiesSpawned < this.enemiesInWave) {
                    console.log('Spawn timer callback - spawning enemy', enemiesSpawned + 1, 'of', this.enemiesInWave);
                    this.spawnEnemy();
                    enemiesSpawned++;
                } else {
                    console.log('All enemies spawned, removing timer');
                    spawnTimer.remove();
                }
            },
            loop: true
        });
    }

    spawnEnemy() {
        const enemyTypes = ['enemy1', 'enemy2', 'enemy3'];
        const randomType = Phaser.Math.RND.pick(enemyTypes);
        const x = Phaser.Math.Between(50, this.gameWidth - 50);

        const enemy = this.scene.enemies.create(x, -50, randomType);

        if (!enemy) {
            console.error('Failed to create enemy!');
            return;
        }

        // Ensure visibility
        enemy.setActive(true);
        enemy.setVisible(true);

        // Increase speed based on wave
        const baseSpeed = 100 + (this.currentWave * 10);
        const velocity = Phaser.Math.Between(baseSpeed, baseSpeed + 50);
        enemy.setVelocityY(velocity);
        enemy.setScale(0.5);
        enemy.setDepth(10); // Make visible above starfield

        // Store wave difficulty for shooting frequency
        enemy.waveNumber = this.currentWave;

        console.log('Enemy spawned:', randomType, 'pos:', x, -50, 'velocity:', velocity, 'total enemies:', this.scene.enemies.children.size);
    }

    enemyDestroyed() {
        this.enemiesRemaining--;
        console.log('Enemy destroyed - remaining:', this.enemiesRemaining, 'waveInProgress:', this.waveInProgress);

        if (this.enemiesRemaining <= 0 && this.waveInProgress) {
            console.log('All enemies destroyed, ending wave...');
            this.endWave();
        }
    }

    endWave() {
        console.log('endWave() called - setting up next wave timer');
        this.waveInProgress = false;
        this.betweenWaves = true;

        // Show wave complete message
        const completeText = this.scene.add.text(
            this.gameWidth / 2, this.gameHeight / 2,
            'Wave Complete!',
            {
                fontSize: '28px',
                fill: '#ffff00',
                fontFamily: 'Arial',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        this.scene.tweens.add({
            targets: completeText,
            alpha: 0,
            duration: 800,
            delay: 1200,
            onComplete: () => {
                completeText.destroy();
            }
        });

        // Start next wave after delay
        this.scene.time.delayedCall(3000, () => {
            console.log('Next wave timer fired, starting wave...');
            this.startNextWave();
        });
    }

    getCurrentWave() {
        return this.currentWave;
    }

    getEnemiesRemaining() {
        return this.enemiesRemaining;
    }
}
