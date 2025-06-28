import { Container, Graphics } from 'pixi.js';
import type { ILayoutSettings } from '../interfaces/store';
import {
  DEFAULT_MESH_ID,
  DEFAULT_BG_ID,
  DEFAULT_LAYERS_ID,
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
export const registerContainer = (id: string, container: Container): void => {
  if (!window.ApiCanvasPixiContainerRegister) return;

  const isset: Container | undefined =
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

  const meshContainer: Container = new Container();
  const backgroundContainer: Container = new Container();
  const layersContainer: Container = new Container();

  window.ApiCanvasPixi.stage.addChild(backgroundContainer);
  window.ApiCanvasPixi.stage.addChild(meshContainer);
  window.ApiCanvasPixi.stage.addChild(layersContainer);

  registerContainer(DEFAULT_MESH_ID, backgroundContainer);
  registerContainer(DEFAULT_BG_ID, meshContainer);
  registerContainer(DEFAULT_LAYERS_ID, layersContainer);

  return;
};

/**
 * Обновить размеры и сетку поля
 * @param layout ILayoutSettings
 * @returns void
 */
export const updateLayout = (layout: ILayoutSettings): void => {
  if (!window.ApiCanvasPixi || !window.ApiCanvasPixiContainerRegister) return;

  window.ApiCanvasPixi.stage.width = layout.width;
  window.ApiCanvasPixi.stage.height = layout.height;

  const meshContainer: Container = window.ApiCanvasPixiContainerRegister.get(
    DEFAULT_MESH_ID,
  ) as Container;

  meshContainer.children = [];

  const mesh: Graphics = new Graphics();
  const numberCellsHorizont: number = Math.ceil(
    layout.width / layout.horizontal,
  );
  const numberCellsVertical: number = Math.ceil(
    layout.height / layout.vertical,
  );

  const radians = Math.atan(
    Math.min(layout.vertical / 2, layout.horizontal / 2) /
      Math.max(layout.vertical / 2, layout.horizontal / 2),
  );
  const startPoint = layout.height * Math.tan(radians);

  for (let x = 0; x < numberCellsHorizont; x++) {
    mesh.moveTo(x * layout.horizontal, 0);
    mesh.lineTo(startPoint + x * layout.horizontal, layout.height);

    // mesh.moveTo(x * layout.horizontal, 0);
    // mesh.lineTo(-startPoint + x * layout.horizontal, layout.height);

    // mesh.moveTo(x * layout.horizontal, layout.height);
    // mesh.lineTo(startPoint + x * layout.horizontal, 0);
  }

  // mesh.x = window.ApiCanvasPixi.screen.width / 2;

  mesh.stroke({ width: 1, color: hexToPixiColor('#000000') });

  meshContainer.addChild(mesh);

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
