import styled from 'styled-components';
import { hexToRgba } from '../../../helpers/utils';

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 400px;
  padding: 8px;
`;

export const ControllPanel = styled.div`
  background: var(--primary-color);
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 0 4px #000;
  padding: 12px 0;
`;

export const SectionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  padding: 0 12px;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 14px;
  color: var(--background-box);
  border: 1px solid transparent;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.1s linear;
  box-shadow: inset 0 0 10px #001683;
  &:hover {
    background: ${hexToRgba('#ffffff', 0.12)};
    box-shadow: inset 0 0 10px #260393;
  }
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonContent = styled.div`
  font-size: 13px;
`;
