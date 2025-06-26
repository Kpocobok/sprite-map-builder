import IconCompassDrafting from '../components/icons/IconCompassDrafting';
import IconHouse from '../components/icons/IconHouse';
import IconPaperPlane from '../components/icons/IconPaperPlane';
import type { IMenuRoute } from '../interfaces/components';
import Home from '../pages/home';
import MapEditor from '../pages/map-editor';
import SpriteEditor from '../pages/sprite-editor';

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
  {
    id: 1,
    link: '/sprite-editor',
    icon: IconCompassDrafting,
    text: 'Редактор спрайтов',
    show: true,
    component: SpriteEditor,
    homepage: false,
  },
  {
    id: 2,
    link: '/map-editor',
    icon: IconPaperPlane,
    text: 'Редактор карт',
    show: true,
    component: MapEditor,
    homepage: false,
  },
];
