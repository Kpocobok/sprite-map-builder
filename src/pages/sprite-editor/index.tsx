import {useEffect, useRef, type ReactNode} from 'react';
import {Container} from './styles';
import PixiCanvas from '../../components/pixi-canvas';
import SideBar from './side-bar';
import {useSelector} from 'react-redux';
import {type IRootState, type ILayoutSettings} from '../../interfaces/store';
import {updateLayout} from '../../helpers/pixi';
import StatusBar from './status-bar';

const SpriteEditor = (): ReactNode => {
    const parent = useRef<HTMLDivElement | null>(null);
    const layout = useSelector<IRootState, ILayoutSettings>((state) => state.app.layout);

    useEffect(() => {
        updateLayout(layout);
    }, [layout]);

    return (
        <Container ref={parent}>
            <PixiCanvas />
            <SideBar />
            <StatusBar container={parent} />
        </Container>
    );
};

export default SpriteEditor;
