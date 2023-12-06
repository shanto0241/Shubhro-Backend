import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (blog: IBlog): Promise<IBlog | null> => {
    const newBlog = await Blog.create(blog);
    console.log(newBlog);
    return newBlog;
};

const getSingleBlog = async (id: string): Promise<IBlog | null> => {
    const result = await Blog.findOne({ id });
    return result;
};

const getAllBlogs = async (): Promise<IBlog[]> => {
    const result = await Blog.find();
    return result;
};

const updateBlog = async (id: string, payload: Partial<IBlog>): Promise<IBlog | null> => {
    const isExist = await Blog.findOne({ id });
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Blog Post not found !');
    }
    const { title, ...blogData } = payload;

    const result = await Blog.findOneAndUpdate({ id }, payload);
    return result;
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
    // check if the story is exist
    const isExist = await Blog.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found !');
    }
    const result = await Blog.findOneAndDelete({ id });
    return result;
};

export const BlogService = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};
