import {useEffect, useState, type ReactNode} from 'react';
import IconMinus from '../icons/IconMinus';
import IconPlus from '../icons/IconPlus';
import {Container, Controll, InputValue, Content, Label} from './styles';

export interface IInputNumber {
    label?: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
}

const InputNumber = (props: IInputNumber): ReactNode => {
    const [value, setValue] = useState<number>(Number(props.value) || 0);

    useEffect(() => {
        if (!isNaN(Number(props.value))) {
            setValue(Number(props.value) || 0);
        }
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) return;

        setValue(Number(e.target.value));

        props.onChange(e.target.value);
    };

    const handleChageMinus = () => {
        setValue(Number(value) - 1);

        props.onChange(String(Number(value) - 1));
    };

    const handleChagePlus = () => {
        setValue(Number(value) + 1);

        props.onChange(String(Number(value) + 1));
    };

    return (
        <Container>
            {props.label ? <Label>{props.label}</Label> : null}
            <Content>
                <Controll side='left' onClick={handleChageMinus}>
                    <IconMinus />
                </Controll>
                <InputValue value={value} onChange={handleChange} />
                <Controll side='right' onClick={handleChagePlus}>
                    <IconPlus />
                </Controll>
            </Content>
        </Container>
    );
};

export default InputNumber;
