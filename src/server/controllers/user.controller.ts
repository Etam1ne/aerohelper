import { TRPCError } from '@trpc/server';
import { CreateEmployeeDto, CreateParentDto, LoginDto } from '../dtos';
import { prisma } from '../prisma';
import { hash, verify } from 'argon2';
import { jwtHelper } from '../helpers';
import { Role, User } from '@prisma/client';

export class UserController {
  public async login({ login, password }: LoginDto): Promise<string> {
    const user = await prisma.user.findFirst({ where: { login } });
    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid password',
      });
    }

    const token = jwtHelper.create({
      id: user.id,
      role: user.role,
    });

    return token;
  }

  public async me({ id }: { id: string }): Promise<User> {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }

    return user;
  }

  public async createParent(paylaod: CreateParentDto): Promise<string> {
    const hashedPass = await hash(paylaod.password);
    const user = await prisma.user.create({
      data: {
        role: Role.parent,
        password: hashedPass,
        login: paylaod.email,
      },
      select: {
        role: true,
        id: true,
      }
    })

    await prisma.parent.create({
      data: {
        firstName: paylaod.firstName,
        lastName: paylaod.lastName,
        middleName: paylaod.middleName,
        email: paylaod.email,
        userId: user.id,
      }
    })
    
    const token = jwtHelper.create({
      id: user.id,
      role: user.role,
    });

    return token;
  }

  public async createEmployee(payload: CreateEmployeeDto) {
    const hashedPass = await hash(payload.password);
    const user = await prisma.user.create({
      data: {
        role: Role.employee,
        password: hashedPass,
        login: payload.email,
      },
      select: {
        role: true,
        id: true,
      }
    })

    await prisma.employee.create({
      data: {
        userId: user.id,
      }
    })
    
    const token = jwtHelper.create({
      id: user.id,
      role: user.role,
    });

    return token;
  }
}

export const userController = new UserController();
