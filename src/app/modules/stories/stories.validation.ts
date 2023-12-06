import { z } from 'zod';

export const newStorySchema = z.object({
    body: z.object({
        heading: z.string().min(3).max(255),
        sub_heading: z.string().max(255).optional(),
        description: z.string().min(10),
        images: z
            .array(
                z.object({
                    url: z.string().url(),
                    alt: z.string().min(3).max(255)
                })
            )
            .optional()
    })
});

export const StoriesValidation = {
    newStorySchema
};
