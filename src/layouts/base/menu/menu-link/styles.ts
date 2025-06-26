import styled from 'styled-components';

interface IContainer {
  isActive?: boolean;
}

export const Container = styled.div<IContainer>`
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.3s linear;
  border-radius: 12px;
  overflow: hidden;
  background: ${(props) => {
    return props.isActive ? `var(--primary-color-light)` : `transparent`;
  }};
  &:hover {
    background: var(--primary-color-light);
  }
`;

export const LinkRoot = styled.div`
  a {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    color: var(--background-box);
    text-decoration: none;
    align-items: center;
  }
`;

export const LinkIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkText = styled.div`
  display: none;
  padding-right: 12px;
`;
