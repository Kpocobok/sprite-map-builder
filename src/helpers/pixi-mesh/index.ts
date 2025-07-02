import * as PIXI from 'pixi.js';
import {SIDEBAR_WIDTH} from '../../constants/default';
import type {ILayoutSettings} from '../../interfaces/store';
import {hexToPixiColor} from '../utils';

export interface ICoordinats {
    x: number;
    y: number;
}

export interface ICoordinatsMesh {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    endSX?: number;
    endSY?: number;
}

export interface IOses {
    osX: ICoordinatsMesh[];
    osY: ICoordinatsMesh[];
}

export interface ICorners {
    alpha: number;
    betta: number;
}

/**
 * Получаем углы изометрической клетки
 * @param layout ILayoutSettings
 * @returns ICorners
 */
export const getRadians = (layout: ILayoutSettings): ICorners => {
    const horizontal = layout.horizontal / 2;
    const vertical = layout.vertical / 2;
    const alpha = Math.atan(horizontal / vertical);
    const betta = (90 - alpha * (180 / Math.PI)) * (Math.PI / 180);
    return {alpha, betta};
};

/**
 * Координаты начальных и конечных точек для обычной сетки
 * @param layout ILayoutSettings
 * @returns IOses
 */
export const getCoordinatsDefaultMeshLines = (layout: ILayoutSettings): IOses => {
    const osX: ICoordinatsMesh[] = [];
    const osY: ICoordinatsMesh[] = [];
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
 * @returns IOses
 */
export const getCoordinatsIsometricMeshLines = (layout: ILayoutSettings): IOses => {
    const osX: ICoordinatsMesh[] = [];
    const osY: ICoordinatsMesh[] = [];
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
 * Получить координаты начала и конца линий осей для сетки по умолчанию
 * @param layout ILayoutSettings
 * @returns ICoordinatsMesh[]
 */
export const getCoordinatsDefaultOses = (layout: ILayoutSettings): ICoordinatsMesh[] => {
    const middleX = Math.ceil((layout.width + SIDEBAR_WIDTH) / layout.horizontal / 2) * layout.horizontal;
    const middleY = Math.ceil(Math.ceil(layout.height / layout.vertical) / 2) * layout.vertical;

    return [
        {
            startX: middleX,
            startY: 0,
            endX: middleX,
            endY: layout.height
        },
        {
            startX: 0,
            startY: middleY,
            endX: layout.width + SIDEBAR_WIDTH,
            endY: middleY
        }
    ];
};

/**
 * Получить координаты начала и конца линий осей для изометрической сетки
 * @param layout ILayoutSettings
 * @returns ICoordinatsMesh[]
 */
export const getCoordinatsIsometricOses = (layout: ILayoutSettings): ICoordinatsMesh[] => {
    const {alpha, betta} = getRadians(layout);

    const middleX = Math.ceil((layout.width + SIDEBAR_WIDTH) / layout.horizontal / 2) * layout.horizontal;
    const middleY = Math.ceil(Math.ceil(layout.height / layout.vertical) / 2) * layout.vertical;

    const endY = middleX * Math.tan(betta) >= middleY ? middleY * 2 : middleY + middleX * Math.tan(betta);
    const startY = middleX * Math.tan(betta) >= middleY ? middleY - middleX * Math.tan(betta) : 0;
    const defaults = {startY, endY};

    return [
        {
            ...defaults,
            startX: middleX * Math.tan(betta) >= middleY ? 0 : (middleY - middleX * Math.tan(betta)) * Math.tan(betta),
            endX: middleX * Math.tan(betta) >= middleY ? middleX * 2 - (middleX * Math.tan(betta) - middleY) * Math.tan(alpha) : middleX * 2
        },
        {
            ...defaults,
            startX: middleX * Math.tan(betta) >= middleY ? middleX * 2 : middleX * 2 - (middleY - middleX * Math.tan(betta)) * Math.tan(betta),
            endX: middleX * Math.tan(betta) >= middleY ? (middleX * Math.tan(betta) - middleY) * Math.tan(alpha) : 0
        }
    ];
};

/**
 * Отрисовать линии по точкам согласно входящим парамметрам
 * @param poiters ICoordinatsMesh[] массив точек
 * @param container PIXI.Graphics облсть рисования
 * @param color string цвет линий в hex
 * @param width number толщина линий
 */
export const drawMeshes = (poiters: ICoordinatsMesh[], container: PIXI.Graphics, color: string, width: number = 1): void => {
    for (const point of poiters) {
        container.beginPath();
        container.moveTo(point.startX, point.startY);
        container.lineTo(point.endX, point.endY);
        if (point.endSX !== undefined && point.endSY !== undefined) {
            container.moveTo(point.startX, point.startY);
            container.lineTo(point.endSX, point.endSY);
        }
        container.stroke({
            width,
            color: hexToPixiColor(color)
        });
        container.closePath();
    }
};

/**
 * Отрисовать координаты на плоскости
 * @param container PIXI.Container
 * @param layout ILayoutSettings
 * @returns void
 */
export const drawCoordinats = (container: PIXI.Container, layout: ILayoutSettings): void => {
    // стиль текста для координат
    const style: PIXI.TextStyle = new PIXI.TextStyle({
        fontFamily: 'Montserrat',
        fontSize: layout.textSize,
        fill: layout.textColor
    });

    if (layout.type === 'default') {
        drawDefaultCoordinats(container, layout.width, layout.height, layout.horizontal, layout.vertical, style);
    } else if (layout.type === 'isometric') {
        drawIsometricCoordinats(container, layout.width, layout.height, layout.horizontal, layout.vertical, style);
    } else return;
};

/**
 * Отрисовать координаты для обычной плоскости
 * @param container PIXI.Container
 * @param width number ширина входящего контейнера
 * @param height number высота входящего контейнера
 * @param x number ширина обычной ячейки
 * @param y number высота обычной ячейки
 * @param style PIXI.TextStyle
 */
export const drawDefaultCoordinats = (container: PIXI.Container, width: number, height: number, x: number, y: number, style: PIXI.TextStyle): void => {
    const realNumberCellsVertical = Math.ceil(height / y);
    const partHorizont = -Math.ceil((width + SIDEBAR_WIDTH) / x / 2);
    const partVertical = Math.ceil(realNumberCellsVertical / 2);

    let indexX = 0;
    let indexY = 0;
    for (let i = 0; i < (width + SIDEBAR_WIDTH) / x; i++) {
        indexY = 0;
        for (let j = 0; j < realNumberCellsVertical; j++) {
            indexX = partHorizont + i === 0 ? 1 : indexX;
            indexY = partVertical - j === 0 ? 1 : indexY;

            const contentX = partHorizont + i + indexX;
            const contentY = partVertical - j - indexY;

            const text: PIXI.Text = new PIXI.Text({
                text: `${contentX}:${contentY}`,
                style
            });

            text.x = i * x + x / 2 - text.width / 2;
            text.y = j * y + y / 2 - text.height / 2;

            container.addChild(text);
        }
    }
};

/**
 * Отрисовать коодинаты для изометрической плоскости
 * @param container PIXI.Container
 * @param width number ширина входящего контейнера
 * @param height number высота входящего контейнера
 * @param x number ширина изометрической ячейки
 * @param y number высота изометрической ячейки
 * @param style PIXI.TextStyle
 */
export const drawIsometricCoordinats = (container: PIXI.Container, width: number, height: number, x: number, y: number, style: PIXI.TextStyle): void => {
    const realNumberCellsVertical = Math.ceil(height / y);
    const realNumberCellsHorizont = Math.ceil((width + SIDEBAR_WIDTH) / x);

    const items = [
        {
            textY: '',
            textX: '',
            sliceHorizontX: -1,
            sliceHorizontY: 1,
            sliceVerticalY: -1,
            sliceVerticalX: -1,
            sliceGlobalX: Math.ceil((width + SIDEBAR_WIDTH) / x / 2) * x,
            sliceGlobalY: Math.ceil(Math.ceil(height / y) / 2) * y - y / 2
        },
        {
            textY: '-',
            textX: '-',
            sliceHorizontX: 1,
            sliceHorizontY: -1,
            sliceVerticalY: 1,
            sliceVerticalX: 1,
            sliceGlobalX: Math.ceil((width + SIDEBAR_WIDTH) / x / 2) * x,
            sliceGlobalY: Math.ceil(Math.ceil(height / y) / 2) * y + y / 2
        },
        {
            textY: '',
            textX: '-',
            sliceHorizontX: 1,
            sliceHorizontY: 1,
            sliceVerticalY: -1,
            sliceVerticalX: 1,
            sliceGlobalX: Math.ceil((width + SIDEBAR_WIDTH) / x / 2) * x + x / 2,
            sliceGlobalY: Math.ceil(Math.ceil(height / y) / 2) * y
        },
        {
            textY: '-',
            textX: '',
            sliceHorizontX: -1,
            sliceHorizontY: -1,
            sliceVerticalY: 1,
            sliceVerticalX: -1,
            sliceGlobalX: Math.ceil((width + SIDEBAR_WIDTH) / x / 2) * x - x / 2,
            sliceGlobalY: Math.ceil(Math.ceil(height / y) / 2) * y
        }
    ];

    for (const os of items) {
        for (let i = 0; i < realNumberCellsHorizont; i++) {
            for (let j = 0; j < realNumberCellsVertical; j++) {
                const text: PIXI.Text = new PIXI.Text({
                    text: `${os.textY}${j + 1}:${os.textX}${i + 1}`,
                    style
                });

                const sliceVerticalX = (os.sliceVerticalX * (i * y)) / 2;
                const sliceVerticalY = (os.sliceVerticalY * (j * y)) / 2;
                const sliceHorizontX = (os.sliceHorizontX * (i * x)) / 2;
                const sliceHorizontY = (os.sliceHorizontY * (j * x)) / 2;

                const posX = os.sliceGlobalX + sliceHorizontX + sliceHorizontY - text.width / 2;
                const posY = os.sliceGlobalY + sliceVerticalY + sliceVerticalX - text.height / 2;

                if (posX > 0 && posX < width + SIDEBAR_WIDTH && posY > 0 && posY < height) {
                    text.x = posX;
                    text.y = posY;
                }

                container.addChild(text);
            }
        }
    }
};
