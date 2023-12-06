import { Request, Response } from 'express';

import { RequestHandler } from 'express-serve-static-core';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BlogService } from './blog.service';
import { IBlog } from './blog.interface';

const createBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { ...blog } = req.body;
    const result = await BlogService.createBlog(blog);

    sendResponse<IBlog>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog created successfully!',
        data: result
    });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params._id;
    const result = await BlogService.getSingleBlog(id);

    sendResponse<IBlog>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog fetched successfully !',
        data: result
    });
});

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getAllBlogs();

    sendResponse<IBlog[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs fetched successfully !',
        data: result
    });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params._id;
    const updatedData = req.body;

    const result = await BlogService.updateBlog(id, updatedData);

    sendResponse<IBlog>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog updated successfully !',
        data: result
    });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params._id;

    const result = await BlogService.deleteBlog(id);

    sendResponse<IBlog>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully !',
        data: result
    });
});

export const BlogController = {
    getAllBlog,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
};
