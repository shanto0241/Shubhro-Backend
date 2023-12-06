import { Schema, model } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

const blogPostSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: {
        url: { type: String },
        alt: { type: String }
    }
});

export const Blog = model<IBlog, BlogModel>('Blog', blogPostSchema);
