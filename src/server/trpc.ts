import { TRPCError, initTRPC } from '@trpc/server';
import { transformer } from '../utils/transformer.util';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer,

  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

const isAuth = t.middleware(async (opts) => {
  const { ctx } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next();
});

export const protectedProcedure = t.procedure.use(isAuth);

export const mergeRouters = t.mergeRouters;

export const createCallerFactory = t.createCallerFactory;
