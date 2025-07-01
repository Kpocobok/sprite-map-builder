import { useEffect, type ReactNode } from 'react';
import { Container } from './styles';
import PixiCanvas from '../../components/pixi-canvas';
import SideBar from './sidebar';
import { useSelector } from 'react-redux';
import { type IRootState, type ILayoutSettings } from '../../interfaces/store';
import { updateLayout } from '../../helpers/pixi';

const SpriteEditor = (): ReactNode => {
  const layout = useSelector<IRootState, ILayoutSettings>(
    (state) => state.app.layout,
  );

  useEffect(() => {
    updateLayout(layout);
  }, [layout]);

  return (
    <Container>
      <PixiCanvas />
      {/* <SideBar /> */}
    </Container>
  );
};

export default SpriteEditor;
