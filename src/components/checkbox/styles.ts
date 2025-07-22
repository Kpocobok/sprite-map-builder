import styled from 'styled-components';

interface ICheck {
    $status: boolean;
}

export const Container = styled.div``;

export const Check = styled.div<ICheck>`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 10px #001683;
    background: ${(props) => {
        return props.$status ? `#ffbf00` : `transparent`;
    }};
    &:before {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background: #0d2bbd;
    }
`;

export const Label = styled.div`
    line-height: 1;
`;

export const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
`;
