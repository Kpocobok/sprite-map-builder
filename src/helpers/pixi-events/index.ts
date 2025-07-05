import * as PIXI from 'pixi.js';
import {store} from '../../store';
import type {ILayoutSettings} from '../../interfaces/store';
import {getChild, getMiddle} from '../pixi-common-methods';
import {DEFAULT_MAIN_ID, SIDEBAR_WIDTH} from '../../constants/default';

/**
 * Событие зума (НЕ ДОДЕЛАНО)
 * @param event
 * @returns
 */
export const mouseScroll = (event: WheelEvent): void => {
    console.log('scroll', event);

    if (!window.ApiCanvasPixi) return;

    const container = getChild('main');

    if (!container) return;

    let scale = 1;
    const scaleStep = 0.1;
    const minScale = 0.5;
    const maxScale = 4;

    event.preventDefault();

    const direction = event.deltaY > 0 ? -1 : 1;
    const newScale = Math.min(Math.max(scale + direction * scaleStep, minScale), maxScale);
    const scaleRatio = newScale / scale;

    const mouse = window.ApiCanvasPixi?.renderer.events.pointer.screen;
    const local = container.toLocal(mouse);

    container.x -= local.x * (scaleRatio - 1);
    container.y -= local.y * (scaleRatio - 1);

    scale = newScale;

    container.scale.set(scale);
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
            main.cursor = 'move';
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
    const main: PIXI.Container | null = getChild('main', true);

    if (window.ApiCurrentTarget && window.ApiCurrentTarget === main) {
        window.ApiCurrentTarget.cursor = '';
    }

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
    // console.log('mouseMove', event);
    if (!window.ApiCanvasPixi) return;

    const layout: ILayoutSettings = store.getState().app.layout;
    const {x, y} = getMiddle();

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
