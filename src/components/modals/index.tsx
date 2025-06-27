import { useSelector } from 'react-redux';
import { type IModal, type IRootState } from '../../interfaces/store';
import type { ReactNode } from 'react';
import { MESH_SETTINGS } from '../../constants/modals';
import MeshSettings from './mesh-settings';

const ModalRender = (): ReactNode | null => {
  const modal = useSelector<IRootState, IModal[]>((state) => state.app.modals);

  if (!modal.length) return null;

  const currentModal: IModal = modal[0];

  switch (currentModal.key) {
    case MESH_SETTINGS:
      return <MeshSettings {...currentModal.data} />;
    default:
      return null;
  }
};

export default ModalRender;
