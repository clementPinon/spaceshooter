import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import PauseScene from './scenes/PauseScene.js';
import GameOverScene from './scenes/GameOverScene.js';

export const config = {
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene, PauseScene, GameOverScene]
};
