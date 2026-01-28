import Phaser from 'phaser';

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Semi-transparent overlay
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);

        // Paused text
        this.add.text(width / 2, height / 2 - 50, 'PAUSED', {
            fontSize: '48px',
            fill: '#ffff00',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Resume instruction
        const resumeText = this.add.text(width / 2, height / 2 + 30, 'Tap or Press ESC to Resume', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Blinking animation
        this.tweens.add({
            targets: resumeText,
            alpha: 0.3,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Keyboard input
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.escKey.on('down', this.resumeGame, this);

        // Touch/tap input to resume
        this.input.on('pointerdown', this.resumeGame, this);
    }

    resumeGame() {
        this.scene.resume('GameScene');
        this.scene.stop();
    }
}
