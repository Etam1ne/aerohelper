import { ChangeEventHandler } from 'react';

export interface IInputTextProps {
    name: string;
    type: 'text' | 'email' | 'password';
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const InputText = (props: IInputTextProps) => {
    return (
        <input
            onChange={props.onChange}
            type={props.type}
            name={props.name}
            value={props.value}
            className={`${props.name} border-main-darkgray border rounded active:bg-main-gray focus:bg-main-gray p-2`}
        />
    );
}