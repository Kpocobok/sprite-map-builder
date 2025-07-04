import type {ILayoutSettings, MESH_TYPES} from '../interfaces/store';

export const DEFAULT_PIXI_APPLICATION_SIZE: {width: number; height: number} = {
    width: window.innerWidth,
    height: window.innerHeight
};
export const DEFAULT_PIXI_APPLICATION_BG: string = '#f5f5f5';

export const DEFAULT_MAIN_ID: string = 'main';
export const DEFAULT_MESH_ID: string = 'mesh';
export const DEFAULT_BG_ID: string = 'bg';
export const DEFAULT_LAYERS_ID: string = 'layers';
export const DEFAULT_TOPSTAGE_ID: string = 'topstage';
export const DEFAULT_MASK_ID: string = 'mask';

export const SIDEBAR_WIDTH: number = 400;

export const DEFAULT_MESH_TYPES: MESH_TYPES[] = ['default', 'isometric'];

export const DEFAULT_LAYOUT: ILayoutSettings = {
    type: DEFAULT_MESH_TYPES[1],
    horizontal: 128,
    vertical: 64,
    meshColor: '#E0E0E0',
    meshWidth: 1,
    osColor: '#ff0000',
    osWidth: 1,
    textColor: '#000000',
    textSize: 10,
    width: 5000,
    height: 5000,
    showMesh: true,
    showOs: true,
    showText: true
};
