import * as PIXI from 'pixi.js';
import type {ILayoutSettings} from '../interfaces/store';
import {DEFAULT_MESH_ID, DEFAULT_BG_ID, DEFAULT_LAYERS_ID, DEFAULT_TOPSTAGE_ID, SIDEBAR_WIDTH} from '../constants/default';
import {hexToPixiColor} from './utils';

export interface ICoordinats {
    x: number;
    y: number;
}

export interface ICoordinatsISOMesh {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    endSX?: number;
    endSY?: number;
}

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
 * Получаем углы изометрической клетки
 * @param layout ILayoutSettings
 * @returns
 */
export const getRadians = (layout: ILayoutSettings) => {
    const horizontal = layout.horizontal / 2;
    const vertical = layout.vertical / 2;
    const alpha = Math.atan(horizontal / vertical);
    const betta = (90 - alpha * (180 / Math.PI)) * (Math.PI / 180);
    return {alpha, betta};
};

/**
 * Координаты начальных и конечных точек для обычной сетки
 * @param layout ILayoutSettings
 * @returns
 */
export const getCoordinatsDefaultMeshLines = (layout: ILayoutSettings) => {
    const osX: ICoordinatsISOMesh[] = [];
    const osY: ICoordinatsISOMesh[] = [];
    // реальная высота и ширина плоскости
    const width: number = layout.width + SIDEBAR_WIDTH;
    const height: number = layout.height;
    // получаем шаги начальных точек по горизонтале в рамках удлиненного горизонтального ребра
    const stepsX: number = Math.ceil(width / layout.horizontal);
    const stepsY: number = Math.ceil(height / layout.vertical);
    // начинаем сбор начальных и конечных точек для изометричесокй плоскости
    for (let x = 0; x < stepsX; x++) {
        const startX = x * layout.horizontal;
        const startY = 0;
        const endX = x * layout.horizontal;
        const endY = height;
        // добавляем в массив
        osX.push({startX, startY, endX, endY});
    }
    // получаем координаты для вертикальной оси
    for (let x = 0; x < stepsY; x++) {
        const startX = 0;
        const startY = x * layout.vertical;
        const endX = width;
        const endY = x * layout.vertical;
        // добавляем в массив
        osY.push({startX, startY, endX, endY});
    }
    // возращаем два массива с координатами начальных и конечных точек линий обычной сетки
    return {osX, osY};
};

/**
 * Координаты начальных и конечных точек для изометрической сетки
 * @param layout ILayoutSettings
 * @returns
 */
export const getCoordinatsIsometricMeshLines = (layout: ILayoutSettings) => {
    const osX: ICoordinatsISOMesh[] = [];
    const osY: ICoordinatsISOMesh[] = [];
    // получаем основные углы изометрической клетки
    const {alpha, betta} = getRadians(layout);
    // реальная высота и ширина плоскости
    const width: number = layout.width + SIDEBAR_WIDTH;
    const height: number = layout.height;
    // получаем удлененное ребро по горизонтале, так чтобы плоскость оказалось внутри виртуального треугольника
    const fullWidth = width + height * Math.tan(alpha);
    // получаем шаги начальных точек по горизонтале в рамках удлиненного горизонтального ребра
    const stepsX: number = Math.ceil(fullWidth / layout.horizontal);
    const stepsY: number = Math.ceil(height / layout.vertical);
    // начинаем сбор начальных и конечных точек для изометричесокй плоскости
    for (let x = 0; x < stepsX; x++) {
        // начальная точка /
        const startX = x * layout.horizontal >= width ? width : x * layout.horizontal;
        const startY = x * layout.horizontal >= width ? (x * layout.horizontal - width) * Math.tan(betta) : 0;
        // конечная точка /
        const endY = x * layout.horizontal * Math.tan(betta) >= height ? height : x * layout.horizontal * Math.tan(betta);
        const endX = x * layout.horizontal * Math.tan(betta) >= height ? (x * layout.horizontal * Math.tan(betta) - height) * Math.tan(alpha) : 0;
        // конечная точка \
        const endSX = x * layout.horizontal + height * Math.tan(alpha) >= width ? width : x * layout.horizontal + height * Math.tan(alpha);
        const endSY = x * layout.horizontal + height * Math.tan(alpha) >= width ? height - (x * layout.horizontal + height * Math.tan(alpha) - width) * Math.tan(betta) : height;
        // добавляем в массив
        osX.push({startX, startY, endX, endY, endSX, endSY});
    }
    // получаем координаты для вертикальной оси
    for (let x = 0; x < stepsY; x++) {
        // начальная точка \
        const startX = 0;
        const startY = x * layout.vertical;
        // конечная точка \
        const endX = (height - x * layout.vertical) * Math.tan(alpha) >= width ? width : (height - x * layout.vertical) * Math.tan(alpha);
        const endY = (height - x * layout.vertical) * Math.tan(alpha) >= width ? ((height - x * layout.vertical) * Math.tan(alpha) - width) * Math.tan(alpha) : height;
        // добавляем в массив
        osY.push({startX, startY, endX, endY});
    }
    // возращаем два массива с координатами начальных и конечных точек линий изометрической сетки
    return {osX, osY};
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

    const mesh: PIXI.Graphics = new PIXI.Graphics();
    const coordinats: PIXI.Container = new PIXI.Container();
    const oses: PIXI.Graphics = new PIXI.Graphics();

    if (layout.showMesh) {
        // находим полную длину верхнего ребра плоскости для отрисовки линий изометрии
        const {osX, osY} = layout.type === 'isometric' ? getCoordinatsIsometricMeshLines(layout) : getCoordinatsDefaultMeshLines(layout);
        // начинаем отрисовку линий на правую сторону
        for (const os of [osX, osY]) {
            for (const point of os) {
                mesh.beginPath();
                mesh.moveTo(point.startX, point.startY);
                mesh.lineTo(point.endX, point.endY);
                if (point.endSX !== undefined && point.endSY !== undefined) {
                    mesh.moveTo(point.startX, point.startY);
                    mesh.lineTo(point.endSX, point.endSY);
                }
                mesh.stroke({
                    width: layout.meshWidth,
                    color: hexToPixiColor(layout.meshColor)
                });
                mesh.closePath();
            }
        }
    }

    if (layout.showOs) {
        const middleX = Math.ceil((layout.width + SIDEBAR_WIDTH) / layout.horizontal / 2) * layout.horizontal;
        const middleY = Math.ceil(Math.ceil(layout.height / layout.vertical) / 2) * layout.vertical;
        if (layout.type === 'default') {
            // Y
            oses.beginPath();
            oses.moveTo(middleX, 0);
            oses.lineTo(middleX, layout.height);
            oses.stroke({
                width: layout.osWidth,
                color: hexToPixiColor(layout.osColor)
            });
            oses.closePath();
            // X
            oses.beginPath();
            oses.moveTo(0, middleY);
            oses.lineTo(layout.width + SIDEBAR_WIDTH, middleY);
            oses.stroke({
                width: layout.osWidth,
                color: hexToPixiColor(layout.osColor)
            });
            oses.closePath();
            // рисуем оси для изометрии
        } else if (layout.type === 'isometric') {
            // получаем основные углы изометрической клетки
            const {alpha, betta} = getRadians(layout);
            // ось \
            const startOSxY = middleX * Math.tan(betta) >= middleY ? middleY - middleX * Math.tan(betta) : 0;
            const startOSxX = middleX * Math.tan(betta) >= middleY ? 0 : (middleY - middleX * Math.tan(betta)) * Math.tan(betta);
            const endOSxY = middleX * Math.tan(betta) >= middleY ? middleY * 2 : middleY + middleX * Math.tan(betta);
            const endOSxX = middleX * Math.tan(betta) >= middleY ? middleX * 2 - (middleX * Math.tan(betta) - middleY) * Math.tan(alpha) : middleX * 2;
            // ось /
            const startOSyY = middleX * Math.tan(betta) >= middleY ? middleY - middleX * Math.tan(betta) : 0;
            const startOSyX = middleX * Math.tan(betta) >= middleY ? middleX * 2 : middleX * 2 - (middleY - middleX * Math.tan(betta)) * Math.tan(betta);
            const endOSyY = middleX * Math.tan(betta) >= middleY ? middleY * 2 : middleY + middleX * Math.tan(betta);
            const endOSyX = middleX * Math.tan(betta) >= middleY ? (middleX * Math.tan(betta) - middleY) * Math.tan(alpha) : 0;
            // X
            oses.beginPath();
            oses.moveTo(startOSxX, startOSxY);
            oses.lineTo(endOSxX, endOSxY);
            oses.stroke({
                width: layout.osWidth,
                color: hexToPixiColor(layout.osColor)
            });
            oses.closePath();
            // Y
            oses.beginPath();
            oses.moveTo(startOSyX, startOSyY);
            oses.lineTo(endOSyX, endOSyY);
            oses.stroke({
                width: layout.osWidth,
                color: hexToPixiColor(layout.osColor)
            });
            oses.closePath();
        } else return;
    }

    if (layout.showText) {
        if (layout.type === 'default') {
            const realNumberCellsVertical = Math.ceil(layout.height / layout.vertical);
            const partHorizont = -Math.ceil((layout.width + SIDEBAR_WIDTH) / layout.horizontal / 2);
            const partVertical = Math.ceil(realNumberCellsVertical / 2);

            let indexX = 0;
            let indexY = 0;
            for (let x = 0; x < (layout.width + SIDEBAR_WIDTH) / layout.horizontal; x++) {
                indexY = 0;
                for (let y = 0; y < realNumberCellsVertical; y++) {
                    const style: PIXI.TextStyle = new PIXI.TextStyle({
                        fontFamily: 'Montserrat',
                        fontSize: layout.textSize,
                        fill: layout.textColor
                    });

                    indexX = partHorizont + x === 0 ? 1 : indexX;
                    indexY = partVertical - y === 0 ? 1 : indexY;

                    const contentX = partHorizont + x + indexX;
                    const contentY = partVertical - y - indexY;

                    const text: PIXI.Text = new PIXI.Text({
                        text: `${contentX}:${contentY}`,
                        style
                    });

                    text.x = x * layout.horizontal + layout.horizontal / 2 - text.width / 2;
                    text.y = y * layout.vertical + layout.vertical / 2 - text.height / 2;

                    coordinats.addChild(text);
                }
            }
        } else if (layout.type === 'isometric') {
            // выставляем данные о ячейках
        } else return;
    }

    meshContainer.addChild(mesh);
    meshContainer.addChild(coordinats);
    meshContainer.addChild(oses);

    return;
};

/**
 * Перевод нативных координат в изометрические
 * @param x number (нативная координата х)
 * @param y number (нативная координата y)
 * @param layout ILayoutSettings
 * @returns ICoordinats (изометрические координаты)
 */
export const convertCoordsFromNativeToISO = (x: number, y: number, layout: ILayoutSettings): ICoordinats => {
    return {
        x: (x - y) * (layout.horizontal / 2),
        y: (x + y) * (layout.vertical / 2)
    };
};
