'use client'

import { redirect } from 'next/navigation';
import { InputButton, InputText } from '../_components/form';
import { trpc } from '../_trpc/client';
import { PagesEnum } from '../../enums';

const LoginPage = () => {
    const mutation = trpc.user.login.useMutation();

    const handleLogin = (formData: FormData) => {
        const login = formData.get('login') as string;
        const password = formData.get('password') as string;

        mutation.mutate({
            login,
            password,
        })
        if (mutation.data) {
            localStorage.setItem('token', String(mutation.data))
            redirect(PagesEnum.DOCUMENTS)
        }
    }

    return (
        <main className='w-full min-h-screen flex items-center justify-center bg-main-gray'>
            <form action={handleLogin} className='flex py-8 px-6 bg-main-white rounded-2xl shadow-md gap-4 flex-col'>
                <h1 className='text-black '>Авторизация</h1>
                <InputText name='login' type='text'/>
                <InputText name='password' type='password'/>
                <InputButton value='Войти' type='submit'/>
            </form>
        </main>
    )
}

export default LoginPage;