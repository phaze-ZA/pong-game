import { Container, Graphics, Point } from "pixi.js";
import { app } from "./main";

export class Paddle extends Container {
    public acceleration: Point;
    constructor(x: number, y: number, name: string) {
        super();
        this.name = name;        
        this.acceleration = new Point(0);

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

    move(distance: number) {
        if (this.y + distance > (app.screen.height - this.height)) {
            this.y = app.screen.height - this.height;
        }
        else if (this.y + distance < 0) {
            this.y = 0;
        }
        else {
            this.y += distance;
        }
    }
}