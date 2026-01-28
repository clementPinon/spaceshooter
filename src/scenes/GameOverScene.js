import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Game Over text
        this.add.text(width / 2, height / 2 - 100, 'GAME OVER', {
            fontSize: '48px',
            fill: '#ff0000',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Score text
        this.add.text(width / 2, height / 2, `Final Score: ${this.finalScore}`, {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Restart instruction
        const restartText = this.add.text(width / 2, height / 2 + 100, 'Tap or Press ENTER to restart', {
            fontSize: '20px',
            fill: '#00ff00',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Add blinking effect to restart text
        this.tweens.add({
            targets: restartText,
            alpha: 0.3,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Keyboard input
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.enterKey.on('down', this.restartGame, this);

        // Touch/tap input to restart
        this.input.on('pointerdown', this.restartGame, this);
    }

    restartGame() {
        this.scene.start('GameScene');
    }
}
