import type { store } from '../store';

export type MESH_TYPES = 'default' | 'isometric';

export interface ILayoutSettings {
  type: MESH_TYPES;
  horizontal: number;
  vertical: number;
  width: number;
  height: number;
}

export interface IModal {
  key: string;
  data?: {
    [key: string]:
      | string
      | number
      | string[]
      | number[]
      | { [key: string]: string }
      | { [key: string]: string }[];
  };
}

export interface IInitStateApp {
  loading: boolean;
  layout: ILayoutSettings;
  modals: IModal[];
}

export type IRootState = ReturnType<typeof store.getState>;
