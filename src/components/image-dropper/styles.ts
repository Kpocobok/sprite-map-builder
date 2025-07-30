import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #999;
    border-radius: 6px;
    height: 160px;
    background: #f5f5f5;
    box-shadow: 0 0 10px #e2e0e0;
    cursor: pointer;
    margin-left: -12px;
    margin-right: -12px;
    transition: all 0.3s linear;
    &:hover {
        border: 1px solid #91c7ff;
        background: #cae4ff;
    }
`;

export const ContainerIcon = styled.div`
    align-items: center;
    justify-content: center;
    border: 1px dashed;
    display: flex;
    border-radius: 5px;
    font-size: 32px;
    opacity: 0.25;
    flex-direction: column;
    padding: 16px;
    gap: 8px;
`;

export const FilePicker = styled.input`
    display: none;
`;

export const IconText = styled.div`
    font-size: 14px;
`;
