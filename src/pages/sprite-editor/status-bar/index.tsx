import {useEffect, useState} from 'react';
import {Container, Content, StatusBox, Title, Value} from './styles';
import {getRealCoordinatsFromCommon} from '../../../helpers/pixi-common-methods';
import type {IStatusCoordinats} from '../../../helpers/pixi-interface';
import {useSelector} from 'react-redux';
import type {IRootState, ILayoutSettings} from '../../../interfaces/store';

const StatusBar = () => {
    const config = useSelector<IRootState, ILayoutSettings>((state) => state.app.layout);
    const [status, setStatus] = useState<IStatusCoordinats | null>(null);

    useEffect(() => {
        const canvas = window.ApiCanvasPixi?.renderer.canvas;
        if (canvas) {
            canvas.addEventListener('mousemove', handleMouseMove);
        }
    }, [window.ApiCanvasPixi?.renderer.canvas]);

    const handleMouseMove = (e: MouseEvent) => setStatus(getRealCoordinatsFromCommon(e.clientX, e.clientY));

    return (
        <Container>
            <Content>
                <StatusBox>
                    <Title>Реал X:</Title>
                    <Value>{status?.baseX}</Value>
                </StatusBox>
                <StatusBox>
                    <Title>Реал X:</Title>
                    <Value>{status?.baseY}</Value>
                </StatusBox>
                <StatusBox>
                    <Title>Поле X:</Title>
                    <Value>{status?.x}</Value>
                </StatusBox>
                <StatusBox>
                    <Title>Поле Y:</Title>
                    <Value>{status?.y}</Value>
                </StatusBox>
                <StatusBox>
                    <Title>Сетка X:</Title>
                    <Value>{config.type === 'default' ? status?.tileX : status?.isoX}</Value>
                </StatusBox>
                <StatusBox>
                    <Title>Сетка Y:</Title>
                    <Value>{config.type === 'default' ? status?.tileY : status?.isoY}</Value>
                </StatusBox>
                <StatusBox>
                    <Title>Ширина:</Title>
                    <Value>{config.width}</Value>
                </StatusBox>
                <StatusBox>
                    <Title>Высота:</Title>
                    <Value>{config.height}</Value>
                </StatusBox>
            </Content>
        </Container>
    );
};

export default StatusBar;
