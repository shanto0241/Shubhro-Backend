import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findOne({ id });
    return result;
};

const getAllAdmins = async (): Promise<IAdmin[]> => {
    const result = await Admin.find();
    return result;
};

const updateAdmin = async (id: string, payload: Partial<IAdmin>): Promise<IAdmin | null> => {
    const isExist = await Admin.findOne({ id });
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
    }
    const { name, ...adminData } = payload;

    const result = await Admin.findOneAndUpdate({ id }, payload);
    return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
    // check if the admin is exist
    const isExist = await Admin.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
    }
    const result = await Admin.findOneAndDelete({ id });
    return result;
};

export const AdminService = {
    getSingleAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin
};
