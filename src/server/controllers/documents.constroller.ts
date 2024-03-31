import { Document, Role } from '@prisma/client';
import {
  CreateDocumentDto,
  DocumentByIdDto,
  DocumentsListDto,
  UpdateDocumentDto,
} from '../dtos';
import { prisma } from '../prisma';
import { TRPCError } from '@trpc/server';
import { DocumentType } from '../../types/document.type';

export class DocumentsController {
  public async getList(payload: DocumentsListDto) {
    const skip = payload.limit * (payload.page - 1);

    const where = {
      parentId: payload.role === Role.parent ? payload.userId : undefined,
      employeeId: payload.role === Role.employee ? payload.userId : undefined,
    };

    const documents = await prisma.document.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: payload.limit,
      skip,
      include: {
        parent: true,
        employee: true,
      },
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

  public async getById(payload: DocumentByIdDto): Promise<DocumentType> {
    const document = await prisma.document.findFirst({
      where: { id: payload.id },
    });

    if (!document) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Document not found' });
    }

    return document as DocumentType;
  }

  public async update({
    id,
    ...payload
  }: UpdateDocumentDto): Promise<DocumentType> {
    const document = await prisma.document.update({
      data: payload,
      where: { id },
    });

    return document as DocumentType;
  }
}

export const documentsController = new DocumentsController();
