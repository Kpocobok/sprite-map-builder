import * as PIXI from 'pixi.js';
import type {ILayoutSettings} from '../interfaces/store';
import {DEFAULT_MESH_ID, DEFAULT_BG_ID, DEFAULT_LAYERS_ID, DEFAULT_TOPSTAGE_ID, DEFAULT_MAIN_ID, DEFAULT_PIXI_APPLICATION_BG} from '../constants/default';
import {drawMeshes, getCoordinatsIsometricMeshLines, getCoordinatsDefaultMeshLines, getCoordinatsIsometricOses, getCoordinatsDefaultOses, drawCoordinats, drawBGMesh} from './pixi-mesh';
import {mouseDown, mouseMove, mouseOut, mouseOver, mouseScroll, mouseUp} from './pixi-events';
import {centerLayout, getCenterLayout, getChild} from './pixi-common-methods';
import {hexToPixiColor} from './utils';

/**
 * Создание контейнеров по умолчанию при регистрации pixi контейнера
 * @returns void
 */
export const createDefaultContainers = (): void => {
    if (!window.ApiCanvasPixi) return;

    const mainContainer: PIXI.Container = new PIXI.Container();
    const meshContainer: PIXI.Container = new PIXI.Container();
    const backgroundContainer: PIXI.Container = new PIXI.Container();
    const layersContainer: PIXI.Container = new PIXI.Container();
    const topStage: PIXI.Container = new PIXI.Container();
    const maskStage: PIXI.Graphics = new PIXI.Graphics();
    // устанавливаю scale в 1
    window.ApiCurrentScale = 1;

    // создаем маску для рендеринга (обрезаем все что не в маске)
    maskStage.beginPath();
    maskStage.rect(0, 0, window.ApiCanvasPixi.screen.width, window.ApiCanvasPixi.screen.height).fill(hexToPixiColor(DEFAULT_PIXI_APPLICATION_BG));
    maskStage.closePath();
    maskStage.x = 0;
    maskStage.y = 0;

    // eventmode для основого контейнера
    mainContainer.eventMode = 'static';
    // включаем интерактив для основного контейнера
    mainContainer.interactive = true;
    // события для основного контейнера
    mainContainer.on('pointerover', mouseOver, mainContainer);
    mainContainer.on('pointerout', mouseOut, mainContainer);
    mainContainer.on('pointermove', mouseMove, mainContainer);
    mainContainer.on('pointerdown', mouseDown, mainContainer);
    mainContainer.on('pointerup', mouseUp, mainContainer);
    // TODO: надо подумать к чему лучше применить
    window.ApiCanvasPixi.canvas.addEventListener('wheel', mouseScroll, {passive: false});

    mainContainer.label = DEFAULT_MAIN_ID;
    backgroundContainer.label = DEFAULT_MESH_ID;
    meshContainer.label = DEFAULT_BG_ID;
    layersContainer.label = DEFAULT_LAYERS_ID;
    topStage.label = DEFAULT_TOPSTAGE_ID;

    mainContainer.addChild(backgroundContainer);
    mainContainer.addChild(meshContainer);
    mainContainer.addChild(layersContainer);
    mainContainer.addChild(topStage);

    window.ApiCanvasPixi.stage.addChild(maskStage);

    mainContainer.mask = maskStage;

    window.ApiCanvasPixi.stage.addChild(mainContainer);

    return;
};

/**
 * Обновить размеры и сетку поля
 * @param layout ILayoutSettings
 * @returns void
 */
export const updateLayout = (layout: ILayoutSettings): void => {
    if (!window.ApiCanvasPixi) return;

    const meshContainer: PIXI.Container | null = getChild(DEFAULT_MESH_ID, true);

    if (!meshContainer) return;

    meshContainer.children = [];

    // графические элементы
    const bg: PIXI.Graphics = new PIXI.Graphics();
    const mesh: PIXI.Graphics = new PIXI.Graphics();
    const coordinats: PIXI.Container = new PIXI.Container();
    const oses: PIXI.Graphics = new PIXI.Graphics();

    drawBGMesh(bg, layout);

    if (layout.showMesh) {
        // получаем массивы начальных и конечных точек линий сетки
        const {osX, osY} = layout.type === 'isometric' ? getCoordinatsIsometricMeshLines(layout) : getCoordinatsDefaultMeshLines(layout);
        // начинаем отрисовку линий сетки
        drawMeshes([...osX, ...osY], mesh, layout.meshColor, layout.meshWidth);
    }

    if (layout.showOs) {
        // получаем массив началных и конечных точке для осей
        const cordinats = layout.type === 'isometric' ? getCoordinatsIsometricOses(layout) : getCoordinatsDefaultOses(layout);
        // начинаем отрисовку
        drawMeshes(cordinats, oses, layout.osColor, layout.osWidth);
    }

    if (layout.showText) {
        // отрисовать координаты
        drawCoordinats(coordinats, layout);
    }

    const {x, y} = getCenterLayout();

    bg.x = mesh.x = oses.x = coordinats.x = x;
    bg.y = mesh.y = oses.y = coordinats.y = y;

    meshContainer.addChild(bg);
    meshContainer.addChild(mesh);
    meshContainer.addChild(coordinats);
    meshContainer.addChild(oses);
    meshContainer.cacheAsTexture(true);

    return;
};

/**
 * Отцентровать рабочую область
 * @returns
 */
export const moveCenter = (): void => centerLayout();
