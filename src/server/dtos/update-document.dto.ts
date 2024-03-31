import { z } from 'zod';

export const documentInfoSchema = z.object({
  checked: z.boolean(),
  date: z.string().optional(),
});

export const updateDocumentSchema = z.object({
  id: z.string(),
  employeeInfo: z.record(z.string(), documentInfoSchema),
});

export type UpdateDocumentDto = z.infer<typeof updateDocumentSchema>;
