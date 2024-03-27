import { Role } from '@prisma/client';

export type TokenPayload = {
  id: string;
  role: Role;
};
