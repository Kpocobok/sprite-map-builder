import styled from 'styled-components';
import {hexToRgba} from '../../helpers/utils';

interface IContainer {
    $padding?: string;
    $radius?: string;
    $center?: boolean;
}

export const Container = styled.div<IContainer>`
    display: flex;
    align-items: center;
    padding: ${(props) => {
        return props.$padding || `4px 8px`;
    }};
    font-size: 14px;
    border: 1px solid transparent;
    border-radius: ${(props) => {
        return props.$radius || `16px`;
    }};
    cursor: pointer;
    transition: all 0.1s linear;
    box-shadow: inset 0 0 10px #001683;
    justify-content: ${(props) => {
        return props.$center ? `center` : `baseline`;
    }};
    &:hover {
        background: ${hexToRgba('#ffffff', 0.12)};
        box-shadow: inset 0 0 10px #260393;
    }
`;
