import { Document } from '@prisma/client';
import { DocumentPersonInfoType, ParentInfoType } from '.';

export type DocumentType = Omit<Document, 'employeeInfo' | 'parentInfo'> & {
  employeeInfo: DocumentPersonInfoType;
  parentInfo: ParentInfoType;
};
