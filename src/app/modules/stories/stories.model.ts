import { Schema, model } from 'mongoose';
import { IStories, StoriesModel } from './stories.interface';

const StoriesSchema = new Schema<IStories, StoriesModel>(
    {
        heading: { type: String, required: true },
        sub_heading: { type: String },
        description: { type: String, required: true },
        images: [
            {
                url: { type: String },
                alt: { type: String }
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Stories = model<IStories, StoriesModel>('Stories', StoriesSchema);
