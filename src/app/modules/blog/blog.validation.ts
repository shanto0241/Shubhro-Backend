import { z } from 'zod';

export const newBlogSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(255),
        content: z.string().min(10),
        image: z
            .object({
                url: z.string().url().optional(),
                alt: z.string().min(3).max(255).optional()
            })
            .optional()
    })
});

export const BlogValidation = {
    newBlogSchema
};
