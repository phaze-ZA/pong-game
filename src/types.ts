import { Point } from "pixi.js";

export interface IGameObject {
    velocity: Point;
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

export enum Direction {
    UP,
    DOWN
};
