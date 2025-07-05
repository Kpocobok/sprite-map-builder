import {Container, Sprite, type Application} from 'pixi.js';

export type PixiMap = Container | Sprite;

declare global {
    interface Window {
        ApiStartPointX: number | null;
        ApiStartPointY: number | null;
        ApiCurrentScale: number | null;
        ApiCurrentTarget: PixiMap | null;
        ApiCanvasPixi: Application | null;
    }
}
