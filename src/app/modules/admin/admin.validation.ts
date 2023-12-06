import z from 'zod';

const updateAdmin = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string().optional(),
            lastName: z.string().optional()
        }),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        profileImage: z.string().optional()
    })
});

export const AdminValidation = {
    updateAdmin
};
