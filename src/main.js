import { MyGame } from './MyGame.js';
import { AppleResetTest } from './Tests.js';

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
    scene: [MyGame]
});

const game = new Phaser.Game(CONFIG);

/**
 * @see MyGame#init
 * gọi phương thức MyGame.init()
 */
game.scene.start('MyGame', {tests: [AppleResetTest]});