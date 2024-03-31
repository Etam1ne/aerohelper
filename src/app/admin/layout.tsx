'use client';

import { Suspense } from 'react';

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <main>
        <Suspense>
          {children}
        </Suspense>
      </main>
    </>
  );
};

export default AdminLayout;
