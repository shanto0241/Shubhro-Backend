import { Model } from 'mongoose';

export type UserName = {
    firstName: string;
    lastName: string;
};

export type IAdmin = {
    name: UserName;
    profileImage: string;
    email: string;
    contactNo: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
