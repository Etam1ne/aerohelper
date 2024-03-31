'use client';

import { redirect, useRouter } from 'next/navigation';
import { InputButton, InputText } from '../_components/form';
import { trpc } from '../_trpc/client';
import { PagesEnum } from '../../enums';

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
        <h1 className='text-black '>Авторизация</h1>
        <InputText name='login' type='text' />
        <InputText name='password' type='password' />
        <InputButton value='Войти' type='submit' />
      </form>
    </main>
  );
};

export default LoginPage;
