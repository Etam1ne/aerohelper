import { Document, Employee, Parent } from '@prisma/client';

export type DocumentWithUsers = Document & {
  employee: Employee;
  parent: Parent;
};
