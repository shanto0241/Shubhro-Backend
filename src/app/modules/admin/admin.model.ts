import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

const AdminSchema = new Schema<IAdmin, AdminModel>(
    {
        name: {
            type: {
                firstName: String,
                lastName: String
            },
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        contactNo: {
            type: String,
            unique: true,
            required: true
        },
        profileImage: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
