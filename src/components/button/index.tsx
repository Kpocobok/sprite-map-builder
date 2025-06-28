import type { ReactNode } from 'react';
import { Container } from './styles';

interface IButton {
  $radius?: string;
  $padding?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Button = (props: IButton): ReactNode => {
  return (
    <Container
      $radius={props.$radius}
      $padding={props.$padding}
      onClick={props.onClick}
    >
      {props.children}
    </Container>
  );
};

export default Button;
