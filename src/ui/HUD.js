import { PowerUpType } from '../entities/PowerUp.js';

export default class HUD {
    constructor(scene) {
        this.scene = scene;
        this.createHUD();
    }

    createHUD() {
        // Score text
        this.scoreText = this.scene.add.text(16, 16, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        });
        this.scoreText.setScrollFactor(0);
        this.scoreText.setDepth(100);

        // Wave counter
        this.waveText = this.scene.add.text(16, 50, 'Wave: 0', {
            fontSize: '20px',
            fill: '#00ff00',
            fontFamily: 'Arial'
        });
        this.waveText.setScrollFactor(0);
        this.waveText.setDepth(100);

        // Life icons
        this.lifeIcons = [];
        this.createLifeIcons();

        // Power-up display
        this.powerUpTexts = {};
        this.powerUpBars = {};

        // Pause button (for mobile)
        this.pauseButton = this.scene.add.text(750, 70, '| |', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        });
        this.pauseButton.setOrigin(0.5);
        this.pauseButton.setScrollFactor(0);
        this.pauseButton.setDepth(100);
        this.pauseButton.setInteractive({ useHandCursor: true });
        this.pauseButton.on('pointerdown', () => {
            this.scene.scene.pause();
            this.scene.scene.launch('PauseScene');
        });
    }

    createLifeIcons() {
        for (let i = 0; i < 3; i++) {
            const icon = this.scene.add.image(730 + (i * 30), 30, 'lifeIcon');
            icon.setScale(0.4);
            icon.setScrollFactor(0);
            icon.setDepth(100);
            this.lifeIcons.push(icon);
        }
    }

    updateScore(score) {
        this.scoreText.setText('Score: ' + score);
    }

    updateWave(wave) {
        this.waveText.setText('Wave: ' + wave);
    }

    updateLives(lives) {
        for (let i = 0; i < this.lifeIcons.length; i++) {
            this.lifeIcons[i].setVisible(i < lives);
        }
    }

    showPowerUp(type, duration) {
        const yPosition = 90 + (Object.keys(this.powerUpTexts).length * 30);

        // Power-up name
        const nameMap = {
            [PowerUpType.SHIELD]: 'Shield',
            [PowerUpType.RAPID_FIRE]: 'Rapid Fire',
            [PowerUpType.SPREAD_SHOT]: 'Spread Shot'
        };

        const colorMap = {
            [PowerUpType.SHIELD]: '#00ffff',
            [PowerUpType.RAPID_FIRE]: '#ff0000',
            [PowerUpType.SPREAD_SHOT]: '#00ff00'
        };

        const text = this.scene.add.text(16, yPosition, nameMap[type], {
            fontSize: '16px',
            fill: colorMap[type],
            fontFamily: 'Arial',
            fontStyle: 'bold'
        });
        text.setScrollFactor(0);
        text.setDepth(100);

        // Timer bar background
        const barBg = this.scene.add.rectangle(120, yPosition + 8, 100, 12, 0x333333);
        barBg.setOrigin(0, 0.5);
        barBg.setScrollFactor(0);
        barBg.setDepth(100);

        // Timer bar
        const bar = this.scene.add.rectangle(120, yPosition + 8, 100, 12, parseInt(colorMap[type].replace('#', '0x')));
        bar.setOrigin(0, 0.5);
        bar.setScrollFactor(0);
        bar.setDepth(101);

        this.powerUpTexts[type] = { text, barBg, bar, maxWidth: 100 };

        // Animate bar shrinking
        this.scene.tweens.add({
            targets: bar,
            scaleX: 0,
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
                this.hidePowerUp(type);
            }
        });
    }

    hidePowerUp(type) {
        if (this.powerUpTexts[type]) {
            this.powerUpTexts[type].text.destroy();
            this.powerUpTexts[type].barBg.destroy();
            this.powerUpTexts[type].bar.destroy();
            delete this.powerUpTexts[type];

            // Reposition remaining power-ups
            this.repositionPowerUps();
        }
    }

    repositionPowerUps() {
        let index = 0;
        for (const type in this.powerUpTexts) {
            const yPosition = 90 + (index * 30);
            this.powerUpTexts[type].text.setY(yPosition);
            this.powerUpTexts[type].barBg.setY(yPosition + 8);
            this.powerUpTexts[type].bar.setY(yPosition + 8);
            index++;
        }
    }
}
