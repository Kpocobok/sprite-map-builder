import styled from 'styled-components';

interface IContainer {
  $columns?: number;
  $rows?: number;
  $columnsGap?: string;
  $rowsGap?: string;
}

export const Container = styled.div<IContainer>`
  display: grid;
  grid-template-columns: ${(props) => {
    return props.$columns ? `repeat(${props.$columns}, 1fr)` : `repeat(1, 1fr)`;
  }};
  grid-template-rows: ${(props) => {
    return props.$rows ? `repeat(${props.$rows}, 1fr)` : `repeat(1, 1fr)`;
  }};
  grid-column-gap: ${(props) => {
    return props.$columnsGap || 'unset';
  }};
  grid-row-gap: ${(props) => {
    return props.$rowsGap || 'unset';
  }};
`;
