import { Point } from "pixi.js";

export interface IGameObject {
    velocity: Point;
    maxVelocity: Point;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    centerX?: number;
    centerY?: number;
    halfWidth?: number;
    halfHeight?: number;

    update(delta: number): void;
}
