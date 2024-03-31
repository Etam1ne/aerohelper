import { useState } from 'react';
import { documentPointTranslation } from '../../../constants';
import { DocumentPointEnum } from '../../../enums';

export type DocumentPointProps = {
  point: DocumentPointEnum;
  checked?: boolean;
  date?: string;
};

export const DocumentPoint = (props: DocumentPointProps) => {
  const [checked, setChecked] = useState<boolean>(props.checked ?? false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.checked) {
      setChecked(event.target.checked);
    }
  };

  return (
    <div className='flex w-full flex-row gap-2'>
      <label className='w-1/3' htmlFor={props.point}>
        {documentPointTranslation[props.point]}
      </label>
      <div className='flex w-1/3 items-center justify-center'>
        <input
          type='checkbox'
          readOnly={props.checked}
          checked={checked}
          name={props.point}
          onChange={handleCheckboxChange}
        />
      </div>
      {props.date && (
        <p className='w-1/3'>Дата: {new Date(props.date).toISOString()}</p>
      )}
    </div>
  );
};
