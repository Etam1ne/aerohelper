'use client';

import { trpc } from '../../../_trpc/client';
import { PagesEnum } from '../../../../enums';
import { CreateDocumentBodyDto } from '../../../../server/dtos';
import { InputButton, InputText } from '../../../_components/form';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const NewDocument = () => {
  const router = useRouter();
  const [parentId, setParentId] = useState<string>('');
  const [parentName, setparentName] = useState<string>('');
  const [parentPhone, setParentPhone] = useState<string>('');

  const mutation = trpc.document.create.useMutation({
    onSuccess: (data) => {
      router.push(`${PagesEnum.DOCUMENTS}/${data.data || ''}`);
    }
  });

  const handleFormSubmit = (formData: FormData) => {
    const payload: CreateDocumentBodyDto = {
      parentId,
      parentInfo: {
        flightDate: formData.get('flightDate') as string,
        childName: formData.get('childName') as string,
      },
      employeeInfo: {},
    };

    console.log(payload);

    mutation.mutate(payload);
  };

  const findParents = useCallback(() => {
    const query = trpc.parent.find.useQuery({
      phone: parentPhone,
    });

    return query.data?.data || [];
  }, [parentPhone]);

  return (
    <main className='flex flex-row gap-20 p-12'>
      <div className='flex flex-col gap-4'>
        <h1>Создание документа</h1>
        <div className='w-full'>
          <InputText
            type='text'
            name='parentPhoneSearch'
            onChange={(e) => setParentPhone(e.target.value)}
          />
        </div>
        {findParents().map((p, index) => (
          <p
            className='w-full rounded border border-main-blue p-2 hover:bg-main-gray'
            key={index}
            onClick={() => {
              setParentId(p.userId);
              setparentName(`${p.firstName} (${p.phone})`);
            }}
          >
            {`${p.firstName} (${p.phone})`}
          </p>
        ))}
      </div>
      <form action={handleFormSubmit} className='flex flex-col gap-2'>
        <p>Выбранный родитель:</p>
        <InputText
          name='parentId'
          type='text'
          value={parentName}
          readonly={true}
        />
        <p>Имя ребенка</p>
        <InputText
          name='childName'
          type='text'
        />
        <p>Время вылета</p>
        <InputText
          name='flightDate'
          type='text'
        />
        <InputButton type='submit' value='Создать' />
      </form>
    </main>
  );
};

export default NewDocument;
