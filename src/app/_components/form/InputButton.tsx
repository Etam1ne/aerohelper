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
            className='bg-main-blue text-main-white p-2 rounded hover:cursor-pointer hover:bg-main-darkblue'
        />
    )
}