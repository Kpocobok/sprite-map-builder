import { useEffect, useState, type ReactNode } from 'react';
import {
  Container,
  ContainerItem,
  ContainerLabel,
  ContainerText,
  Icon,
} from './styles';
import Grid from '../grid';

export interface IRadioOption {
  value: string;
  text: string | ReactNode;
}

export interface IRadio {
  options: IRadioOption[];
  label?: string;
  value?: string;
  columns?: number;
  onChange: (value: string) => void;
}

const Radio = (props: IRadio): ReactNode => {
  const [value, setValue] = useState<string>(props.value || '');
  if (!props.onChange || !props.options?.length) return null;

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const handleChange = (value: string) => {
    setValue(value);
    props.onChange(value);
  };

  return (
    <Container>
      <ContainerLabel>{props.label || ''}</ContainerLabel>
      <Grid $columns={props.columns || 3} $columnsGap="12px">
        {props.options.map((item: IRadioOption) => {
          return (
            <ContainerItem
              key={item.value}
              onClick={() => handleChange(item.value)}
            >
              <Icon $isActive={item.value === value} />
              <ContainerText>{item.text}</ContainerText>
            </ContainerItem>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Radio;
