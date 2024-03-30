import { z } from 'zod';

export const createDocumentSchema = z.object({
        parentId: z.string(),
        parentInfo: z.object({}),
        employeeInfo: z.object({}),
});

export type CreateDocumentBodyDto = z.infer<typeof createDocumentSchema>

export type CreateDocumentDto = CreateDocumentBodyDto & { employeeId: string };
