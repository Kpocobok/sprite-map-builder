import type { ReactNode } from 'react';
import type { IMenuRoute } from '../../interfaces/components';
import { Container, SideBar } from './styles';
import { useLocation } from 'react-router';
import { menu } from '../../constants/router';
import { find } from 'lodash';
import Menu from './menu';
import ModalRender from '../../components/modals';

interface IProps {
  children: React.ReactNode;
}

const BaseLayout = (props: IProps): ReactNode => {
  const location = useLocation();
  const locationItem: IMenuRoute =
    find(menu, {
      link: location.pathname,
    }) || menu[0];

  return (
    <Container>
      <ModalRender />
      <SideBar>
        <Menu location={locationItem} />
      </SideBar>
      <Container>{props.children}</Container>
    </Container>
  );
};

export default BaseLayout;
