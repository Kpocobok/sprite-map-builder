import {useState, type ReactNode} from 'react';
import Dropper from './dropper';
import Settings from './settings';

export interface IImage {
    img: string;
    width: number;
    height: number;
}

const ImageDropper = (): ReactNode => {
    const [imgs, setImgs] = useState<IImage[]>([]);

    return imgs.length ? <Settings data={imgs} /> : <Dropper onChange={setImgs} />;
};

export default ImageDropper;
