'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { PagesEnum } from '../../../enums';

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const router = useRouter();

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token && pathName !== PagesEnum.LOGIN) {
      router.push(PagesEnum.LOGIN);
    }
  };

  useEffect(checkToken, [pathName, router]);

  return <>{children}</>;
};
