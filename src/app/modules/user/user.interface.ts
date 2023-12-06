import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
    id: string;
    role: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangedAt?: Date;
    admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
    isUserExist(id: string): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
    isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IUser>;
