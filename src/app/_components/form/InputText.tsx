import { ChangeEventHandler } from 'react';

export interface IInputTextProps {
  name: string;
  type: 'text' | 'email' | 'password';
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  readonly?: boolean;
  placeholer?: string;
}

export const InputText = (props: IInputTextProps) => {
  return (
    <input
      placeholder={props.placeholer}
      onChange={props.onChange}
      readOnly={props.readonly}
      type={props.type}
      name={props.name}
      value={props.value}
      className={`${props.name} rounded border border-main-darkgray p-2 focus:bg-main-gray active:bg-main-gray`}
    />
  );
};
