import type { ReactNode } from 'react';
import {
  Container,
  MContainer,
  BContainer,
  FContainer,
  HContainer,
  Title,
} from './styles';
import IconClose from '../icons/IconClose';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/app';
import Button from '../button';

interface IChildren {
  children?: ReactNode;
}

interface IModalContainer extends IChildren {
  width?: string;
}

const Modal = (props: IChildren): ReactNode => {
  return <Container>{props.children}</Container>;
};

export const ModalContainer = (props: IModalContainer): ReactNode => {
  return <MContainer $width={props.width}>{props.children}</MContainer>;
};

export const ModalHeader = (props: IChildren): ReactNode => {
  const dispatch = useDispatch();

  return (
    <HContainer>
      <Title>{props.children}</Title>
      <Button
        $radius="100%"
        $padding="8px"
        onClick={() => dispatch(closeModal())}
      >
        <IconClose />
      </Button>
    </HContainer>
  );
};

export const ModalBody = (props: IChildren): ReactNode => {
  return <BContainer>{props.children}</BContainer>;
};

export const ModalFooter = (props: IChildren): ReactNode => {
  return <FContainer>{props.children}</FContainer>;
};

export default Modal;
