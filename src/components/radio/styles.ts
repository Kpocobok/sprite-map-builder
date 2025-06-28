import styled from 'styled-components';

interface IIcon {
  $isActive: boolean;
}

export const Container = styled.div`
  width: 100%;
`;

export const ContainerLabel = styled.div`
  width: 100%;
  margin-bottom: 6px;
  user-select: none;
`;

export const ContainerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const Icon = styled.div<IIcon>`
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  border-color: var(--primary-color);
  border-width: ${(props) => {
    return props.$isActive ? `6px` : `2px`;
  }};
  border-style: solid;
  background: tranparent;
`;

export const ContainerText = styled.div`
  cursor: pointer;
  user-select: none;
`;
