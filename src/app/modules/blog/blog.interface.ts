import { Model } from 'mongoose';

export type IBlog = {
    title: string;
    content: string;
    image?: {
        url: string;
        alt: string;
    };
};
export type BlogModel = Model<IBlog, Record<string, unknown>>;
