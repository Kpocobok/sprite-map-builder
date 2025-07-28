import {useEffect, useState, type ReactNode} from 'react';
import {Container} from './styles';
import PixiCanvas from '../../components/pixi-canvas';
import SideBar from './side-bar';
import {useSelector} from 'react-redux';
import {type IRootState, type ILayoutSettings} from '../../interfaces/store';
import {updateCollision, updateLayout} from '../../helpers/pixi';
import StatusBar from './status-bar';
import {type IConfig} from './interfaces';
import {DEFAULT_CONFIG} from './constants';

const SpriteEditor = (): ReactNode => {
    const [ready, setReady] = useState<boolean>(false);
    const [config, setConfig] = useState<IConfig>(DEFAULT_CONFIG);
    const layout = useSelector<IRootState, ILayoutSettings>((state) => state.app.layout);

    useEffect(() => {
        if (ready) {
            updateLayout(layout);
            updateCollision(config);
        }
    }, [layout, ready]);

    useEffect(() => {
        if (ready) updateCollision(config);
    }, [config, ready]);

    return (
        <Container>
            <PixiCanvas onReady={() => setReady(true)} />
            {/* Панель управления */}
            {ready ? <SideBar changeConfig={setConfig} config={config} /> : null}
            {/* Строка статуса курсора */}
            {ready ? <StatusBar /> : null}
        </Container>
    );
};

export default SpriteEditor;
