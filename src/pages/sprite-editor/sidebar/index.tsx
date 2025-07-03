import type {ReactNode} from 'react';
import {ButtonContent, Container, ControllPanel, Icon, SectionButtons} from './styles';
import IconObjectGroup from '../../../components/icons/IconObjectGroup';
import IconSettings from '../../../components/icons/IconSettings';
import {useDispatch} from 'react-redux';
import {setModal} from '../../../store/slices/app';
import {MESH_SETTINGS} from '../../../constants/modals';
import Button from '../../../components/button';

const SideBar = (): ReactNode => {
    const dispatch = useDispatch();

    const handleShowMeshModal = () => dispatch(setModal({key: MESH_SETTINGS}));
    // TODO: Добавить галочки показать os, показать координаты, показать сетку

    return (
        <Container>
            <ControllPanel>
                <SectionButtons>
                    <Button onClick={handleShowMeshModal}>
                        <Icon>
                            <IconObjectGroup />
                        </Icon>
                        <ButtonContent>Настройка поля</ButtonContent>
                    </Button>
                    <Button>
                        <Icon>
                            <IconSettings />
                        </Icon>
                        <ButtonContent>Настройка поля</ButtonContent>
                    </Button>
                </SectionButtons>
            </ControllPanel>
        </Container>
    );
};

export default SideBar;
