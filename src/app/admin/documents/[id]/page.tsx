'use client'

import { useParams } from 'next/navigation';

const DocumentPage = () => {
    const id = useParams<{ id: string }>().id;
    return (<main>{id}</main>);
}

export default DocumentPage;