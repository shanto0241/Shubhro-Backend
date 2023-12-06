import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IStories } from './stories.interface';
import { Stories } from './stories.model';

const createStory = async (story: IStories): Promise<IStories | null> => {
    const newStory = await Stories.create(story);
    console.log(newStory);
    return newStory;
};

const getSingleStory = async (id: string): Promise<IStories | null> => {
    const result = await Stories.findOne({ id });
    return result;
};

const getAllStories = async (): Promise<IStories[]> => {
    const result = await Stories.find();
    return result;
};

const updateStories = async (id: string, payload: Partial<IStories>): Promise<IStories | null> => {
    const isExist = await Stories.findOne({ id });
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Story not found !');
    }
    const { heading, ...storyData } = payload;

    const result = await Stories.findOneAndUpdate({ id }, payload);
    return result;
};

const deleteStory = async (id: string): Promise<IStories | null> => {
    // check if the story is exist
    const isExist = await Stories.findOne({ id });
    console.log(isExist);

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Story not found !');
    }
    const result = await Stories.findOneAndDelete({ id });
    return result;
};

export const StoriesService = {
    createStory,
    getAllStories,
    getSingleStory,
    updateStories,
    deleteStory
};
