import type {ReactNode} from 'react';
import {Container} from './styles';

interface IButton {
    $radius?: string;
    $padding?: string;
    children: ReactNode;
    center?: boolean;
    onClick?: () => void;
}

const Button = (props: IButton): ReactNode => {
    return (
        <Container $center={props.center} $radius={props.$radius} $padding={props.$padding} onClick={props.onClick}>
            {props.children}
        </Container>
    );
};

export default Button;
