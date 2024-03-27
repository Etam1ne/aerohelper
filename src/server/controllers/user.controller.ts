import { TRPCError } from '@trpc/server';
import { LoginDto } from '../dtos';
import { prisma } from '../prisma';
import { verify } from 'argon2';
import { jwtHelper } from '../helpers';

export class UserController {
    public async login({ login, password }: LoginDto) {
        const user = await prisma.user.findFirst({ where: { login } });
        if (!user) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found'});
        }

        const isValidPassword = await verify(user.password, password);

        if (!isValidPassword) {
            throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid password'});
        }

        const token = jwtHelper.create({
            id: user.id,
            role: user.role,
        });

        return token;
    }
}

export const userController = new UserController();
