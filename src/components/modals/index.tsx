import {useSelector} from 'react-redux';
import {type IModal, type IRootState} from '../../interfaces/store';
import type {ReactNode} from 'react';
import {ADD_IMAGE, MESH_SETTINGS} from '../../constants/modals';
import LayoutSettings from './layout-settings';
import AddImage from './add-image';

const ModalRender = (): ReactNode | null => {
    const modal = useSelector<IRootState, IModal[]>((state) => state.app.modals);

    if (!modal.length) return null;

    const currentModal: IModal = modal[0];

    switch (currentModal.key) {
        case MESH_SETTINGS:
            return <LayoutSettings {...currentModal.data} />;
        case ADD_IMAGE:
            return <AddImage {...currentModal.data} />;
        default:
            return null;
    }
};

export default ModalRender;
