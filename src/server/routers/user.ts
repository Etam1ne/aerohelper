import { protectedProcedure, publicProcedure, router } from '../trpc';
import { loginSchema } from '../dtos';
import { userController } from '../controllers';

export const userRouter = router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    return userController.login(input);
  }),

  me: protectedProcedure.query(({ ctx }) => {
    return userController.me({ id: ctx.user?.id as string });
  }),
});
