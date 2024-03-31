import { Document, Employee, Parent } from '@prisma/client';
import { DocumentInfoType } from './document-info.type';

export type DocumentWithUsers = Document & {
  employee: Employee;
  parent: Parent;
};
