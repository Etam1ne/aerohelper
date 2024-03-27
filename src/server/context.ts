import { NextRequest } from 'next/server';
import { TokenPayload } from './dtos';
import { jwtHelper } from './helpers';
import { prisma } from './prisma';

export async function createContext(opts: { req: NextRequest }) {

    async function getUserFromHeaders(): Promise<TokenPayload | null> {
        const authHeader = opts.req.headers.get('authorization');
        console.log(authHeader);
        if (authHeader?.split(' ')[1]) {
            return jwtHelper.verify(authHeader.split(' ')[1]);
        }
        return null;
    }

    const user = await getUserFromHeaders();

    return { prisma, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
