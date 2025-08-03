import styled from 'styled-components';

interface IImageScroll {
    $active: boolean;
}

interface IImage {
    $wh: boolean;
}

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

export const ImageSlide = styled.img<IImage>`
    width: ${(props) => {
        return props.$wh ? `auto` : `100%`;
    }};
    height: ${(props) => {
        return props.$wh ? `100%` : `auto`;
    }};
`;

export const CurrentListImages = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 4px;
    height: 30px;
`;

export const BtnScroll = styled.div`
    background: var(--background-root);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s linear;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    height: inherit;
    overflow: hidden;
    svg {
        fill: #bdbdbd;
        transition: all 0.3s linear;
    }
    &:hover {
        border-color: var(--primary-color);
        svg {
            fill: var(--primary-color);
        }
    }
`;

export const ImageScroll = styled.div<IImageScroll>`
    background: var(--background-root);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s linear;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s linear;
    border-width: 2px;
    border-style: solid;
    height: inherit;
    overflow: hidden;
    border-color: ${(props) => {
        return props.$active ? `var(--primary-color)` : `transparent`;
    }};
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    &:hover {
        border-color: var(--primary-color);
    }
`;
