import { z } from 'zod';

export const createDocumentSchema = z.object({
        parentId: z.string(),
        parentInfo: z.array(z.any()),
        employeeInfo: z.array(z.any()),
});

export type CreateDocumentBodyDto = z.infer<typeof createDocumentSchema>

export type CreateDocumentDto = CreateDocumentBodyDto & { employeeId: string };
