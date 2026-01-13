class TestAbstract {

    constructor(scene) {
        this.scene = scene;             // là đối tượng MyGame
    }

    getID() { return ''; }              // HTML element ID của textarea để input code
    getCodeTemplate() { return ''; }    // Code template để hiện trong textarea
    onCreate() {}                       // được chạy 1 lần trong MyGame.create()
    onUpdate() {}                       // được chạy liên tục trong MyGame.update()
}

export class AppleResetTest extends TestAbstract {

    constructor(scene) {
        super(scene);
    }

    getID() { 
        return 'test-apple-reset';
    }

    getCodeTemplate() {
        return `// Bài tập Apple Reset
// -------------------
// Triển khai hàm resetApple(apple, snakeBody) đặt lại vị trí táo khi bị ăn.
// Vị trí mới không được trùng với rắn.
// 
// Tham số:
// - apple: một đối tượng Vector2 đại diện cho vị trí hiện tại của táo.
// - snakeBody: một mảng các đối tượng Vector2 đại diện cho các vị trí của thân rắn.
// 
// Trả về:
// - Một đối tượng Vector2 mới đại diện cho vị trí mới của táo.

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function resetApple(apple, snakeBody) {
    // YOUR CODE HERE
    // Example:
    let x = apple.x, y = apple.y;
    do {
        x = Math.floor(Math.random() * 30);
        y = Math.floor(Math.random() * 30);
    } while (snakeBody.some(segment => segment.x === x && segment.y === y));
    return new Vector2(x, y);
}`
    }

    // không cần onUpdate() trong test này

    #resetCalledCounter = 0;
    static #SUCCESS_THRESHOLD = 5;

    onCreate() {
        const test = this;
        this.scene.apple.reset = function() {};
        document.getElementById(this.getID()).value = this.getCodeTemplate();

        document.getElementById('btn-submit').addEventListener('click', () => {
            // Extract hàm resetApple từ code người dùng nhập
            const functionCode = document.getElementById(this.getID()).value
                                 .split('function resetApple')[1];

            const resetAppleFunction = new Function('Vector2', 
                `function resetApple${functionCode}
                return resetApple;`
            )(Phaser.Math.Vector2);

            // Ghi đè hàm reset của apple
            this.scene.apple.reset = function() {
                const previous = new Phaser.Math.Vector2(this.x, this.y);
                const next = resetAppleFunction(previous, test.scene.snake.getBody());
                this.setPosition(next.x, next.y);
                test.#checkAppleAfterReset(previous);
            };
        });
    }

    // TODO: Gửi POST JSON về server
    #checkAppleAfterReset(prevPos) {
        if (prevPos.x === this.scene.apple.x && prevPos.y === this.scene.apple.y) {
            console.log("AppleResetTest: false");
            return;
        }

        for (const segment of this.scene.snake.getBody()) {
            if (segment.equals(prevPos)) {
                console.log("AppleResetTest: false");
                return;
            }
        }

        if (this.#resetCalledCounter >= AppleResetTest.#SUCCESS_THRESHOLD) {
            return;
        }

        ++this.#resetCalledCounter;
        if (this.#resetCalledCounter >= AppleResetTest.#SUCCESS_THRESHOLD) {
            console.log("AppleResetTest: true");
        }
    }
}


// TODO
// export class SnakeSelfCollisionTest extends TestInterface {

//     static ID = 'snake-self-collision-test';
