'use client';

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
  }, [limit, page]);

  const me = trpc.user.me.useQuery();

  return (
    <main className='flex flex-col p-4'>
      <div className='flex w-full gap-6'>
        {me.data?.role === Role.employee && (
          <div className=''>
            <InputButton
              type='button'
              value='Создать новый документ'
              onClick={() => router.push(`${PagesEnum.DOCUMENTS}/new`)}
            />
          </div>
      )}
        <div className=''>
              <InputButton
                type='button'
                value='Выйти из аккаунта'
                onClick={() => {
                  localStorage.removeItem('token');
                  router.push(PagesEnum.LOGIN)
                }}
              />
            </div>
        </div>
      <div className='flex flex-col gap-4 p-12'>
        <div className='flex w-full flex-row gap-4 rounded-2xl border border-main-blue p-4 align-middle'>
          <ItemInfo>Идентификатор</ItemInfo>
          <ItemInfo>Почта</ItemInfo>
          <ItemInfo>Телефон</ItemInfo>
          <ItemInfo>Имя</ItemInfo>
          <ItemInfo>Статус</ItemInfo>
        </div>
        {docs().map(DocumentItem)}
      </div>
    </main>
  );
};

export default DocumentsListPage;
