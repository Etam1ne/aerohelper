import { useState } from 'react';
import { documentPointEditor, documentPointTranslation, userRoleTranslation } from '../../../constants';
import { DocumentPointEnum } from '../../../enums';
import { Role } from '@prisma/client';

export type DocumentPointProps = {
  point: DocumentPointEnum;
  checked?: boolean;
  date?: string;
  role?: Role;
};

export const DocumentPoint = (props: DocumentPointProps) => {
  const [checked, setChecked] = useState<boolean>(props.checked ?? false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.checked && documentPointEditor[props.point] === props.role ) {
      setChecked(event.target.checked);
    }
  };

  return (
    <div className={`${props.checked ? 'bg-green-100' : documentPointEditor[props.point] === props.role ? 'bg-blue-50' : 'bg-gray-200'} 
    flex flex-row justify-between gap-2 border rounded-md px-4 py-2 shadow-md`}>
      <label className='w-1/3' htmlFor={props.point}>
        {documentPointTranslation[props.point]}
      </label>
      <div className='flex w-1/3 items-center justify-center'>
        <input
          className='size-5'
          type='checkbox'
          checked={checked}
          name={props.point}
          onChange={handleCheckboxChange}
        />
      </div>
      {(
        <p className='w-1/3 text-xs items-center text-right justify-center'>{
          props.date
          ? `Дата: ${new Date(props.date).toISOString().replace('T', ' ')}`
          : `доступно для редактирования - ${userRoleTranslation[documentPointEditor[props.point]].toLocaleLowerCase()}`}</p>
      )}
    </div>
  );
};
