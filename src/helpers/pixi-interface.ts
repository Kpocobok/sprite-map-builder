export interface ICoordinats {
    x: number;
    y: number;
}

export interface ICoordinatsMesh {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    endSX?: number;
    endSY?: number;
}

export interface IOses {
    osX: ICoordinatsMesh[];
    osY: ICoordinatsMesh[];
}

export interface ICorners {
    alpha: number;
    betta: number;
}

export interface Text extends ICoordinats {
    text: string;
}

export interface IStatusCoordinats {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    tileX: number;
    tileY: number;
    isoX: number;
    isoY: number;
}
