import type { ReactNode } from 'react';
import { Container } from './styles';

export interface IGrid {
  $columns?: number;
  $rows?: number;
  $columnsGap?: string;
  $rowsGap?: string;
  children?: ReactNode;
}

const Grid = (props: IGrid): ReactNode => {
  return <Container {...props}>{props.children}</Container>;
};

export default Grid;
