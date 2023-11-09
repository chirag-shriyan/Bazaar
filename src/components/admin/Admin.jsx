import React, { useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'

export default function Admin({ children, title }) {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        document.title = `Admin | ${title}`
    }, [])

    return (
        <>

            <div

                className={
                    `w-[13%] min-h-[100dvh] bg-black fixed text-white overflow-hidden overflow-y-auto styled-scrollbar-light
                    max-2xl:w-[20%] 
                    max-lg:AdminNavBar ${showMenu ? 'h-[300px]' : 'h-[60px]'}`
                }

            >
                <AdminSideBar showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>


            <div className='p-5 w-[87%] absolute right-0 max-2xl:w-[80%] max-lg:w-full max-lg:top-[60px]'>
                {children}
            </div>
        </>
    )
}
