'use client';

import { useParams } from 'next/navigation';
import { trpc } from '../../../_trpc/client';
import { DocumentPointEnum } from '../../../../enums';
import { DocumentPoint } from '../../../_components/documents';
import { DocumentPersonInfoType } from '../../../../types';
import { InputButton } from '../../../_components/form';

const DocumentPage = () => {
  const id = useParams<{ id: string }>().id;

  const query = trpc.document.byId.useQuery({ id });
  const me = trpc.user.me.useQuery();
  const mutation = trpc.document.update.useMutation({
    onSuccess: () => {
        query.refetch();
    },
  });

  const document = query.data?.data;

  const handleForm = (formData: FormData) => {
    const documentInfo: DocumentPersonInfoType = {};

    Object.values(DocumentPointEnum).forEach((point) => {
      const checked = Boolean(formData.get(point));
      documentInfo[point] = {
        checked,
        date:
          !document?.employeeInfo[point]?.date && checked
            ? new Date().toISOString()
            : document?.employeeInfo[point]?.date,
      };
    });
    if (document?.id) {
      mutation.mutate({
        id: document.id,
        employeeInfo: documentInfo,
      });
    }
  };

  return (
    <main className='flex h-screen w-screen justify-center'>
      {query.isSuccess && (
        <form action={handleForm} className='flex flex-col gap-2 p-2'>
          <p>{'Ребенок: ' + (document?.parentInfo?.childName ?? ' -- ')}</p>
          <p>Провожающий: имя </p>
          <p>Встречающий: имя </p>
          <p>Сопровождающий: имя </p>
          <p>Рейс: —</p>
          <p>Маршрут: — </p>
          <p>Статус рейса: — </p>
          <p>{'Время вылета: ' + (document?.parentInfo?.flightDate ?? ' -- ')}</p>

          <p className='text-xs underline w-full text-right cursor-pointer text-main-blue'>Показать пакет документов<br/>Комментарии</p>
          {Object.values(DocumentPointEnum).map((point, index) => {
            const documentPoint = document?.employeeInfo[point];
            return (
              <DocumentPoint
                checked={documentPoint?.checked}
                point={point}
                date={documentPoint?.date}
                key={index}
                role={me.data?.role}
              />
            );
          })}
          {Object.values(DocumentPointEnum).some((point) => {
            const documentPoint = document?.employeeInfo[point];
            return !documentPoint?.checked;
          }) && <InputButton type='submit' value='Сохранить' />}
        </form>
      )}
    </main>
  );
};

export default DocumentPage;
