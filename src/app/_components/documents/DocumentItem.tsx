import Link from 'next/link';
import { DocumentWithUsers } from '../../../types';
import { DocumentPointEnum, PagesEnum } from '../../../enums';
import { documentPointSort, documentPointTranslation } from '../../../constants';

export const ItemInfo = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <p className='h-full lg:w-1/5 text-center align-middle'>{children}</p>;
};

export const DocumentItem = (document: DocumentWithUsers) => {

  const lastStatus = 
  documentPointTranslation[
    Object.keys(document.employeeInfo || {})
    .sort((a, b) => documentPointSort.indexOf(a) - documentPointSort.indexOf(b))
    // @ts-ignore
      .findLast((v) => document.employeeInfo?.[v]?.date) as DocumentPointEnum] || '';

  return (
    <Link
      className='flex w-full cursor-pointer flex-col gap-4 rounded-2xl border border-main-blue p-4 align-middle lg:flex-row'
      href={`${PagesEnum.DOCUMENTS}/${document.id}`}
      key={document.id}
    >
      <ItemInfo>{document.id}</ItemInfo>
      <ItemInfo>{document.parent?.email || ''}</ItemInfo>
      <ItemInfo>{document.parent?.phone || ''}</ItemInfo>
      <ItemInfo>
        {`${document.parent?.firstName || ''} ${document.parent?.lastName || ''}`.trim()}
      </ItemInfo>
      <ItemInfo>{lastStatus}</ItemInfo>
    </Link>
  );
};
