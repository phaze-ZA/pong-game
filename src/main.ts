import { Application } from 'pixi.js';
import { Ball } from './ball';
import { Key } from './key';
import { Paddle } from './paddle';
import { Direction, IGameObject } from './types';

export const app = new Application({ backgroundColor: 0x000000, width: 500, height: 500 });
document.body.appendChild(app.view);

const playerPaddle = new Paddle(10, app.screen.height / 2, 'player-paddle');
app.stage.addChild(playerPaddle);

const aiPaddle = new Paddle(app.screen.width - 20, app.screen.height / 2, 'player-paddle');
app.stage.addChild(aiPaddle);

const ball = new Ball();
app.stage.addChild(ball);

const up = new Key("ArrowUp");
const down = new Key("ArrowDown");

up.press = () => {
    movePaddle(Direction.UP, playerPaddle);
}

up.release = () => {
    if (!down.isDown) {
        playerPaddle.velocity.y = 0;
    }
}

down.press = () => {
    movePaddle(Direction.DOWN, playerPaddle);
}

down.release = () => {
    if (!up.isDown) {
        playerPaddle.velocity.y = 0;
    }
}

function movePaddle(direction: Direction, paddle: Paddle): void {
    switch (direction) {
        case Direction.UP:
            if (paddle.y > 0) {
                paddle.velocity.y = -10;
            }
            break;
        case Direction.DOWN:
            if (paddle.y + paddle.height < app.screen.height) {
                paddle.velocity.y = 10;
            }
            break;
    }
}

app.ticker.add((delta) => {

    // If top of ball is lower than bottom of paddle
    if (ball.y > aiPaddle.y + aiPaddle.height) {
        movePaddle(Direction.DOWN, aiPaddle);
    }
    // If bottom of ball is above top of paddle
    else if (ball.y + ball.height < aiPaddle.y) {
        movePaddle(Direction.UP, aiPaddle);
    }

    aiPaddle.update(delta);
    playerPaddle.update(delta);
    ball.update(delta);

    if (isColliding(playerPaddle, ball) || isColliding(aiPaddle, ball)){
        ball.velocity.x = -1.1 * ball.velocity.x;
    }
});

// AABB Collision Test
function isColliding(object1: IGameObject, object2: IGameObject) {
    const { x: x1, y: y1, height: h1, width: w1 } = object1; // object1
    const { x: x2, y: y2, height: h2, width: w2 } = object2; // object2

    return (
        // If left of object1 is further left than right of object2
        x1 < x2 + w2 &&
        // If right of object1 is further right than left of object2
        x1 + w1 > x2 &&
        // If top of object2 is higher than bottom of object1
        y1 < y2 + h2 &&
        // If bottom of object2 is lower than top of object1
        y1 + h1 > y2
    );
}
