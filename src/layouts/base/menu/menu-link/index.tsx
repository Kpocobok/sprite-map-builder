import type { ReactNode } from 'react';
import type { IMenuRoute } from '../../../../interfaces/components';
import { Container, LinkIcon, LinkRoot, LinkText } from './styles';
import { Link } from 'react-router';

interface IMenuLinkProps {
  data: IMenuRoute;
  location: IMenuRoute;
}

const MenuLink = (props: IMenuLinkProps): ReactNode => {
  if (!props.data?.link) return null;

  const isActive = props.data.link === props.location.link;

  return (
    <Container $isActive={isActive && !props.data.event}>
      {props.data.event ? (
        <LinkRoot onClick={props.data.event}>
          <LinkIcon>{<props.data.icon />}</LinkIcon>
          <LinkText className="menu-hidden">{props.data.text}</LinkText>
        </LinkRoot>
      ) : (
        <LinkRoot>
          <Link to={props.data.link}>
            <LinkIcon>{<props.data.icon />}</LinkIcon>
            <LinkText className="menu-hidden">{props.data.text}</LinkText>
          </Link>
        </LinkRoot>
      )}
    </Container>
  );
};

export default MenuLink;
