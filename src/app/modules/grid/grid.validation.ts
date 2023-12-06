import { z } from 'zod';

export const newPhotoSchema = z.object({
    body: z.object({
        title: z.string(),
        url: z.string().url(),
        alt: z.string().min(3).max(255)
    })
});

export const GridValidation = {
    newPhotoSchema
};
