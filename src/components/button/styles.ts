import styled from 'styled-components';
import { hexToRgba } from '../../helpers/utils';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 22px;
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
