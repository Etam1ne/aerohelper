import { parentsRouter } from '.';
import { publicProcedure, router } from '../trpc';
import { documentsRouter } from './documents';
import { userRouter } from './user';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  user: userRouter,
  document: documentsRouter,
  parent: parentsRouter,
});

export type AppRouter = typeof appRouter;
