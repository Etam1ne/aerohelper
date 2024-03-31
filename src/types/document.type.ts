import { Document } from '@prisma/client';
import { DocumentPersonInfoType } from '.';

export type DocumentType = Document & {
  employeeInfo: DocumentPersonInfoType;
  parentInfo: DocumentPersonInfoType;
};
