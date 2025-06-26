import { useEffect, useRef, type ReactNode } from 'react';
import { Application } from 'pixi.js';
import { Container } from './styles';
import { hexToPixiColor } from '../../helpers/utils';

const PixiCanvas = (): ReactNode => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    let destroyed: boolean = false;

    (async () => {
      if (!canvasRef.current || appRef.current) return;

      const app = new Application();

      await app.init({
        width: 800,
        height: 600,
        resizeTo: window,
        backgroundColor: hexToPixiColor('#f5f5f5'),
      });

      if (destroyed) {
        app.destroy(true);
        return;
      }

      canvasRef.current.appendChild(app.canvas);
      appRef.current = app;

      window.ApiCanvasPixi = app;
    })();

    return () => {
      destroyed = true;
      window.ApiCanvasPixi = null;
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  return <Container ref={canvasRef} />;
};

export default PixiCanvas;
