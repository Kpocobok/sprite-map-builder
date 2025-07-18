import * as PIXI from 'pixi.js';
import {store} from '../../store';
import type {ILayoutSettings, IRootState} from '../../interfaces/store';
import {getCenterLayout, getChild, getMiddle, getRealCoordinatsFromCommon} from '../pixi-common-methods';
import {DEFAULT_MAIN_ID, DEFAULT_PIXI_MAX_SCALE, DEFAULT_PIXI_MIN_SCALE, DEFAULT_PIXI_STEP_SCALE, SIDEBAR_WIDTH} from '../../constants/default';

/**
 * Событие зума (НЕ ДОДЕЛАНО)
 * @param event
 * @returns
 */
export const mouseScroll = (event: WheelEvent): void => {
    // console.log('scroll', event);
    const str: IRootState = store.getState();
    const config: ILayoutSettings = str.app.layout;

    event.preventDefault();

    const main = getChild(DEFAULT_MAIN_ID);

    if (!main || !event.ctrlKey || !main || !window.ApiCanvasPixi) return;

    const direction = event.deltaY > 0 ? -1 : 1;
    const scale = direction * DEFAULT_PIXI_STEP_SCALE;

    const scaleX = main.scale.x + scale;
    const scaleY = main.scale.y + scale;

    console.table({
        scale: Number(main.scale.x.toFixed(2)),
        realWidth: window.ApiCanvasPixi.renderer.width,
        realHeight: window.ApiCanvasPixi.renderer.height,
        currentWidth: main.width,
        currentHeight: main.height,
        mouseX: event.x,
        mouseY: event.y,
        realX: getRealCoordinatsFromCommon(event.x, event.y).x,
        newMouseX: event.x * Number(main.scale.x.toFixed(2)),
        newMouseY: event.x * Number(main.scale.y.toFixed(2)),
        mainX: main.x,
        mainY: main.y
    });

    const newMouseX = event.x - event.x * main.scale.x;
    const newMouseY = event.y - event.y * main.scale.y;

    // const offsetX = main.x + (main.width - main.width * scaleX) / 4;
    // const offsetY = main.y + (main.height - main.height * scaleY) / 4;
    // const offsetX = main.x + ((main.width - main.width * scaleX) / 2) * direction;
    // const offsetY = main.y + ((main.height - main.height * scaleY) / 2) * direction;

    if (scaleX > DEFAULT_PIXI_MIN_SCALE && scaleX < DEFAULT_PIXI_MAX_SCALE && scaleY > DEFAULT_PIXI_MIN_SCALE && scaleY < DEFAULT_PIXI_MAX_SCALE) {
        main.scale.set(scaleX, scaleY);

        // console.log(scaleX, scaleY, event.x, event.y);
        main.position.set(newMouseX, newMouseY);
    }
};

/**
 * Событие наведения мыши
 * @param event PIXI.FederatedPointerEvent
 */
export const mouseOver = (event: PIXI.FederatedPointerEvent): void => {
    // console.log('mouseOver', event);
};

/**
 * Событие ухода мыши
 * @param event
 */
export const mouseOut = (event: PIXI.FederatedPointerEvent): void => {
    // console.log('mouseOut', event);
};

/**
 * Событие нажатие левой кнопки мыши
 * @param event PIXI.FederatedPointerEvent
 */
export const mouseDown = (event: PIXI.FederatedPointerEvent): void => {
    // console.log('mouseDown', event);
    const main: PIXI.Container | null = getChild(DEFAULT_MAIN_ID, true);

    if (main && main === event.target) {
        // проверяем нажат ли Ctrl
        if (event.ctrlKey) {
            window.ApiCurrentTarget = event.target;
            window.ApiStartPointX = event.x - event.target.x;
            window.ApiStartPointY = event.y - event.target.y;
        }
    }
};

/**
 * Событие отжатия левой кнопки мыши
 * @param event PIXI.FederatedPointerEvent
 */
export const mouseUp = (event: PIXI.FederatedPointerEvent): void => {
    // console.log('mouseUp', event);
    window.ApiCurrentTarget = null;
    window.ApiStartPointX = null;
    window.ApiStartPointY = null;
};

/**
 * Событие движения мыши
 * @param event PIXI.FederatedPointerEvent
 * @returns
 */
export const mouseMove = (event: PIXI.FederatedPointerEvent): void => {
    const main = getChild(DEFAULT_MAIN_ID) as PIXI.Container;
    const center = getCenterLayout();
    const middleRendererX = (window.ApiCanvasPixi as PIXI.Application).renderer.width / 2;
    const middleRendererY = (window.ApiCanvasPixi as PIXI.Application).renderer.height / 2;
    const {x, y} = getMiddle();

    console.log(main.x + event.x, main.y + event.y, x, y, center.x, center.y, middleRendererX, middleRendererY);
    // console.log('mouseMove', event);
    if (!window.ApiCanvasPixi) return;

    const layout: ILayoutSettings = store.getState().app.layout;

    const centerX = x - window.ApiCanvasPixi.screen.width / 2;
    const centerY = y - window.ApiCanvasPixi.screen.height / 2;

    if (window.ApiCurrentTarget && window.ApiStartPointX !== null && window.ApiStartPointY !== null) {
        const X = event.x - window.ApiStartPointX;
        const Y = event.y - window.ApiStartPointY;

        if (X < centerX && X > -centerX + SIDEBAR_WIDTH && Y < centerY - layout.vertical && Y > -centerY + layout.vertical) {
            window.ApiCurrentTarget.position.set(X, Y);
        }
    }
};
