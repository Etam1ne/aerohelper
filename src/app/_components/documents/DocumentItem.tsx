import Link from 'next/link';
import { DocumentWithUsers } from '../../../types';
import { PagesEnum } from '../../../enums';

export const ItemInfo = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <p className='w-1/4 h-full text-center align-middle'>{ children }</p>
    )
}

export const DocumentItem = (document: DocumentWithUsers) => {
    return (
        <Link
            className='flex flex-row align-middle gap-4 w-full p-4 border border-main-blue rounded-2xl cursor-pointer'
            href={`${PagesEnum.DOCUMENTS}/${document.id}`}
            key={document.id}
        >
            <ItemInfo>{document.id}</ItemInfo>
            <ItemInfo>{document.parent?.email || ''}</ItemInfo>
            <ItemInfo>{document.parent?.phone || ''}</ItemInfo>
            <ItemInfo>{`${document.parent?.firstName || ''} ${document.parent?.lastName || ''}`.trim()}</ItemInfo>
        </Link>
    )
};
