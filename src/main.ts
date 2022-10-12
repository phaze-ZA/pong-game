import { Application } from 'pixi.js';
import { Ball } from './ball';
import { Key } from './key';
import { Paddle } from './paddle';

export const app = new Application({ backgroundColor: 0x000000, width: 500, height: 500 });
document.body.appendChild(app.view);

const playerPaddle = new Paddle(0, 0, 'player-paddle');
app.stage.addChild(playerPaddle);

const aiPaddle = new Paddle(app.screen.width - 10, 0, 'player-paddle');
aiPaddle.acceleration.set(0, 10);
app.stage.addChild(aiPaddle);

const ball = new Ball(app.screen.width / 2, app.screen.height / 2);
app.stage.addChild(ball);

const up = new Key("ArrowUp");
const down = new Key("ArrowDown");

up.press = () => {
    movePaddle(Direction.UP, playerPaddle);
}

up.release = () => {
    if (!down.isDown) {
        playerPaddle.acceleration.y = 0;
    }
}

down.press = () => {
    movePaddle(Direction.DOWN, playerPaddle);
}

down.release = () => {
    if (!up.isDown) {
        playerPaddle.acceleration.y = 0;   
    }
}

enum Direction {
    UP,
    DOWN
};

function movePaddle(direction: Direction, paddle: Paddle): void {
    switch (direction) {
        case Direction.UP: 
            if (paddle.y > 0) {
                paddle.acceleration.y = -10;
            }
            break;
        case Direction.DOWN:
            if (paddle.y + paddle.height < app.screen.height) {
                paddle.acceleration.y = 10;
            }
            break;
    }
}

app.ticker.add((delta) => {
    const newVal = aiPaddle.acceleration.y * (delta / 2) + aiPaddle.y;
    if (newVal < 0 || newVal > (app.screen.height - aiPaddle.height)) {
        aiPaddle.acceleration.y = -aiPaddle.acceleration.y;
    }

    aiPaddle.move(aiPaddle.acceleration.y * (delta / 2));
    playerPaddle.move(playerPaddle.acceleration.y * (delta / 2));
});