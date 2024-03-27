'use client'

import { redirect } from 'next/navigation';
import { trpc } from '../../../_trpc/client';
import { PagesEnum } from '../../../../enums';
import { CreateDocumentBodyDto } from '../../../../server/dtos';
import { InputText } from '../../../_components/form';

const NewDocument = () => {
    const mutation = trpc.document.create.useMutation();

    const handleFormSubmit = (formData: FormData) => {
        const payload: CreateDocumentBodyDto = {
            parentId: formData.get('parentId') as string,
            parentInfo: [],
            employeeInfo: [],
        };

        
        mutation.mutate(payload);
        
        if (mutation.data) {
            redirect(PagesEnum.DOCUMENTS)
        }
    }

    return (
        <form action={handleFormSubmit}>
            <InputText name='parentId' type='text'/>
            <input type="submit" value="create" />
        </form>
    )
};

export default NewDocument;