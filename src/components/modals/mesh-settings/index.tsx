import type { ReactNode } from 'react';
import Modal, {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from '../../modal';
import Button from '../../button';

const MeshSettings = (): ReactNode => {
  return (
    <Modal>
      <ModalContainer>
        <ModalHeader>Настройка сетки</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button>Отмена</Button>
          <Button>Сохранить</Button>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default MeshSettings;
