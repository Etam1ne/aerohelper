'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export interface INavItem {
  children: React.ReactNode;
  path: string;
}

export const NavItem = (props: INavItem) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(props.path);
  };

  return <div onClick={handleClick}>{props.children}</div>;
};
