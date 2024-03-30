'use client'

import { useParams } from 'next/navigation';
import { trpc } from '../../../_trpc/client';
import { DocumentPointEnum } from '../../../../enums';
import { DocumentPoint } from '../../../_components/documents';
import { DocumentPersonInfoType } from '../../../../types';
import { InputButton } from '../../../_components/form';

const DocumentPage = () => {
    const id = useParams<{ id: string }>().id;
    
    const query = trpc.document.byId.useQuery({ id });
    const mutation = trpc.document.update.useMutation();
        
    const document = query.data?.data;

    const handleForm = (formData: FormData) => {

        const documentInfo: DocumentPersonInfoType = {}

        Object.values(DocumentPointEnum).forEach((point) => {
                const checked = Boolean(formData.get(point));          
                documentInfo[point] = {
                    checked,
                    date: !document?.employeeInfo[point]?.date && checked
                        ? new Date().toISOString()
                        : document?.employeeInfo[point]?.date,
                }
            }
        )
        if (document?.id) {
            mutation.mutate({
                id: document.id,
                employeeInfo: documentInfo,
            })
            
        }
    }

    return (
        <main className='w-screen h-screen flex justify-center items-center'>
            {
                query.isSuccess &&
                <form action={handleForm} className='flex flex-col p-2 gap-2'>
                    {
                        Object.values(DocumentPointEnum).map((point, index) => {
                            const documentPoint = document?.employeeInfo[point];
                            return <DocumentPoint
                                checked={documentPoint?.checked}
                                point={point}
                                date={documentPoint?.date}
                                key={index}
                            />
                        })
                    }
                    {
                        Object.values(DocumentPointEnum).some((point) => {
                            const documentPoint = document?.employeeInfo[point];
                            return !documentPoint?.checked
                        })
                        && <InputButton type='submit' value='Сохранить'/>
                    }
                </form>
            }
        </main>
    );
}

export default DocumentPage;