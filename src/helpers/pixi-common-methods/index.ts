import type {Container} from 'pixi.js';
import {DEFAULT_MAIN_ID, SIDEBAR_WIDTH} from '../../constants/default';
import type {PixiMap} from '../../declare';
import {store} from '../../store';
import type {ICoordinats} from '../pixi-interface';

/**
 * Получить контейнер или спрайт по ID
 * @param id string
 * @param deep boolean
 * @returns PixiMap | null
 */
export const getChild = (id: string, deep: boolean = true): PixiMap | null => {
    if (!window.ApiCanvasPixi) return null;

    return window.ApiCanvasPixi.stage.getChildByLabel(id, deep);
};

/**
 * Поиск реальных координат центральной ячейки
 * @param layout ILayoutSettings
 * @returns ICoordinats
 */
export const getMiddle = (): ICoordinats => {
    const layout = store.getState().app.layout;

    const x = Math.ceil((layout.width + SIDEBAR_WIDTH) / layout.horizontal / 2) * layout.horizontal;
    const y = Math.ceil(Math.ceil(layout.height / layout.vertical) / 2) * layout.vertical;

    return {x, y};
};

/**
 * Поиск реальных координат центральной ячейки относительно рабочей области целиком
 * @returns ICoordinats
 */
export const getCenterLayout = (): ICoordinats => {
    const layout = store.getState().app.layout;

    if (!window.ApiCanvasPixi) return getMiddle();

    return {
        x: window.ApiCanvasPixi.renderer.width / 2 - layout.width / 2 - SIDEBAR_WIDTH,
        y: window.ApiCanvasPixi.renderer.height / 2 - layout.height / 2
    };
};

export const getRealCoordinatsFromCommon = (CommonX: number, CommonY: number): ICoordinats => {
    const main: Container = getChild(DEFAULT_MAIN_ID, true) as Container;
    const currentMainX: number = main.x;
    const currentMainY: number = main.y;
    const currentScaleX: number = Number(main.scale.x.toFixed(2));
    const currentScaleY: number = Number(main.scale.x.toFixed(2));

    return {x: 0, y: 0};
};

export const getIsometricCoordinatsFromCommon = (CommonX: number, CommonY: number) => {};

/**
 * Перемещение основной рабочей области на центр
 * @returns
 */
export const centerLayout = (): void => {
    const main = getChild(DEFAULT_MAIN_ID, true);

    if (!main) return;

    main.position.set(0, 0);
};
