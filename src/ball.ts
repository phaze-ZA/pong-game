import { Container, Graphics } from "pixi.js";

export class Ball extends Container {
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        const ball = new Graphics();
        ball.beginFill(0xFFFFFF);
        ball.drawRect(0, 0, 5, 5);
        ball.endFill();
        this.addChild(ball);
    }
}