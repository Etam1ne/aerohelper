import Link from 'next/link';
import { DocumentWithUsers } from '../../../types';
import { PagesEnum } from '../../../enums';

export const ItemInfo = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <p className='h-full w-1/4 text-center align-middle'>{children}</p>;
};

export const DocumentItem = (document: DocumentWithUsers) => {
  return (
    <Link
      className='flex w-full cursor-pointer flex-row gap-4 rounded-2xl border border-main-blue p-4 align-middle'
      href={`${PagesEnum.DOCUMENTS}/${document.id}`}
      key={document.id}
    >
      <ItemInfo>{document.id}</ItemInfo>
      <ItemInfo>{document.parent?.email || ''}</ItemInfo>
      <ItemInfo>{document.parent?.phone || ''}</ItemInfo>
      <ItemInfo>
        {`${document.parent?.firstName || ''} ${document.parent?.lastName || ''}`.trim()}
      </ItemInfo>
    </Link>
  );
};
