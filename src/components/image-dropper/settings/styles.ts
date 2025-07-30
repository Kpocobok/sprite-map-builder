import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
`;

export const Gallery = styled.div``;

export const CurrentImage = styled.div``;

export const Image = styled.img`
    width: 100%;
    height: auto;
`;

export const CurrentListImages = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 4px;
`;

export const BtnScrollLeft = styled.div``;

export const BtnScrollRight = styled.div``;

export const ImageScroll = styled.div``;
