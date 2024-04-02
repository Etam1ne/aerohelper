import { z } from 'zod';

export const createDocumentSchema = z.object({
  parentId: z.string(),
  parentInfo: z.object({
    flightDate: z.string().optional(),
    childName: z.string().optional(),
  }),
  employeeInfo: z.object({}),
});

export type CreateDocumentBodyDto = z.infer<typeof createDocumentSchema>;

export type CreateDocumentDto = CreateDocumentBodyDto & { employeeId: string };
