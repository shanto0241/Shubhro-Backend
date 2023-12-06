import { Model } from 'mongoose';

export type Images = {
    url: string;
    alt: string;
};

export type IStories = {
    heading: string;
    sub_heading?: string;
    description: string;
    images?: Images[];
};

export type StoriesModel = Model<IStories, Record<string, unknown>>;
