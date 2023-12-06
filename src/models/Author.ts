import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor {
    name: string;
    email: string;
    password: string;
    role: Roles;
}

export enum Roles {
    SuperAdmin = 'super-admin',
    Admin = 'admin'
}

export interface IAuthorModel extends IAuthor, Document {
    _id: string;
}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: Object.values(Roles), required: true }
    },
    {
        versionKey: false
    }
);
export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
