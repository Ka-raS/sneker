class TestInterface {
    check() {}
}

export class AppleEatTest extends TestInterface {

    #snakeSize;
    #applePrevX;
    #applePrevY;
    #scene;

    constructor(scene) {
        super();
        this.#scene = scene;
    }

    prepare() {
        this.#scene.apple.reset = function() {};
        this.#snakeSize = this.#applePrevX = this.#applePrevY = -1;
    }

    check() {
        const snakeSize = this.#scene.snake.getBody().length;
        if (this.#snakeSize === snakeSize) {
            return;
        }
        
        const apple = this.#scene.apple;
        const isFirstCheck = this.#snakeSize === -1;
        this.#snakeSize = snakeSize;
        
        if (isFirstCheck) {
            this.#applePrevX = apple.x;
            this.#applePrevY = apple.y;
            return;
        }
        
        const appleChanged = apple.x !== this.#applePrevX || apple.y !== this.#applePrevY;
        console.log(`AppleEatTest: ${appleChanged}`);
    }

}