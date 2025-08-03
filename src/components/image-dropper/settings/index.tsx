import {useEffect, useState, type ReactNode} from 'react';
import {BtnScroll, Container, CurrentImage, CurrentListImages, Gallery, Image, ImageScroll, ImageSlide} from './styles';
import IconChevronLeft from '../../icons/IconChevronLeft';
import IconChevronRight from '../../icons/IconChevronRight';
import {generateArray} from '../../../helpers/utils';
import type {IImage} from '..';

const DEFAULT_MAX_ELEMENTS_GALLERY = 4;

interface ISettings {
    data: IImage[];
}

const Settings = (props: ISettings): ReactNode => {
    const [offset, setOffset] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentArrayImages, setCurrentArrayImages] = useState<IImage[]>(generateArray(DEFAULT_MAX_ELEMENTS_GALLERY));

    useEffect(() => {
        setterCurrentImages();
    }, []);

    useEffect(() => {
        setterCurrentImages();
    }, [props.data, offset]);

    const setterCurrentImages = () => {
        setCurrentArrayImages([
            ...currentArrayImages.map((_: IImage, key: number) => {
                return props.data[key + offset * DEFAULT_MAX_ELEMENTS_GALLERY] || '';
            })
        ]);
    };

    if (!props.data.length) return null;

    console.log(currentArrayImages);

    return (
        <Container>
            <Gallery>
                <CurrentImage>
                    <Image src={props.data[currentIndex].img} />
                </CurrentImage>
                <CurrentListImages>
                    <BtnScroll>
                        <IconChevronLeft />
                    </BtnScroll>
                    {currentArrayImages.map((item: IImage, key: number) => {
                        return <ImageScroll $active={key === currentIndex}>{item.img !== '' ? <ImageSlide src={item.img} $wh={item.width >= item.height} /> : null}</ImageScroll>;
                    })}
                    <BtnScroll>
                        <IconChevronRight />
                    </BtnScroll>
                </CurrentListImages>
            </Gallery>
        </Container>
    );
};

export default Settings;
