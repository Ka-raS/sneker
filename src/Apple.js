import { CONFIG } from './main.js';

export class Apple extends Phaser.GameObjects.Rectangle {

    constructor(scene, snakeBody) {
        super(scene, 0, 0, 1, 1, 0xff0000);
        this.snakeBody = snakeBody;
        this.setOrigin(0, 0);
        this.reset();
        scene.add.existing(this);
    }

    reset() {
        let x = this.x, y = this.y;
        do {
            x = Phaser.Math.Between(0, CONFIG.width - 1);
            y = Phaser.Math.Between(0, CONFIG.height - 1);
        } while (this.snakeBody.some(segment => segment.x === x && segment.y === y));
        this.setPosition(x, y);
    }

}