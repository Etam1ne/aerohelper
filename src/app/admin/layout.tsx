'use client';

import { Suspense } from 'react';

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      {/* <div onClick={handleLogout}>clear</div> */}
      {/* <nav>
                <NavItem path={PagesEnum.DOCUMENTS}>text</NavItem>
            </nav> */}
      <main>
        <Suspense>
          {children}
        </Suspense>
      </main>
    </>
  );
};

export default AdminLayout;
