import type { Application, Container } from 'pixi.js';

declare global {
  interface Window {
    ApiCanvasPixi: Application | null;
    ApiCanvasPixiContainerRegister: Map<string, Container> | null;
  }
}
