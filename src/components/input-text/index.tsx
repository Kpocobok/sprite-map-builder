import { useEffect, useState, type ReactNode } from 'react';
import { Container, Error, Input, Label } from './styles';
import { escape, unescape } from 'lodash';

export interface IInputText {
  label?: string;
  error?: string;
  value: string;
  onlyNumber?: boolean;
  onChange: (value: string) => void;
}

const InputText = (props: IInputText): ReactNode => {
  const [value, setValue] = useState<string>(unescape(props.value) || '');

  useEffect(() => {
    setValue(escape(props.value) || '');
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string = escape(e.target.value.trim());

    if (props.onlyNumber) {
      val = val.replace(/\D/g, '');
    }

    setValue(val);
    props.onChange(val);
  };

  return (
    <Container>
      {props.label ? <Label>{props.label}</Label> : null}
      <Input value={value} onChange={handleChange} />
      {props.error ? <Error>{props.error}</Error> : null}
    </Container>
  );
};

export default InputText;
