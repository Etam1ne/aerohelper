'use client';

import { redirect, useRouter } from 'next/navigation';
import { InputButton, InputText } from '../_components/form';
import { trpc } from '../_trpc/client';
import { PagesEnum } from '../../enums';
import { Role } from '@prisma/client';

const LoginPage = () => {
  const router = useRouter();

  const mutation = trpc.user.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem('token', String(data));
      router.push(PagesEnum.DOCUMENTS);
    }
  });

  const handleLogin = (formData: FormData) => {
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    mutation.mutate({
      login,
      password,
    });
  };

  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-main-gray'>
      <form
        action={handleLogin}
        className='flex flex-col gap-4 rounded-2xl bg-main-white px-6 py-8 shadow-md'
      >
        <h1 className='text-black w-full text-center'>Авторизация</h1>
        <InputText name='login' type='text' />
        <InputText name='password' type='password' />
        <InputButton value='Войти' type='submit' />
        <p className='w-full text-center -my-2'>Регистрация:</p>
        <div className='flex w-full justify-between'>
          <InputButton value='Сотрудник' type='button' onClick={() => router.push(`${PagesEnum.USERS}/${Role.employee}`)}/>
          <InputButton value='Родитель' type='button' onClick={() => router.push(`${PagesEnum.USERS}/${Role.parent}`)}/>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
