import type { ReactNode } from 'react';

export interface IMenuHeaderLocation {
  location: IMenuRoute;
}

export interface IMenuRoute {
  id: number;
  text: string;
  link?: string;
  show?: boolean;
  homepage?: boolean;
  icon: () => ReactNode;
  component?: () => ReactNode;
  event?: () => void;
}
