import { CONFIG } from "./main.js";

export class Snake {

    constructor(scene) {
        this.body = [];
        this.direction = Phaser.Utils.Array.GetRandom([
            Phaser.Math.Vector2.UP,   Phaser.Math.Vector2.RIGHT,
            Phaser.Math.Vector2.DOWN, Phaser.Math.Vector2.LEFT
        ]);
        this.graphics = scene.add.graphics({fillStyle: { color: 0x00ff00 }});
        this.reset();
    }

    reset() {
        const head = new Phaser.Math.Vector2(
            Phaser.Math.Between(1, CONFIG.width - 2),
            Phaser.Math.Between(1, CONFIG.height - 2)
        );

        this.body = [head, head.add(this.direction)];
        this.redraw();
    }

    getHead() {
        return this.body[this.body.length - 1];
    }

    getBody() {
        return this.body;
    }

    setDirection(nextDirection) {
        if (this.direction !== -nextDirection) {
            this.direction = nextDirection;
        }
    }

    shrink() {
        this.body.shift();
        this.redraw();
    }

    grow() {
        const head = this.getHead();
        const newHead = new Phaser.Math.Vector2(
            Phaser.Math.Wrap(head.x + this.direction.x, 0, CONFIG.width),
            Phaser.Math.Wrap(head.y + this.direction.y, 0, CONFIG.height),
        );

        this.body.push(newHead);
        this.redraw();
    }

    redraw() {
        this.graphics.clear();
        for (const segment of this.body) {
            this.graphics.fillRect(segment.x, segment.y, 1, 1);
        }
    }

}