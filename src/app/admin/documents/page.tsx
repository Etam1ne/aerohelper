'use client'

import { useCallback } from 'react';
import { trpc } from '../../_trpc/client';
import { useRouter } from 'next/navigation';
import { PagesEnum } from '../../../enums';

const DocumentsListPage = () => {
    const router = useRouter();

    const docs = useCallback(() => {
        const query = trpc.document.list;
        const res = query.useQuery({
            limit: 20,
            page: 1,
        });
        return res.data?.data || [];
    }, [])

    return (
        <>
            <button onClick={() => router.push(`${PagesEnum.DOCUMENTS}/new`)}>new</button>
            <div className='flex p-12 flex-col gap-4'>
                {docs().map((d, i) => (<div key={i}>{d.id}</div>))}
            </div>
        </>
    )
}

export default DocumentsListPage;