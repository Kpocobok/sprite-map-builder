import * as PIXI from 'pixi.js';
import type {ILayoutSettings} from '../interfaces/store';
import {DEFAULT_MESH_ID, DEFAULT_BG_ID, DEFAULT_LAYERS_ID, DEFAULT_TOPSTAGE_ID, SIDEBAR_WIDTH} from '../constants/default';
import {drawMeshes, getCoordinatsIsometricMeshLines, getCoordinatsDefaultMeshLines, getCoordinatsIsometricOses, getCoordinatsDefaultOses, drawCoordinats} from './pixi-mesh';

/**
 * Регистрация контейнеров в карте
 * @param id уникальный идентификатор контейнера
 * @param container контейнер для регистрации
 * @returns void
 */
export const registerContainer = (id: string, container: PIXI.Container): void => {
    if (!window.ApiCanvasPixiContainerRegister) return;

    const isset: PIXI.Container | undefined = window.ApiCanvasPixiContainerRegister.get(id);

    if (isset) return;

    window.ApiCanvasPixiContainerRegister.set(id, container);

    return;
};

/**
 * Создание контейнеров по умолчанию при регистрации pixi контейнера
 * @returns void
 */
export const createDefaultContainers = (): void => {
    if (!window.ApiCanvasPixi) return;

    const meshContainer: PIXI.Container = new PIXI.Container();
    meshContainer.x = -SIDEBAR_WIDTH;
    const backgroundContainer: PIXI.Container = new PIXI.Container();
    backgroundContainer.x = -SIDEBAR_WIDTH;
    const layersContainer: PIXI.Container = new PIXI.Container();
    layersContainer.x = -SIDEBAR_WIDTH;
    const topStage: PIXI.Container = new PIXI.Container();
    topStage.x = -SIDEBAR_WIDTH;

    window.ApiCanvasPixi.stage.addChild(backgroundContainer);
    window.ApiCanvasPixi.stage.addChild(meshContainer);
    window.ApiCanvasPixi.stage.addChild(layersContainer);
    window.ApiCanvasPixi.stage.addChild(topStage);

    registerContainer(DEFAULT_MESH_ID, backgroundContainer);
    registerContainer(DEFAULT_BG_ID, meshContainer);
    registerContainer(DEFAULT_LAYERS_ID, layersContainer);
    registerContainer(DEFAULT_TOPSTAGE_ID, topStage);

    return;
};

/**
 * Обновить размеры и сетку поля
 * @param layout ILayoutSettings
 * @returns void
 */
export const updateLayout = (layout: ILayoutSettings): void => {
    if (!window.ApiCanvasPixi || !window.ApiCanvasPixiContainerRegister) return;

    const meshContainer: PIXI.Container = window.ApiCanvasPixiContainerRegister.get(DEFAULT_MESH_ID) as PIXI.Container;

    meshContainer.children = [];

    // графические элементы
    const mesh: PIXI.Graphics = new PIXI.Graphics();
    const coordinats: PIXI.Container = new PIXI.Container();
    const oses: PIXI.Graphics = new PIXI.Graphics();

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

    meshContainer.addChild(mesh);
    meshContainer.addChild(coordinats);
    meshContainer.addChild(oses);

    return;
};
