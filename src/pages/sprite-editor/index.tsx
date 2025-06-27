import type { ReactNode } from 'react';
import { Container } from './styles';
import PixiCanvas from '../../components/pixi-canvas';
import SideBar from './sidebar';

const SpriteEditor = (): ReactNode => {
  return (
    <Container>
      <PixiCanvas />
      <SideBar />
    </Container>
  );
};

export default SpriteEditor;
