import { Game } from "./Game.js";

export class Snake {

    static COLOR = 0x00ff00;

    constructor(scene) {
        this.scene = scene;
        this.direction = this.nextDirection = Phaser.Math.Vector2.RIGHT;
        this.body = [];
        this.reset();
    }

    getHead() {
        return this.body[this.body.length - 1];
    }

    getBody() {
        return this.body;
    }

    setNextDirection(nextDirection) {
        this.nextDirection = nextDirection;
    }

    shrink() {
        this.body[0].destroy();
        this.body.shift();
    }

    reset() {
        for (const segment of this.body) {
            segment.destroy();
        }
        this.body = [
            new Phaser.GameObjects.Rectangle(this.scene, 5, 5, 1, 1, Snake.COLOR),
            new Phaser.GameObjects.Rectangle(this.scene, 4, 5, 1, 1, Snake.COLOR)
        ];
        for (const segment of this.body) {
            segment.setOrigin(0, 0);
            this.scene.add.existing(segment);
        }
    }

    grow() {
        if (this.direction.x !== -this.nextDirection.x || this.direction.y !== -this.nextDirection.y) {
            this.direction = this.nextDirection;
        }

        const newHead = new Phaser.GameObjects.Rectangle(
            this.scene,
            Phaser.Math.Wrap(this.getHead().x + this.direction.x, 0, Game.GRID_SIZE),
            Phaser.Math.Wrap(this.getHead().y + this.direction.y, 0, Game.GRID_SIZE),
            1, 1,
            0x00ff00
        );

        newHead.setOrigin(0, 0);
        this.scene.add.existing(newHead);
        this.body.push(newHead);
    }

}