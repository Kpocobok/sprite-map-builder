import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container } from './styles';
import type {
  IMenuHeaderLocation,
  IMenuRoute,
} from '../../../interfaces/components';
import { menu } from '../../../constants/router';
import MenuLink from './menu-link';

const Menu = (props: IMenuHeaderLocation): ReactNode => {
  return (
    <Container>
      {menu.map((menuItem: IMenuRoute) => {
        return (
          <MenuLink key={uuidv4()} data={menuItem} location={props.location} />
        );
      })}
    </Container>
  );
};

export default Menu;
