import mongoose, { Document, Schema, model } from 'mongoose';

interface Image {
    url: string;
    alt: string;
    title: string;
}

const imageSchema = new Schema<Image>(
    {
        url: { type: String, required: true },
        alt: { type: String, required: true },
        title: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

const Images = mongoose.model<Image>('Images', imageSchema);
export default Images;
