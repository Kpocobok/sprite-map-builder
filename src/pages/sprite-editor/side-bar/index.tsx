import {useState, type ReactNode} from 'react';
import {ButtonContent, Container, ControllPanel, Icon, Section, SectionButtons, SectionTitle} from './styles';
import IconObjectGroup from '../../../components/icons/IconObjectGroup';
import {useDispatch, useSelector} from 'react-redux';
import {setLayout, setModal} from '../../../store/slices/app';
import {MESH_SETTINGS} from '../../../constants/modals';
import Button from '../../../components/button';
import IconArrowToDot from '../../../components/icons/IconArrowToDot';
import {moveCenter} from '../../../helpers/pixi';
import Checkbox from '../../../components/checkbox';
import type {IRootState, ILayoutSettings} from '../../../interfaces/store';
import InputNumber from '../../../components/input-number';
import InputColor from '../../../components/input-color';
import type {IConfig} from '../interfaces';
import {DEFAULT_CONFIG} from '../constants';
import * as PIXI from 'pixi.js';

interface ISideBar {
    bg?: PIXI.Container;
}

const SideBar = (props: ISideBar): ReactNode => {
    const dispatch = useDispatch();
    const [config, setConfig] = useState<IConfig>(DEFAULT_CONFIG);
    const layout = useSelector<IRootState, ILayoutSettings>((state) => state.app.layout);

    const handleShowMeshModal = () => dispatch(setModal({key: MESH_SETTINGS}));

    const handleShowMesh = () => dispatch(setLayout({...layout, showMesh: !layout.showMesh}));

    const handleShowCoordinats = () => dispatch(setLayout({...layout, showText: !layout.showText}));

    const handleShowIsoOS = () => dispatch(setLayout({...layout, showOs: !layout.showOs}));

    const handleCenterSpace = () => moveCenter();

    const handleChangeConfig = (value: string, field: keyof IConfig) => {
        setConfig({...config, [field]: value});
    };

    return (
        <Container>
            <ControllPanel>
                <Section>
                    <SectionTitle>- Настройка колизии</SectionTitle>
                    <SectionButtons>
                        <InputNumber value={config.collisionX} onChange={(value: string) => handleChangeConfig(value, 'collisionX')} label='Ось Х' />
                        <InputNumber value={config.collisionY} onChange={(value: string) => handleChangeConfig(value, 'collisionY')} label='Ось Y' />
                        <InputNumber value={config.collisionWeight} onChange={(value: string) => handleChangeConfig(value, 'collisionWeight')} label='Толщина линии' />
                        <InputColor value={config.collisionLineColor} onChange={(value: string) => handleChangeConfig(value, 'collisionLineColor')} label='Цвет координат' />
                    </SectionButtons>
                </Section>
                <Section>
                    <SectionTitle>- Основные настройки</SectionTitle>
                    <SectionButtons>
                        <Checkbox value={Boolean(layout.showOs)} onChange={handleShowIsoOS} label='Показывать оси' />
                        <Checkbox value={Boolean(layout.showMesh)} onChange={handleShowMesh} label='Показывать сетку' />
                        {layout.horizontal > 63 && layout.vertical > 31 ? <Checkbox value={Boolean(layout.showText)} onChange={handleShowCoordinats} label='Координаты' /> : null}
                    </SectionButtons>
                    <SectionButtons>
                        <Button onClick={handleShowMeshModal}>
                            <Icon>
                                <IconObjectGroup />
                            </Icon>
                            <ButtonContent>Настройка поля</ButtonContent>
                        </Button>
                        <Button onClick={handleCenterSpace}>
                            <Icon>
                                <IconArrowToDot />
                            </Icon>
                            <ButtonContent>Отцентровать вид</ButtonContent>
                        </Button>
                    </SectionButtons>
                </Section>
            </ControllPanel>
        </Container>
    );
};

export default SideBar;
