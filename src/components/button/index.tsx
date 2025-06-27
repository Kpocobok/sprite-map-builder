import type { ReactNode } from 'react';
import { Container } from './styles';

interface IButton {
  children: ReactNode;
}

const Button = (props: IButton): ReactNode => {
  return <Container>{props.children}</Container>;
};

export default Button;
