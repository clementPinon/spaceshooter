import Phaser from 'phaser';

export const PowerUpType = {
    SHIELD: 'shield',
    RAPID_FIRE: 'rapidFire',
    SPREAD_SHOT: 'spreadShot'
};

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        const textureMap = {
            [PowerUpType.SHIELD]: 'powerupShield',
            [PowerUpType.RAPID_FIRE]: 'powerupRapidFire',
            [PowerUpType.SPREAD_SHOT]: 'powerupSpreadShot'
        };

        super(scene, x, y, textureMap[type]);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.powerUpType = type;
        this.setScale(0.5);
        this.setVelocityY(100);

        // Pulsing animation (doesn't conflict with physics)
        scene.tweens.add({
            targets: this,
            scaleX: 0.6,
            scaleY: 0.6,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Slight rotation
        this.setAngularVelocity(50);
    }

    static getRandomType() {
        const types = Object.values(PowerUpType);
        return Phaser.Math.RND.pick(types);
    }
}
