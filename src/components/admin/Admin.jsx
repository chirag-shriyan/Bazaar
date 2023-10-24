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
                    `w-[10%] min-h-[100dvh] bg-black fixed text-white overflow-hidden overflow-y-auto styled-scrollbar-light 
                     max-sm:AdminNavBar ${showMenu ? 'h-[300px]' : 'h-[60px]'}`
                }

            >
                <AdminSideBar showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>


            <div className='p-5 w-[90%] absolute right-0 max-sm:w-full  max-sm:top-[60px]'>
                {children}
            </div>
        </>
    )
}
