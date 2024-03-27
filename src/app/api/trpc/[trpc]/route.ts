import { appRouter } from '../../../../server/routers/_app';
import { createContext } from '../../../../server/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // @ts-ignore
    createContext,
  })
}

export { handler as POST, handler as GET }