import {type ReactNode} from 'react';
import {ButtonContent, Container, ControllPanel, Icon, Section, SectionButtons, SectionLine, SectionTitle} from './styles';
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

interface ISideBar {
    config: IConfig;
    changeConfig: (config: IConfig) => void;
}

const SideBar = (props: ISideBar): ReactNode => {
    const dispatch = useDispatch();
    const layout = useSelector<IRootState, ILayoutSettings>((state) => state.app.layout);

    const handleCenterSpace = () => moveCenter();

    const handleShowMeshModal = () => dispatch(setModal({key: MESH_SETTINGS}));

    const handleChangeField = (field: keyof ILayoutSettings, value: any) => dispatch(setLayout({...layout, [field]: value}));

    const handleChangeConfig = (field: keyof IConfig, value: string) => props.changeConfig({...props.config, [field]: value});

    return (
        <Container>
            <ControllPanel>
                <Section>
                    <SectionTitle>- Настройка спрайта</SectionTitle>
                    <SectionLine>
                        <Button onClick={handleShowMeshModal} center>
                            <Icon>
                                <IconObjectGroup />
                            </Icon>
                            <ButtonContent>Добавить изображение</ButtonContent>
                        </Button>
                    </SectionLine>
                </Section>
                <Section>
                    <SectionTitle>- Настройка колизии</SectionTitle>
                    <SectionButtons>
                        <InputNumber value={props.config.collisionX} onChange={(value: string) => handleChangeConfig('collisionX', value)} label='Ось Х' />
                        <InputNumber value={props.config.collisionY} onChange={(value: string) => handleChangeConfig('collisionY', value)} label='Ось Y' />
                        <InputNumber value={props.config.collisionWeight} onChange={(value: string) => handleChangeConfig('collisionWeight', value)} label='Толщина линии' />
                        <InputColor value={props.config.collisionLineColor} onChange={(value: string) => handleChangeConfig('collisionLineColor', value)} label='Цвет координат' />
                    </SectionButtons>
                </Section>
                <Section>
                    <SectionTitle>- Основные настройки</SectionTitle>
                    <SectionButtons>
                        <Checkbox value={Boolean(layout.showOs)} onChange={() => handleChangeField('showOs', !layout.showOs)} label='Показывать оси' />
                        {layout.showOs && layout.type === 'isometric' ? (
                            <Checkbox value={Boolean(layout.showStandartOs)} onChange={() => handleChangeField('showStandartOs', !layout.showStandartOs)} label='Стандартные оси' />
                        ) : null}
                        <Checkbox value={Boolean(layout.showMesh)} onChange={() => handleChangeField('showMesh', !layout.showMesh)} label='Показывать сетку' />
                        {layout.horizontal > 63 && layout.vertical > 31 ? (
                            <Checkbox value={Boolean(layout.showText)} onChange={() => handleChangeField('showText', !layout.showText)} label='Координаты' />
                        ) : null}
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
