import { MouseEventHandler } from 'react';

export interface IInputButtonProps {
  value: string;
  type: 'submit' | 'button';
  onClick?: MouseEventHandler<HTMLInputElement>;
}

export const InputButton = (props: IInputButtonProps) => {
  return (
    <input
      onClick={props.onClick}
      type={props.type}
      value={props.value}
      className='rounded bg-main-blue p-2 text-main-white hover:cursor-pointer hover:bg-main-darkblue'
    />
  );
};
