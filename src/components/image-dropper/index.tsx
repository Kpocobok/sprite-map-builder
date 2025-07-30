import {useState, type ReactNode} from 'react';
import Dropper from './dropper';
import Settings from './settings';

const ImageDropper = (): ReactNode => {
    const [imgs, setImgs] = useState<string[]>([]);

    return imgs.length ? <Settings data={imgs} /> : <Dropper onChange={setImgs} />;
};

export default ImageDropper;
