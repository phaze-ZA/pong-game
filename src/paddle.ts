import { Container, Graphics, Point } from "pixi.js";
import { app } from "./main";
import { IGameObject } from "./types";

export class Paddle extends Container implements IGameObject {
    velocity: Point;
    maxVelocity: Point;

    constructor(x: number, y: number, name: string) {
        super();
        this.velocity = new Point(0);
        this.maxVelocity = new Point(0, 10);

        const paddleWidth = 30;
        const paddleHeight = 120;
        this.x = x;
        this.y = y;

        const paddle = new Graphics();
        paddle.beginFill(0xFFFFFF);
        paddle.drawRect(0, 0, paddleWidth, paddleHeight);
        paddle.endFill();
        this.addChild(paddle);
    }

    move(isUp: boolean) {
        // Is the paddle inside the screen?
        if (this.y >= 0 && this.y + this.height <= app.screen.height) {
            this.velocity.y = isUp ? -this.maxVelocity.y : this.maxVelocity.y
        }
    }

    stop() {
        this.velocity.set(0);
    }

    update(delta: number): void {
        if (this.y + this.velocity.y * delta > (app.screen.height - this.height)) {
            this.y = app.screen.height - this.height;
        }
        else if (this.y + this.velocity.y * delta < 0) {
            this.y = 0;
        }
        else {
            this.y += this.velocity.y * delta;
        }
    }
}
