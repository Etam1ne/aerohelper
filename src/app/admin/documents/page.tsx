'use client'

import { useCallback } from 'react';
import { trpc } from '../../_trpc/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { PagesEnum } from '../../../enums';
import { DocumentItem, ItemInfo } from '../../_components/documents';
import { Role } from '@prisma/client';
import { InputButton } from '../../_components/form';

const DocumentsListPage = () => {
    const router = useRouter();

    const params = useSearchParams();
    const limit = Number(params.get('limit'));
    const page = Number(params.get('page'));

    const docs = useCallback(() => {
        const query = trpc.document.list;
        const res = query.useQuery({
            limit: limit || 20,
            page: page || 1,
        });
        return res.data?.data || [];
    }, [limit, page])

    const me = trpc.user.me.useQuery();

    return (
        <main className='p-4 flex flex-col'>
            {
                me.data?.role === Role.employee &&
                <div className=''>
                    <InputButton
                        type='button'
                        value='Создать новый документ'
                        onClick={() => router.push(`${PagesEnum.DOCUMENTS}/new`)}
                    />
                </div>
            }
            <div className='flex p-12 flex-col gap-4'>
                <div className='flex flex-row align-middle gap-4 w-full p-4 border border-main-blue rounded-2xl'>
                    <ItemInfo>Идентификатор</ItemInfo>
                    <ItemInfo>Почта</ItemInfo>
                    <ItemInfo>Телефон</ItemInfo>
                    <ItemInfo>Имя</ItemInfo>
                </div>
                {docs().map(DocumentItem)}
            </div>
        </main>
    )
}

export default DocumentsListPage;