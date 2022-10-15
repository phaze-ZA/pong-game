import { Container, Graphics, Point } from "pixi.js";
import { app } from "./main";
import { IGameObject } from "./types";

export class Paddle extends Container implements IGameObject {
    velocity: Point;

    constructor(x: number, y: number, name: string) {
        super();
        this.velocity = new Point(0);

        const paddleWidth = 10;
        const paddleHeight = 50;
        this.x = x;
        this.y = y;

        const paddle = new Graphics();
        paddle.beginFill(0xFFFFFF);
        paddle.drawRect(0, 0, paddleWidth, paddleHeight);
        paddle.endFill();
        this.addChild(paddle);
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
