import type { Application } from 'pixi.js';

declare global {
  interface Window {
    ApiCanvasPixi: Application | null;
  }
}
