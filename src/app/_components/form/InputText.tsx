export interface IInputTextProps {
    name: string;
    type: 'text' | 'email' | 'password';
}

export const InputText = (props: IInputTextProps) => {
    return (
        <input
            type={props.type}
            name={props.name}
            className={`${props.name} border-main-darkgray border rounded active:bg-main-gray focus:bg-main-gray p-2`}
        />
    );
}