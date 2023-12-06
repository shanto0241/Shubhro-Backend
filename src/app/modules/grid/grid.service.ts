import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGrid } from './grid.interface';
import { Photos } from './grid.model';

const createPhoto = async (photo: IGrid): Promise<IGrid | null> => {
    const newPhoto = await Photos.create(photo);
    return newPhoto;
};

const getSingle = async (id: string): Promise<IGrid | null> => {
    const result = await Photos.findOne({ id });
    return result;
};

const getAll = async (): Promise<IGrid[]> => {
    const result = await Photos.find();
    return result;
};

const deletePhoto = async (id: string): Promise<IGrid | null> => {
    // check if the image is exist
    const isExist = await Photos.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Image not found !');
    }
    const result = await Photos.findOneAndDelete({ id });
    return result;
};

export const GridService = {
    createPhoto,
    getAll,
    getSingle,
    deletePhoto
};
