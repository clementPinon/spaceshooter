import Phaser from 'phaser';

export default class Explosion {
    static createExplosion(scene, x, y, scale = 1) {
        // Play explosion animation
        const explosion = scene.add.sprite(x, y, 'explosion');
        explosion.setScale(scale);
        explosion.play('explode');

        // Add screen shake for bigger explosions
        if (scale > 0.5) {
            scene.cameras.main.shake(100, 0.005);
        }

        // Destroy after animation
        explosion.on('animationcomplete', () => {
            explosion.destroy();
        });

        return explosion;
    }

    static createParticleExplosion(scene, x, y, color = 0xff6600) {
        // Create particle emitter
        const particles = scene.add.particles(x, y, 'playerLaser', {
            speed: { min: 50, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            lifespan: 600,
            tint: color,
            gravityY: 0,
            quantity: 10
        });

        // Auto-destroy after particles fade
        scene.time.delayedCall(700, () => {
            particles.destroy();
        });

        return particles;
    }
}
