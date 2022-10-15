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
    if (ball.y + ball.height / 2 >= aiPaddle.y + aiPaddle.height / 2) {
        movePaddle(Direction.DOWN, aiPaddle);
    }
    else if (ball.y + ball.height / 2 <= aiPaddle.y) {
        movePaddle(Direction.UP, aiPaddle);
    }

    aiPaddle.update(delta);
    playerPaddle.update(delta);
    ball.update(delta);

});