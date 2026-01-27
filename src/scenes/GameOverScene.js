import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        // Game Over text
        this.add.text(400, 200, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Score text
        this.add.text(400, 300, `Final Score: ${this.finalScore}`, {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Restart instruction
        this.add.text(400, 400, 'Press ENTER to restart', {
            fontSize: '24px',
            fill: '#00ff00',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Add blinking effect to restart text
        this.time.addEvent({
            delay: 500,
            callback: () => {
                const restartText = this.children.list[2];
                restartText.visible = !restartText.visible;
            },
            loop: true
        });

        // Input
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.enterKey.on('down', this.restartGame, this);
    }

    restartGame() {
        this.scene.start('GameScene');
    }
}
