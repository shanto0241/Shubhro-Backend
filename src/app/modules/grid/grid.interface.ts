import { Model } from 'mongoose';

export type IGrid = {
    title: string;
    url: string;
    alt: string;
};

export type GridModel = Model<IGrid, Record<string, unknown>>;
