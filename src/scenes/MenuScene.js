import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Assets already loaded by GameScene
    }

    create() {
        this.gameWidth = this.scale.width;
        this.gameHeight = this.scale.height;
        const centerX = this.gameWidth / 2;

        // Create starfield background
        this.createStarfield();

        // Title
        this.add.text(centerX, 120, 'SPACE SHOOTER', {
            fontSize: '40px',
            fill: '#00ff00',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(centerX, 170, 'Retro 2D Edition', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(centerX, 280, 'CONTROLS', {
            fontSize: '24px',
            fill: '#ffff00',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(centerX, 320, 'Drag to Move', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(centerX, 350, 'Auto-Fire Enabled', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(centerX, 380, 'Tap to Pause', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Start button
        const startText = this.add.text(centerX, this.gameHeight - 150, 'Tap to Start', {
            fontSize: '24px',
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
                Phaser.Math.Between(0, this.gameWidth),
                Phaser.Math.Between(0, this.gameHeight),
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
            if (star.y > this.gameHeight) {
                star.y = 0;
                star.x = Phaser.Math.Between(0, this.gameWidth);
            }
        });
    }

    startGame() {
        this.scene.start('GameScene');
    }
}
