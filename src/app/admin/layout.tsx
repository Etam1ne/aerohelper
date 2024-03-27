'use client'

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode}>) => {
    return (
        <>
            {/* <div onClick={handleLogout}>clear</div> */}
            {/* <nav>
                <NavItem path={PagesEnum.DOCUMENTS}>text</NavItem>
            </nav> */}
            <main>{ children }</main>
        </>
    )
};

export default AdminLayout