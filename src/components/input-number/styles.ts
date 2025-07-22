import styled from 'styled-components';

interface IControll {
    side: 'left' | 'right';
}

export const Container = styled.div`
    position: relative;
    width: 100%;
`;

export const Controll = styled.div<IControll>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    box-shadow: inset 0 0 10px #001683;
    cursor: pointer;
    transition: all 0.1s linear;
    border-top-left-radius: ${(props) => {
        return props.side === 'left' ? `12px` : `0px`;
    }};
    border-bottom-left-radius: ${(props) => {
        return props.side === 'left' ? `12px` : `0px`;
    }};
    border-top-right-radius: ${(props) => {
        return props.side === 'right' ? `12px` : `0px`;
    }};
    border-bottom-right-radius: ${(props) => {
        return props.side === 'right' ? `12px` : `0px`;
    }};
    &:hover {
        background: rgba(255, 255, 255, 0.12);
        box-shadow: inset 0 0 10px #260393;
    }
`;

export const InputValue = styled.input`
    border: none;
    outline: none;
    padding: 6px 14px;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    line-height: 1.5;
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 32px calc(100% - 64px) 32px;
`;

export const Label = styled.div`
    font-size: 12px;
    display: block;
`;
