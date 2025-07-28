import {useEffect, useRef, type ReactNode} from 'react';
import {Application} from 'pixi.js';
import {Box} from './styles';
import {hexToPixiColor} from '../../helpers/utils';
import {DEFAULT_PIXI_APPLICATION_SIZE, DEFAULT_PIXI_APPLICATION_BG} from '../../constants/default';
import {useSelector} from 'react-redux';
import {type IRootState, type ILayoutSettings} from '../../interfaces/store';
import {createDefaultContainers, createLayout, updateLayout} from '../../helpers/pixi';

interface IPixiCanvas {
    onReady?: () => void;
    onDestroy?: () => void;
}

const PixiCanvas = (props: IPixiCanvas): ReactNode => {
    const layout = useSelector<IRootState, ILayoutSettings>((state) => state.app.layout);
    const canvasRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application | null>(null);

    useEffect(() => {
        let destroyed: boolean = false;

        (async () => {
            if (!canvasRef.current || appRef.current) return;

            const app = new Application();

            await app.init({
                width: DEFAULT_PIXI_APPLICATION_SIZE.width,
                height: DEFAULT_PIXI_APPLICATION_SIZE.height,
                resizeTo: window,
                backgroundColor: hexToPixiColor(DEFAULT_PIXI_APPLICATION_BG)
            });

            if (destroyed) {
                app.destroy(true);
                return;
            }

            app.stage.eventMode = 'static';
            app.stage.hitArea = app.screen;

            canvasRef.current.appendChild(app.canvas);
            appRef.current = app;

            window.ApiCanvasPixi = app;

            createDefaultContainers();
            createLayout();
            // updateLayout(layout);

            if (props.onReady) {
                props.onReady();
            }
        })();

        return () => {
            destroyed = true;
            window.ApiCanvasPixi = null;
            if (appRef.current) {
                appRef.current.destroy(true, {children: true});
                appRef.current = null;
            }

            if (props.onDestroy) {
                props.onDestroy();
            }
        };
    }, []);

    return <Box ref={canvasRef} />;
};

export default PixiCanvas;
