import { Document, Role } from '@prisma/client';
import { CreateDocumentDto, DocumentsListDto } from '../dtos';
import { prisma } from '../prisma';

export class DocumentsController {
    public async getList(payload: DocumentsListDto) {
        const skip = payload.limit * (payload.page - 1);

    const where = {
      parentId: payload.role === Role.parent ? payload.userId : undefined,
      employeeId: payload.role === Role.employee ? payload.userId : undefined,
    };
    console.log(payload, skip);

    const documents = await prisma.document.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: payload.limit,
      skip,
    });

    const count = await prisma.document.count({
      where,
    });

    return { documents, count };
    }

    public async create(payload: CreateDocumentDto): Promise<Document> {
      const document = await prisma.document.create({
        data: {
          parentId: payload.parentId,
          employeeId: payload.employeeId,
          parentInfo: payload.parentInfo,
          employeeInfo: payload.employeeInfo,
        },
      });
  
      return document;
    }
}

export const documentsController = new DocumentsController();
