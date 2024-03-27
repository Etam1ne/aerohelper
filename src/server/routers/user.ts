import { publicProcedure, router } from '../trpc';
import { loginSchema } from '../dtos';
import { userController } from '../controllers';

export const userRouter = router({
    login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
        return userController.login(input);
    })
})