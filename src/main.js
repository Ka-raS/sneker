import { Game } from './Game.js';
import { AppleEatTest } from './Tests.js';

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
    scene: [Game]
};

const game = new Phaser.Game(CONFIG);

/**
 * @see Game#init
 * calls Game.init( data = {...} )
 */
game.scene.start('Game', {tests: [new AppleEatTest()]});