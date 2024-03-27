import { Role } from '@prisma/client';
import { documentsController } from '../controllers';
import { createDocumentSchema, documentsListSchema } from '../dtos';
import { protectedProcedure, router } from '../trpc';

export const documentsRouter = router({
    list: protectedProcedure.input(documentsListSchema).query(async ({ input, ctx }) => {
        const { documents, count } = await documentsController.getList({
            ...input,
            userId: ctx.user?.id as string,
            role: ctx.user?.role as Role,
        });
        return {
            data: documents,
            total: count,
        }
    }),

    create: protectedProcedure.input(createDocumentSchema).mutation(async ({ input, ctx }) => {
        const document = await documentsController.create({
            ...input,
            employeeId: ctx.user?.id as string,
        });
        return {
            data: document,
        }
    }),
})