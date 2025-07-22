import styled from 'styled-components';
import {SIDEBAR_WIDTH} from '../../../constants/default';

export const Container = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    height: auto;
    width: calc(100% - ${SIDEBAR_WIDTH}px + 8px);
    padding: 8px;
    pointer-events: none;
`;

export const Content = styled.div`
    background: var(--primary-color);
    border-radius: 4px;
    box-shadow: 0 0 4px #000;
    padding: 4px 6px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 12px;
    font-size: 12px;
    color: #fff;
`;

export const StatusBox = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const Title = styled.div`
    font-family: monospace;
`;

export const Value = styled.div``;
