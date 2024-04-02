import { z } from 'zod';

export const createEmployeeSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
