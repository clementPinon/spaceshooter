import Phaser from 'phaser';
import { config } from './config.js';

// Create the game instance
const game = new Phaser.Game(config);

// Make game instance globally accessible for debugging
window.game = game;
