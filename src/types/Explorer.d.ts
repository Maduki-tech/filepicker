import { type dateiablage, type dateiablage_typ } from '@prisma/client';

export type dateiablageProps = dateiablage & {
    dateiablage: dateiablage;
    dateiablage_typ: dateiablage_typ;
};

export type dataProps = {
    data: dateiablageProps[];
};

export type BreadCrumbProps = {
    id: string;
    name: dateiablageProps | string;
    current: boolean;
};
