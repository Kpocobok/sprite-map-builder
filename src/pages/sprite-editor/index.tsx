import type { ReactNode } from 'react';
import { Container } from './styles';
import PixiCanvas from '../../components/pixi-canvas';

const SpriteEditor = (): ReactNode => {
  return (
    <Container>
      <PixiCanvas />
    </Container>
  );
};

export default SpriteEditor;
