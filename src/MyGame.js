import { CONFIG } from "./main.js";

class Snake {

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
        const tail = new Phaser.Math.Vector2(
            Phaser.Math.Between(1, CONFIG.width - 2),
            Phaser.Math.Between(1, CONFIG.height - 2)
        );
        this.body = [tail, tail.clone().add(this.direction)];
        this.redraw();
    }

    getHead() {
        return this.body[this.body.length - 1];
    }

    getBody() {
        return this.body;
    }

    setDirection(nextDirection) {
        if (this.direction.x !== -nextDirection.x || this.direction.y !== -nextDirection.y) {
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

class Apple extends Phaser.GameObjects.Rectangle {

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

export class MyGame extends Phaser.Scene {

    constructor() {
        super('MyGame');
    }

    init(data) {
        this.tests = data.tests.map(Class => new Class(this));
    }

    create() {
        this.time = 0;
        this.snake = new Snake(this);
        this.apple = new Apple(this, this.snake.getBody());
        this.keys = this.input.keyboard.createCursorKeys();
        for (const test of this.tests) {
            test.onCreate();
        }
    }

    update(time) {
        this.handleInput();
        if (this.shouldUpdate(time)) {
            this.snake.grow();
            this.handleCollisions();
        }

        for (const test of this.tests) {
            test.onUpdate();
        }
    }

    handleInput() {
        const inputs = [
            [this.keys.up,    Phaser.Math.Vector2.UP],
            [this.keys.right, Phaser.Math.Vector2.RIGHT],
            [this.keys.down,  Phaser.Math.Vector2.DOWN],
            [this.keys.left,  Phaser.Math.Vector2.LEFT]
        ];
        for (const [key, direction] of inputs) {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                this.snake.setDirection(direction);
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
