import { z } from 'zod';

export const findParentSchema = z.object({
  phone: z.string(),
});

export type FindParentDto = z.infer<typeof findParentSchema>;
