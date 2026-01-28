import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Assets already loaded by GameScene
    }

    create() {
        // Create starfield background
        this.createStarfield();

        // Title
        this.add.text(400, 150, 'SPACE SHOOTER', {
            fontSize: '64px',
            fill: '#00ff00',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(400, 220, 'Retro 2D Edition', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(400, 320, 'CONTROLS', {
            fontSize: '28px',
            fill: '#ffff00',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 360, 'Arrow Keys / WASD - Move', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 390, 'Auto-Fire Enabled', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 420, 'ESC - Pause Game', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Start button
        const startText = this.add.text(400, 500, 'Tap or Press ENTER to Start', {
            fontSize: '28px',
            fill: '#00ff00',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Blinking animation
        this.tweens.add({
            targets: startText,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Keyboard input
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.enterKey.on('down', this.startGame, this);

        // Touch/click input
        this.input.on('pointerdown', this.startGame, this);
    }

    createStarfield() {
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

    update() {
        // Animate starfield
        this.stars.forEach(star => {
            star.y += star.scrollSpeed;
            if (star.y > 600) {
                star.y = 0;
                star.x = Phaser.Math.Between(0, 800);
            }
        });
    }

    startGame() {
        this.scene.start('GameScene');
    }
}
