import { z } from 'zod';

export const createParentSchema = z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    email: z.string(),
    password: z.string(),
});

export type CreateParentDto = z.infer<typeof createParentSchema>;
