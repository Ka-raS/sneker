import { Game } from './Game.js';

const CONFIG = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: Game.GRID_SIZE,
    height: Game.GRID_SIZE,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Game
    ]
};

new Phaser.Game(CONFIG);
