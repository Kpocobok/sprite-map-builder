import styled from 'styled-components';
import { DEFAULT_MODAL_WIDTH } from '../../constants/modals';
import { hexToRgba } from '../../helpers/utils';

interface IMContainer {
  $width?: string;
}

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: ${hexToRgba('#000000', 0.36)};
`;

export const MContainer = styled.div<IMContainer>`
  box-shadow: 0 0 10px #000;
  overflow: hidden;
  border-radius: 4px;
  background: var(--background-box);
  width: ${(props) => {
    return props.$width || DEFAULT_MODAL_WIDTH;
  }};
`;

export const BContainer = styled.div`
  padding: 12px 24px;
`;

export const FContainer = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
  background: var(--primary-color);
  color: var(--background-box);
`;

export const HContainer = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--primary-color);
  color: var(--background-box);
`;

export const Title = styled.div`
  font-size: 20px;
`;

export const ButtonClose = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--background-box);
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 10px;
  transition: all 0.3s linear;
  cursor: pointer;
  border-radius: 100%;
  box-shadow: inset 0 0 10px #001683;
  &:hover {
    background: ${hexToRgba('#ffffff', 0.12)};
    box-shadow: inset 0 0 10px #260393;
  }
`;
