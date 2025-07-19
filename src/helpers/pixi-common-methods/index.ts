import type {Container} from 'pixi.js';
import {DEFAULT_MAIN_ID, SIDEBAR_WIDTH} from '../../constants/default';
import type {PixiMap} from '../../declare';
import {store} from '../../store';
import type {ICoordinats} from '../pixi-interface';
import type {ILayoutSettings} from '../../interfaces/store';

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

/**
 * Получение реальных, тайтловых и изометрических координат от координат мыши
 * @param CommonX - позиция мыши по оси X из события
 * @param CommonY - позиция мыши по оси Y из события
 * @returns
 * x - реальные координаты в пространстве по оси X
 * y - реальные коордианты в пространстве по оси Y
 * tileX - координаты тайлов в сетке по умолчанию по оси X
 * tileY - координаты тайлов в сетке по умолчанию по оси Y
 * isoX - координаты тайлов в изометрической сетке по оси X
 * isoY - координаты тайлов в изометрической сетке по оси Y
 */
export const getRealCoordinatsFromCommon = (CommonX: number, CommonY: number) => {
    const main: Container = getChild(DEFAULT_MAIN_ID, true) as Container;
    const layout: ILayoutSettings = store.getState().app.layout;
    const center = getCenterLayout();
    const {x, y} = getMiddle();

    const realMouseX = -1 * (center.x + x - CommonX + main.x); // координаты относительно осей реальные по курсору
    const realMouseY = center.y + y - CommonY + main.y; // координаты относительно осей реальные по курсору

    const diffX = realMouseX < 0 ? -1 : 1;
    const diffY = realMouseY < 0 ? -1 : 1;

    const defaultMeshX = Math.ceil(Math.abs(realMouseX) / layout.horizontal) === 0 ? 1 * diffX : Math.ceil(Math.abs(realMouseX) / layout.horizontal) * diffX;
    const defaultMeshY = Math.ceil(Math.abs(realMouseY) / layout.vertical) === 0 ? 1 * diffY : Math.ceil(Math.abs(realMouseY) / layout.vertical) * diffY;

    const isoX = realMouseX / layout.horizontal + realMouseY / layout.vertical;
    const isoY = realMouseY / layout.vertical - realMouseX / layout.horizontal;

    const isometricMeshX = isoX < 0 ? Math.ceil(isoX) - 1 : Math.ceil(isoX);
    const isometricMeshY = isoY < 0 ? Math.ceil(isoY) - 1 : Math.ceil(isoY);

    return {x: realMouseX, y: realMouseY, tileX: defaultMeshX, tileY: defaultMeshY, isoX: isometricMeshX, isoY: isometricMeshY};
};

/**
 * Возвращает центральную точку изометрической ячейки
 * @param isoX - изометрическая координата по оси X
 * @param isoY - изометрическая координата по оси Y
 * @returns
 * centerX - центральная точка изометрической клетки по оси X
 * centerY - центральная точка изометрическое клетки по оси Y
 * leftX - левая точка изометрической клетки по оси X
 * leftY - левая точка изометрическое клетки по оси Y
 * topX - верхняя точка изометрической клетки по оси X
 * topY - верхняя точка изометрическое клетки по оси Y
 * rightX - правая точка изометрической клетки по оси X
 * rightY - правая точка изометрическое клетки по оси Y
 * bottomX - нижняя точка изометрической клетки по оси X
 * bottomY - нижняя точка изометрическое клетки по оси Y
 */
export const getCoordinatsFromIsometric = (isoX: number, isoY: number) => {
    const layout: ILayoutSettings = store.getState().app.layout;

    const X = isoX < 0 ? isoX + 1 : isoX;
    const Y = isoY < 0 ? isoY + 1 : isoY;

    const centerX = (X - Y) * (layout.horizontal / 2);
    const centerY = (X + Y) * (layout.vertical / 2) - layout.vertical / 2;

    const leftX = centerX - layout.horizontal / 2;
    const leftY = centerY;

    const topX = centerX;
    const topY = centerY + layout.vertical / 2;

    const rightX = centerX + layout.horizontal / 2;
    const rightY = centerY;

    const bottomX = centerX;
    const bottomY = centerY - layout.vertical / 2;

    return {centerX, centerY, leftX, leftY, topX, topY, rightX, rightY, bottomX, bottomY};
};

/**
 * Получить точки обычной клетки
 * @param tileX
 * @param tileY
 * @returns
 * centerX - центральная точка обычной клетки по оси X
 * centerY - центральная точка обычной клетки по оси Y
 * centerTopX - верхняя точка центральная по оси X
 * centerTopY - верхняя точка центральная по оси Y
 * leftTopX - верхняя точка слева по оси X
 * leftTopY - верхняя точка слева по оси Y
 * centerLeftX - центральная точка слева по оси X
 * centerLeftY - центральная точка слева по оси Y
 * rightTopX - верхняя точка справа по оси X
 * rightTopY - верхняя точка справа по оси Y
 * centerRightX - центральная точка справа по оси X
 * centerRightY - центральная точка справа по оси Y
 * centerBottomX - нижняя точка центральная по оси X
 * centerBottomY - нижняя точка центральная по оси Y
 * rightBottomX - нижняя точка справа по оси X
 * rightBottomY - нижняя точка справа по оси Y
 */
export const getCoordinatsFromTile = (tileX: number, tileY: number) => {
    const layout: ILayoutSettings = store.getState().app.layout;

    const X = tileX < 0 ? tileX + 1 : tileX;
    const Y = tileY < 0 ? tileY + 1 : tileY;

    const centerX = X * layout.horizontal - layout.horizontal / 2;
    const centerY = Y * layout.vertical - layout.horizontal / 2;

    const centerTopX = centerX;
    const centerTopY = centerX + layout.vertical / 2;

    const leftTopX = centerX - layout.horizontal / 2;
    const leftTopY = centerX + layout.vertical / 2;

    const centerLeftX = centerX - layout.horizontal / 2;
    const centerLeftY = centerY;

    const rightTopX = centerX + layout.horizontal / 2;
    const rightTopY = centerX + layout.vertical / 2;

    const centerRightX = centerX + layout.horizontal / 2;
    const centerRightY = centerY;

    const centerBottomX = centerX;
    const centerBottomY = centerX - layout.vertical / 2;

    const leftBottomX = centerX - layout.horizontal / 2;
    const leftBottomY = centerX - layout.vertical / 2;

    const rightBottomX = centerX + layout.horizontal / 2;
    const rightBottomY = centerX - layout.vertical / 2;

    return {centerX, centerY, centerTopX, centerTopY, leftTopX, leftTopY, centerLeftX, centerLeftY, rightTopX, rightTopY, centerRightX, centerRightY, centerBottomX, centerBottomY, leftBottomX, leftBottomY, rightBottomX, rightBottomY};
};

/**
 * Перемещение основной рабочей области на центр
 * @returns
 */
export const centerLayout = (): void => {
    const main = getChild(DEFAULT_MAIN_ID, true);

    if (!main) return;

    main.position.set(0, 0);
};
