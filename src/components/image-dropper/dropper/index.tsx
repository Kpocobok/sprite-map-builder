import {useRef, type ReactNode} from 'react';
import IconImage from '../../icons/IconImage';
import {Container, ContainerIcon, FilePicker, IconText} from './styles';
import type {IImage} from '..';

interface IDropper {
    onChange: (data: IImage[]) => void;
}

const Dropper = (props: IDropper): ReactNode => {
    const filePicker = useRef<HTMLInputElement | null>(null);

    const handleClickPicker = () => {
        if (!filePicker) return null;

        filePicker.current?.click();
    };

    const handleChooseImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const promises: Promise<IImage>[] = [];
        const files: FileList | null = event.target.files;

        if (!files?.length) return;

        for (const file of files) {
            if (file.type) {
                const [typeImage, _formatImage] = file.type.toString().split('/');

                if (typeImage === 'image') {
                    promises.push(toBase64(file));
                }
            }
        }

        Promise.all(promises).then((results: IImage[]) => {
            props.onChange(results);
        });
    };

    const toBase64 = (file: File): Promise<IImage> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            const image = new Image();
            reader.readAsDataURL(file);
            reader.onload = () => {
                image.src = reader.result as string;
                image.onload = () => {
                    resolve({
                        img: reader.result as string,
                        width: image.naturalWidth,
                        height: image.naturalHeight
                    });
                };
            };
            reader.onerror = reject;
        });

    return (
        <Container onClick={handleClickPicker}>
            <ContainerIcon>
                <IconImage />
                <IconText>Нажмите чтобы загрузить изображение</IconText>
            </ContainerIcon>

            <FilePicker ref={filePicker} type='file' onChange={handleChooseImage} />
        </Container>
    );
};

export default Dropper;
