import type { store } from '../store';

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
  modals: IModal[];
}

export type IRootState = ReturnType<typeof store.getState>;
