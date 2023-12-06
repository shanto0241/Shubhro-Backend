import { Request, Response } from 'express';

import { RequestHandler } from 'express-serve-static-core';
import catchAsync from '../../../shared/catchAsync';
import { StoriesService } from './stories.service';
import sendResponse from '../../../shared/sendResponse';
import { IStories } from './stories.interface';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createStory: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { ...story } = req.body;
    const result = await StoriesService.createStory(story);

    sendResponse<IStories>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Story created successfully!',
        data: result
    });
});

const getSingleStory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params._id;
    const result = await StoriesService.getSingleStory(id);

    sendResponse<IStories>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Story fetched successfully !',
        data: result
    });
});

const getAllStories = catchAsync(async (req: Request, res: Response) => {
    const result = await StoriesService.getAllStories();

    sendResponse<IStories[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Stories fetched successfully !',
        data: result
    });
});

const updateStory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params._id;
    console.log(id);
    const updatedData = req.body;

    const result = await StoriesService.updateStories(id, updatedData);

    sendResponse<IStories>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Story updated successfully !',
        data: result
    });
});

const deleteStory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params._id;

    const result = await StoriesService.deleteStory(id);

    sendResponse<IStories>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Story deleted successfully !',
        data: result
    });
});

export const StoriesController = {
    getAllStories,
    getSingleStory,
    createStory,
    updateStory,
    deleteStory
};
