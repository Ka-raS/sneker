import { Game } from './Game.js';

export class Apple extends Phaser.GameObjects.Rectangle {

    static COLOR = 0xff0000;

    constructor(scene, snakeBody) {
        super(scene, 0, 0, 1, 1, Apple.COLOR);
        this.snakeBody = snakeBody;
        this.setOrigin(0, 0);
        this.reset();
        scene.add.existing(this);

        // New
        document.getElementById('btn-update-code').addEventListener('click', () => {
            const code = document.getElementById('apple-reset-code').value.trim();
            this.reset = new Function(code);
        });
    }

    reset() {} // New

}