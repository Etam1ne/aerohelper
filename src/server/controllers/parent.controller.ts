import { Parent } from '@prisma/client';
import { FindParentDto } from '../dtos';
import { prisma } from '../prisma';

export class ParentController {
  public async findByQuery(payload: FindParentDto): Promise<Parent[]> {
    const parents = prisma.parent.findMany({
      where: {
        phone: {
          contains: payload.phone,
        },
      },
      take: 20,
    });

    return parents;
  }
}

export const parentController = new ParentController();
