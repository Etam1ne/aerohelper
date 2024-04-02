'use client'

import { Role } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { InputButton, InputText } from '../../../_components/form';
import { userRoleTranslation } from '../../../../constants';
import { trpc } from '../../../_trpc/client';
import { PagesEnum } from '../../../../enums';
import { CreateEmployeeDto, CreateParentDto } from '../../../../server/dtos';

const CreateUserPage = () => {
    const router = useRouter();
    const role = useParams<{ role: Role }>().role;
    const createParent = trpc.user.createParent.useMutation({
        onSuccess: (data) => {
            localStorage.setItem('token', String(data));
            router.push(PagesEnum.DOCUMENTS)
        }
    })
    const createEmployee = trpc.user.createEmployee.useMutation({
        onSuccess: (data) => {
            localStorage.setItem('token', String(data));
            router.push(PagesEnum.DOCUMENTS)
        }
    })

    const handleFormSubmit = (formData: FormData) => {
        if (role === Role.employee) {
            const payload: CreateEmployeeDto = {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            };
            createEmployee.mutate(payload)
        } else if (role === Role.parent) {
            const payload: CreateParentDto = {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                phone: formData.get('phone') as string,
                firstName: formData.get('firstName') as string,
                middleName: formData.get('middleName') as string,
                lastName: formData.get('lastName') as string,
            };
            createParent.mutate(payload)
        }
    };

    return (
        <main className='flex w-full justify-center p-6'>
            <form
                className='flex flex-col gap-4'
                action={handleFormSubmit}
            >
                <h1>Регистрация пользователя: {userRoleTranslation[role]}</h1>
                {role === Role.parent
                ?
                <>
                    <InputText
                        name='lastName'
                        placeholer='Фамилия'
                        type='text'
                    />
                    <InputText
                        name='firstName'
                        placeholer='Имя'
                        type='text'
                    />
                    <InputText
                        name='middleName'
                        placeholer='Отчество'
                        type='text'
                    />
                    <InputText
                        name='phone'
                        placeholer='Телефон'
                        type='text'
                    />
                </>
                :
                <>
                </>}
                <InputText
                    name='email'
                    placeholer='Почта'
                    type='text'
                />
                <InputText
                    placeholer='Пароль'
                    name='password'
                    type='password'
                />
                <InputButton
                    type='submit'
                    value='Зарегистрироваться'
                />
            </form>
        </main>
    );
};

export default CreateUserPage;
