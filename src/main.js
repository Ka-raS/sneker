import { Game } from './Game.js';

export const CONFIG = Object.freeze({
    type: Phaser.AUTO,
    pixelArt: true,
    width: 30,
    height: 30,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Game]
});

new Phaser.Game(CONFIG);
