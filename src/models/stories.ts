import mongoose, { Document, Schema, model } from 'mongoose';

export interface IStories {
    heading: string;
    sub_heading?: string;
    description: string;
    images: Image[];
}

interface Image {
    url: string;
    alt: string;
}

const imageSchema = new Schema<Image>({
    url: { type: String, required: true },
    alt: { type: String, required: true }
});

const storiesSchema = new Schema<IStories>(
    {
        heading: { type: String, required: true },
        sub_heading: { type: String },
        description: { type: String, required: true },
        images: [imageSchema]
    },
    {
        versionKey: false
    }
);

const Stories = mongoose.model<IStories>('Stories', storiesSchema);
export default Stories;
