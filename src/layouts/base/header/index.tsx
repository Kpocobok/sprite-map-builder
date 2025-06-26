import type { ReactNode } from 'react';
import { Container } from './styles';
import type { IMenuHeaderLocation } from '../../../interfaces/components';

const Header = (props: IMenuHeaderLocation): ReactNode => {
  return <Container>{props.location.text}</Container>;
};

export default Header;
