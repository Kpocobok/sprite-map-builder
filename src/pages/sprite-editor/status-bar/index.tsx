import {useEffect, useState, type RefObject} from 'react';
import {Container, Content, StatusBox, Title, Value} from './styles';
import {getRealCoordinatsFromCommon} from '../../../helpers/pixi-common-methods';
import type {IStatusCoordinats} from '../../../helpers/pixi-interface';
import {useSelector} from 'react-redux';
import type {IRootState, ILayoutSettings} from '../../../interfaces/store';

interface IStatusBar {
    container?: RefObject<HTMLDivElement | null>;
}

const StatusBar = (props: IStatusBar) => {
    const config = useSelector<IRootState, ILayoutSettings>((state) => state.app.layout);
    const [status, setStatus] = useState<IStatusCoordinats | null>(null);

    useEffect(() => {
        if (props.container?.current) {
            props.container.current.addEventListener('mousemove', handleMouseMove);
        }
    }, [props.container]);

    const handleMouseMove = (e: MouseEvent) => setStatus(getRealCoordinatsFromCommon(e.clientX, e.clientY));

    return (
        <Container>
            <Content>
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
            </Content>
        </Container>
    );
};

export default StatusBar;
