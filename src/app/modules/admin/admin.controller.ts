import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';
import httpStatus from 'http-status';

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AdminService.getSingleAdmin(id);

    sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin fetched successfully !',
        data: result
    });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.getAllAdmins();

    sendResponse<IAdmin[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admins fetched successfully !',
        data: result
    });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await AdminService.updateAdmin(id, updatedData);

    sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin updated successfully !',
        data: result
    });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AdminService.deleteAdmin(id);

    sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin deleted successfully !',
        data: result
    });
});

export const AdminController = {
    getSingleAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin
};
