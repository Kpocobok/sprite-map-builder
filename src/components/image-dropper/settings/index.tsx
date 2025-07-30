import {useState, type ReactNode} from 'react';
import {BtnScrollLeft, BtnScrollRight, Container, CurrentImage, CurrentListImages, Gallery, Image, ImageScroll} from './styles';
import IconChevronLeft from '../../icons/IconChevronLeft';
import IconChevronRight from '../../icons/IconChevronRight';

const DEFAULT_MAX_ELEMENTS_GALLERY = 4;

interface ISettings {
    data: string[];
}

const Settings = (props: ISettings): ReactNode => {
    const [offset, setOffset] = useState<number>(0);

    if (!props.data.length) return null;

    return (
        <Container>
            <Gallery>
                <CurrentImage>
                    <Image src={props.data[0]} />
                </CurrentImage>
                <CurrentListImages>
                    <BtnScrollLeft>
                        <IconChevronLeft />
                    </BtnScrollLeft>
                    {props.data.map((item: string, key: number) => {
                        return key >= offset && key < offset + DEFAULT_MAX_ELEMENTS_GALLERY ? <ImageScroll>{item !== '' ? <Image src={item} /> : null}</ImageScroll> : null;
                    })}
                    <BtnScrollRight>
                        <IconChevronRight />
                    </BtnScrollRight>
                </CurrentListImages>
            </Gallery>
        </Container>
    );
};

export default Settings;
