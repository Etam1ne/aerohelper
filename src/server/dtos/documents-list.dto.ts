import { Role } from '@prisma/client';
import { z } from 'zod';

export const documentsListSchema = z.object({
    limit: z.number().default(20),
    page: z.number().default(1),
});

export type DocumentsListQueryDto = z.infer<typeof documentsListSchema>

export type DocumentsListDto = DocumentsListQueryDto & {
    role: Role,
    userId: string,
};
