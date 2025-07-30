import {useRef, type ReactNode} from 'react';
import IconImage from '../../icons/IconImage';
import {Container, ContainerIcon, FilePicker, IconText} from './styles';

interface IDropper {
    onChange: (data: string[]) => void;
}

const Dropper = (props: IDropper): ReactNode => {
    const filePicker = useRef<HTMLInputElement | null>(null);

    const handleClickPicker = () => {
        if (!filePicker) return null;

        filePicker.current?.click();
    };

    const handleChooseImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const promises: Promise<string>[] = [];
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

        Promise.all(promises).then((results: string[]) => {
            props.onChange(results);
        });
    };

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
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
