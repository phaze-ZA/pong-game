import { Container, Graphics, Point } from "pixi.js";
import { app } from "./main";
import { IGameObject } from "./types";

export class Ball extends Container implements IGameObject {
    velocity: Point;
    maxVelocity: Point;

    constructor() {
        super();
        // Ball always starts in the center
        this.x = app.screen.width / 2;
        this.y = app.screen.height / 2;
        this.velocity = new Point(0, 0);
        this.maxVelocity = new Point(40, 20);

        this.reset();

        const ball = new Graphics();
        ball.beginFill(0xFFFFFF);
        ball.drawRect(0, 0, 10, 10);
        ball.endFill();
        this.addChild(ball);
    }

    update(delta: number): void {
        if (this.y < this.height || this.y > app.screen.height - this.height) {
            this.velocity.y = -this.velocity.y;
        }

        if (this.x < this.width || this.x > app.screen.width - this.width) {
            this.reset();
        }

        this.x += this.velocity.x * delta;
        this.y += this.velocity.y * delta;
    }

    bounce(): void {
        this.velocity.x = -1.2 * this.velocity.x;
        if (Math.abs(this.velocity.x) > this.maxVelocity.x) {
            this.velocity.x = this.velocity.x > 0 ? this.maxVelocity.x : -this.maxVelocity.x;
        }
    }

    reset() {
        this.x = app.screen.width / 2;
        this.y = app.screen.height / 2;
        this.velocity.set(Math.random() * 5 + 2, Math.random() * 5 + 2)
    }
}
