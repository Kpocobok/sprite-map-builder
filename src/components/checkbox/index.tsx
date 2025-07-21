import {useEffect, useState} from 'react';
import {Container, Check, Label, Content} from './styles';

export interface ICheckbox {
    label?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox = (props: ICheckbox) => {
    const [value, setValue] = useState<boolean>(props.value || false);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const handleSetValue = () => {
        setValue(!value);
        props.onChange(!value);
    };

    return (
        <Container onClick={handleSetValue}>
            <Content>
                <Check $status={value} />
                {props.label ? <Label>{props.label}</Label> : null}
            </Content>
        </Container>
    );
};

export default Checkbox;
