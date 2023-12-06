import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';

const createAdmin: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin created successfully!',
        data: result
    });
});

export const UserController = {
    createAdmin
};
