import mongoose from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IUser } from './user.interface';
import { Admin } from '../admin/admin.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from './user.model';

const createAdmin = async (admin: IAdmin, user: IUser): Promise<IUser | null> => {
    // set role
    user.role = 'admin';

    let newUserAllData = null;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const newAdmin = await Admin.create([admin], { session });

        if (!newAdmin.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin ');
        }

        user.admin = newAdmin[0]._id;

        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
        }
        newUserAllData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    return newUserAllData;
};

export const UserService = {
    createAdmin
};
