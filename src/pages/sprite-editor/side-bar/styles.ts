import styled from 'styled-components';
import {SIDEBAR_WIDTH} from '../../../constants/default';

export const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: ${SIDEBAR_WIDTH}px;
    padding: 8px;
`;

export const ControllPanel = styled.div`
    background: var(--primary-color);
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 4px #000;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: var(--background-box);
`;

export const Section = styled.div`
    margin-bottom: 4px;
`;

export const SectionTitle = styled.div`
    margin-bottom: 8px;
    font-weight: 800;
`;

export const SectionButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 6px));
    grid-gap: 12px;
    width: 100%;
    margin-bottom: 12px;
`;

export const Icon = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonContent = styled.div`
    font-size: 13px;
`;
