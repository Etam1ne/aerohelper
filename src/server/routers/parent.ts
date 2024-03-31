import { protectedProcedure, router } from '../trpc';
import { findParentSchema } from '../dtos';
import { parentController } from '../controllers';

export const parentsRouter = router({
  find: protectedProcedure.input(findParentSchema).query(async ({ input }) => {
    const parents = await parentController.findByQuery(input);

    return {
      data: parents,
    };
  }),
});
