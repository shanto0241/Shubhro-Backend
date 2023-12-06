import { Request, Response } from 'express';

import { RequestHandler } from 'express-serve-static-core';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { GridService } from './grid.service';
import { IGrid } from './grid.interface';
import { IBlog } from '../blog/blog.interface';
const createPhoto: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { ...photo } = req.body;
    const result = await GridService.createPhoto(photo);

    sendResponse<IGrid>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Image Uploaded successfully!',
        data: result
    });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
    const id = req.params._id;
    const result = await GridService.getSingle(id);

    sendResponse<IGrid>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog fetched successfully !',
        data: result
    });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
    const result = await GridService.getAll();

    sendResponse<IGrid[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Images fetched successfully !',
        data: result
    });
});

const deletePhoto = catchAsync(async (req: Request, res: Response) => {
    const id = req.params._id;

    const result = await GridService.deletePhoto(id);

    sendResponse<IGrid>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Image deleted successfully !',
        data: result
    });
});

export const GridController = {
    getAll,
    getSingle,
    createPhoto,
    deletePhoto
};
