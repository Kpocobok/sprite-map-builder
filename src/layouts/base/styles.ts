import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const SideBar = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  overflow: hidden;
  transform: translateY(-50%);
  background: var(--primary-color);
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  z-index: 1;
  font-size: 14px;
  &:hover {
    .menu-hidden {
      display: block;
    }
  }
`;
