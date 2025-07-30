import {useDispatch} from 'react-redux';
import Button from '../../button';
import Modal, {ModalBody, ModalContainer, ModalFooter, ModalHeader} from '../../modal';
import {closeModal} from '../../../store/slices/app';
import type {ReactNode} from 'react';
import ImageDropper from '../../image-dropper';

const AddImage = (): ReactNode => {
    const dispatch = useDispatch();

    const handleSaveImage = () => {};

    return (
        <Modal>
            <ModalContainer>
                <ModalHeader>Добавить изображение</ModalHeader>
                <ModalBody>
                    <ImageDropper />
                </ModalBody>
                <ModalFooter>
                    <Button $padding='8px 16px' $radius='16px' onClick={() => dispatch(closeModal())}>
                        Отмена
                    </Button>
                    <Button $padding='8px 16px' $radius='16px' onClick={handleSaveImage}>
                        Сохранить
                    </Button>
                </ModalFooter>
            </ModalContainer>
        </Modal>
    );
};

export default AddImage;
