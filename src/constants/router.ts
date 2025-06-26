import IconHouse from '../components/icons/IconHouse';
import type { IMenuRoute } from '../interfaces/components';
import Home from '../pages/home';

export const menu: IMenuRoute[] = [
  {
    id: 0,
    link: '/',
    icon: IconHouse,
    text: 'Главная',
    show: true,
    component: Home,
    homepage: true,
  },
];
