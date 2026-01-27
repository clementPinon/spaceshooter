import Phaser from 'phaser';

export default class Meteor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Make sure meteor is visible
        this.setDepth(1);
        this.setVisible(true);
        this.setActive(true);

        // Random scale and speed
        const scale = Phaser.Math.FloatBetween(0.3, 0.7);
        this.setScale(scale);

        const speed = Phaser.Math.Between(80, 180);
        this.setVelocityY(speed);

        // Slight horizontal drift
        this.setVelocityX(Phaser.Math.Between(-30, 30));

        // Random rotation
        this.setAngularVelocity(Phaser.Math.Between(-100, 100));

        // Health based on size
        this.health = Math.ceil(scale * 3);
        this.maxHealth = this.health;

        // Points value
        this.points = Math.ceil(scale * 15);
    }

    takeDamage(amount = 1) {
        this.health -= amount;

        // Visual feedback
        this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => {
            this.clearTint();
        });

        return this.health <= 0;
    }
}
