import type { ILayoutSettings, MESH_TYPES } from '../interfaces/store';

export const DEFAULT_PIXI_APPLICATION_SIZE: { width: number; height: number } =
  {
    width: window.innerWidth,
    height: window.innerHeight,
  };
export const DEFAULT_PIXI_APPLICATION_BG: string = '#f5f5f5';

export const DEFAULT_MESH_ID: string = 'mesh';
export const DEFAULT_BG_ID: string = 'bg';
export const DEFAULT_LAYERS_ID: string = 'layers';

export const DEFAULT_MESH_TYPES: MESH_TYPES[] = ['default', 'isometric'];

export const DEFAULT_LAYOUT: ILayoutSettings = {
  type: DEFAULT_MESH_TYPES[0],
  horizontal: 16,
  vertical: 16,
  width: window.innerWidth,
  height: window.innerHeight,
};
