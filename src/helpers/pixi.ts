import * as PIXI from 'pixi.js';
import type { ILayoutSettings } from '../interfaces/store';
import {
  DEFAULT_MESH_ID,
  DEFAULT_BG_ID,
  DEFAULT_LAYERS_ID,
  DEFAULT_TOPSTAGE_ID,
  SIDEBAR_WIDTH,
} from '../constants/default';
import { hexToPixiColor } from './utils';

export interface ICoordinats {
  x: number;
  y: number;
}

/**
 * Регистрация контейнеров в карте
 * @param id уникальный идентификатор контейнера
 * @param container контейнер для регистрации
 * @returns void
 */
export const registerContainer = (
  id: string,
  container: PIXI.Container,
): void => {
  if (!window.ApiCanvasPixiContainerRegister) return;

  const isset: PIXI.Container | undefined =
    window.ApiCanvasPixiContainerRegister.get(id);

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

  window.ApiCanvasPixi.screen.width = layout.width + SIDEBAR_WIDTH;
  window.ApiCanvasPixi.screen.height = layout.height;

  const meshContainer: PIXI.Container =
    window.ApiCanvasPixiContainerRegister.get(
      DEFAULT_MESH_ID,
    ) as PIXI.Container;

  meshContainer.children = [];

  const mesh: PIXI.Graphics = new PIXI.Graphics();
  const coordinats: PIXI.Container = new PIXI.Container();
  const oses: PIXI.Graphics = new PIXI.Graphics();
  coordinats.width = layout.width + SIDEBAR_WIDTH;
  coordinats.height = layout.height;
  // высчитываем углы изометрической клетки
  const partHorizont = layout.horizontal / 2;
  const partVertical = layout.vertical / 2;
  const radAlpha = Math.atan(partHorizont / partVertical);
  const radBetta = (90 - radAlpha * (180 / Math.PI)) * (Math.PI / 180);

  // чтобы полностью заполнить контейнер надо его длину увеличить до тех пор пока видимая область не будет внутри треугольника
  // если верхнее ребро рабочей область больше бокового
  let width = layout.width + SIDEBAR_WIDTH;
  let height = layout.height;
  let widthMax = width * Math.tan(radBetta);
  let heightMax = height * Math.tan(radAlpha);
  // приведем все к равнобедренном прямоугольному треугольнику, где плоскость будет внутри этого треугольника
  width = height = widthMax >= heightMax ? widthMax * 2 : heightMax * 2;

  const numberCellsHorizont: number = Math.ceil(
    (layout.width + SIDEBAR_WIDTH) / layout.horizontal,
  );
  const numberCellsVertical: number = Math.ceil(
    layout.height / (layout.vertical / 2),
  );
  const numberFullCellsHorizon: number = Math.ceil(width / layout.horizontal);
  const numberFullCellsVertical: number = Math.ceil(
    height / (layout.vertical / 2),
  );

  if (layout.showMesh) {
    if (layout.type === 'isometric') {
      for (let x = 0; x < numberFullCellsHorizon; x++) {
        // находим точку X конечную из точки XY:00
        const X = layout.height * Math.tan(radAlpha);

        const fromX =
          x < numberCellsHorizont
            ? x * layout.horizontal
            : layout.width + SIDEBAR_WIDTH;
        const fromY =
          x < numberCellsHorizont
            ? 0
            : (x * layout.horizontal - layout.width + SIDEBAR_WIDTH) *
              Math.tan(radBetta);

        const lineToX =
          X + x * layout.horizontal >= layout.width + SIDEBAR_WIDTH
            ? layout.width + SIDEBAR_WIDTH
            : X + x * layout.horizontal;

        const lineToY =
          X + x * layout.horizontal >= layout.width + SIDEBAR_WIDTH
            ? (layout.width + SIDEBAR_WIDTH - layout.horizontal * x) *
              Math.tan(radBetta)
            : layout.height;

        if (
          lineToX <= layout.width + SIDEBAR_WIDTH &&
          lineToY <= layout.height &&
          fromX <= layout.width + SIDEBAR_WIDTH &&
          fromY <= layout.height
        ) {
          mesh.beginPath();
          mesh.moveTo(fromX, fromY);
          // чертим линию сетки
          mesh.lineTo(lineToX, lineToY);
          mesh.stroke({
            width: layout.meshWidth,
            color: hexToPixiColor(layout.meshColor),
          });
          mesh.closePath();
        }

        const Y = x * layout.horizontal * Math.tan(radBetta);
        const XOffset = layout.width + SIDEBAR_WIDTH - x * layout.horizontal;

        const overLineToX =
          Y > layout.height
            ? layout.width +
              SIDEBAR_WIDTH -
              layout.height * Math.tan(radAlpha) -
              XOffset
            : 0;
        const overLineToY = Y > layout.height ? layout.height : Y;

        if (
          overLineToX <= layout.width + SIDEBAR_WIDTH &&
          overLineToY <= layout.height &&
          fromX <= layout.width + SIDEBAR_WIDTH &&
          fromY <= layout.height
        ) {
          mesh.beginPath();
          mesh.moveTo(fromX, fromY);
          // чертим линию сетки
          mesh.lineTo(overLineToX, overLineToY);
          mesh.stroke({
            width: layout.meshWidth,
            color: hexToPixiColor(layout.meshColor),
          });
          mesh.closePath();
        }
      }

      for (let x = 0; x <= numberFullCellsVertical; x++) {
        // находим точку X конечную из точки XY:00
        const X =
          (layout.height - layout.vertical * x - layout.vertical) *
          Math.tan(radAlpha);

        // линия сетки от левого ребра плоскости
        const lineToX =
          X >= layout.width + SIDEBAR_WIDTH ? layout.width + SIDEBAR_WIDTH : X;
        const lineToY =
          X >= layout.width + SIDEBAR_WIDTH
            ? x * layout.vertical +
              (layout.width + SIDEBAR_WIDTH) * Math.tan(radBetta) +
              layout.vertical
            : layout.height;

        mesh.beginPath();
        // стартовая точка с учетом сдвига изометрической ячейки на половины высоты ячейки
        mesh.moveTo(0, layout.vertical + x * layout.vertical);
        mesh.lineTo(lineToX, lineToY);
        mesh.stroke({
          width: layout.meshWidth,
          color: hexToPixiColor(layout.meshColor),
        });
        mesh.closePath();
      }
    } else if (layout.type === 'default') {
      for (let x = 0; x < numberCellsHorizont; x++) {
        mesh.beginPath();
        mesh.moveTo(x * layout.horizontal, 0);
        mesh.lineTo(x * layout.horizontal, layout.height);
        mesh.stroke({
          width: layout.meshWidth,
          color: hexToPixiColor(layout.meshColor),
        });
        mesh.closePath();
        mesh.moveTo(x * layout.horizontal, 0);
      }

      for (let x = 0; x < numberCellsVertical; x++) {
        mesh.beginPath();
        mesh.moveTo(0, x * layout.vertical);
        mesh.lineTo(layout.width + SIDEBAR_WIDTH, x * layout.vertical);
        mesh.stroke({
          width: layout.meshWidth,
          color: hexToPixiColor(layout.meshColor),
        });
        mesh.closePath();
        mesh.moveTo(0, x * layout.vertical);
      }
    } else return;
  }

  if (layout.showOs) {
    if (layout.type === 'default') {
      const middleX = Math.ceil(numberCellsHorizont / 2) * layout.horizontal;
      const middleY =
        Math.ceil(Math.ceil(layout.height / layout.vertical) / 2) *
        layout.vertical;
      // Y
      oses.beginPath();
      oses.moveTo(middleX, 0);
      oses.lineTo(middleX, layout.height);
      oses.stroke({
        width: layout.osWidth,
        color: hexToPixiColor(layout.osColor),
      });
      oses.closePath();
      // X
      oses.beginPath();
      oses.moveTo(0, middleY);
      oses.lineTo(layout.width + SIDEBAR_WIDTH, middleY);
      oses.stroke({
        width: layout.osWidth,
        color: hexToPixiColor(layout.osColor),
      });
      oses.closePath();
      // рисуем оси для изометрии
    } else if (layout.type === 'isometric') {
      // рисуем обычные оси
    } else return;
  }

  if (layout.showText) {
    if (layout.type === 'default') {
      const realNumberCellsVertical = Math.ceil(
        layout.height / layout.vertical,
      );
      const partHorizont = -Math.ceil(numberCellsHorizont / 2);
      const partVertical = Math.ceil(realNumberCellsVertical / 2);

      let indexX = 0;
      let indexY = 0;
      for (let x = 0; x < numberCellsHorizont; x++) {
        indexY = 0;
        for (let y = 0; y < realNumberCellsVertical; y++) {
          const style: PIXI.TextStyle = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: layout.textSize,
            fill: layout.textColor,
          });

          indexX = partHorizont + x === 0 ? 1 : indexX;
          indexY = partVertical - y === 0 ? 1 : indexY;

          const contentX = partHorizont + x + indexX;
          const contentY = partVertical - y - indexY;

          const text: PIXI.Text = new PIXI.Text({
            text: `${contentX}:${contentY}`,
            style,
          });

          text.x =
            x * layout.horizontal + layout.horizontal / 2 - text.width / 2;
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
export const convertCoordsFromNativeToISO = (
  x: number,
  y: number,
  layout: ILayoutSettings,
): ICoordinats => {
  return {
    x: (x - y) * (layout.horizontal / 2),
    y: (x + y) * (layout.vertical / 2),
  };
};
