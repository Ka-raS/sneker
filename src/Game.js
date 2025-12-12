import { Snake } from './Snake.js';
import { Apple } from './Apple.js';

export class Game extends Phaser.Scene {
    
    static GRID_SIZE = 30;

    constructor() {
        super('Game');
    }

    create() {
        this.time = 0;
        this.snake = new Snake(this);
        this.apple = new Apple(this, this.snake.getBody());
        this.inputs = this.input.keyboard.createCursorKeys();
    }

    update(time) {
        this.handleInput();
        if (this.shouldUpdate(time)) {
            this.snake.grow();
            this.handleCollisions();
        }
    }


    handleInput() {
        const pairs = [
            [this.inputs.left,  Phaser.Math.Vector2.LEFT],
            [this.inputs.right, Phaser.Math.Vector2.RIGHT],
            [this.inputs.up,    Phaser.Math.Vector2.UP],
            [this.inputs.down,  Phaser.Math.Vector2.DOWN]
        ];
        for (const [key, direction] of pairs) {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                this.snake.setNextDirection(direction);
            }
        }
    }

    handleCollisions() {
        const head = this.snake.getHead();
        const body = this.snake.getBody();

        // avoid tails and head collisions
        for (let i = 1; i < body.length - 1; ++i) {
            if (body[i].x === head.x && body[i].y === head.y) {
                this.snake.reset();
                this.apple.reset();
                return;
            }
        }

        if (head.x === this.apple.x && head.y === this.apple.y) {
            this.apple.reset();
        } else {
            this.snake.shrink();
        }
    }

    shouldUpdate(time) {
        const INTERVAL = 150; // milliseconds
        if (time - this.time >= INTERVAL) {
            this.time = time;
            return true;
        }
        return false;
    }

}
