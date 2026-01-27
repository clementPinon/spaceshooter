import Phaser from 'phaser';

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        // Semi-transparent overlay
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);

        // Paused text
        this.add.text(400, 250, 'PAUSED', {
            fontSize: '64px',
            fill: '#ffff00',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Resume instruction
        const resumeText = this.add.text(400, 350, 'Press ESC to Resume', {
            fontSize: '24px',
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

        // Input
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.escKey.on('down', this.resumeGame, this);
    }

    resumeGame() {
        this.scene.resume('GameScene');
        this.scene.stop();
    }
}
