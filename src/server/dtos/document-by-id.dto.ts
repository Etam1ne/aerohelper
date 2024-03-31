import { z } from 'zod';

export const documentByIdSchema = z.object({
  id: z.string(),
});

export type DocumentByIdDto = z.infer<typeof documentByIdSchema>;
