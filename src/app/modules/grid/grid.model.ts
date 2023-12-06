import { Schema, model } from 'mongoose';
import { GridModel, IGrid } from './grid.interface';

const photoSchema = new Schema<IGrid>({
    title: String,
    url: String,
    alt: String
});

export const Photos = model<IGrid, GridModel>('Photos', photoSchema);
