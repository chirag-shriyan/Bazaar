import React, { useEffect, useState } from 'react'
import Logo from '../../../public/logo.svg'
import { Link } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { BiAddToQueue } from 'react-icons/bi'
import { BsImages } from 'react-icons/bs'
import { RiProductHuntLine } from 'react-icons/ri'
import { FiMenu } from 'react-icons/fi'
import { AiOutlineShoppingCart } from 'react-icons/ai'

export default function AdminSideBar({ showMenu, setShowMenu }) {

    const [active, setActive] = useState('');

    const currentActive = () => {
        const value = location.pathname.split('/')[2];
        setActive(value);
    }

    useEffect(() => {
        currentActive();
    }, [])

    return (

        <>
            {/* Logo */}
            <div
                className='ml-2 mt-2 w-full flex justify-between items-center max-lg:m-0 outline-none select-none'
            >

                <Link to={'/'}>
                    <h1 className='text-5xl text-[#0a77fa] flex items-end hover:cursor-pointer'>
                        <img src={Logo} alt="" className='w-[40px] h-[40px]' />
                        <p className='relative top-[2px]'>azaar</p>
                    </h1>
                </Link>
                
                <FiMenu className='text-3xl mr-2 hidden relative top-1 max-lg:block' onClick={() => showMenu ? setShowMenu(false) : setShowMenu(true)} />
            </div>

            <div className={`ml-4 mt-10 space-y-3 w-full flex flex-col bg-black`}>
                <Link
                    to={'/admin/dashboard'} className='w-fit space-x-2 text-lg flex items-center cursor-pointer'
                    onClick={(e) => setShowMenu(false)}
                    style={{ color: active === 'dashboard' && '#0a77fa' }}
                    id='Dashboard'
                >
                    <RxDashboard style={{ color: active === 'dashboard' && '#0a77fa' }} />
                    <h1>Dashboard</h1>
                </Link>

                <Link
                    to={'/admin/banner'} className='w-fit space-x-2 text-lg flex items-center cursor-pointer'
                    onClick={(e) => setShowMenu(false)}
                    style={{ color: active === 'banner' && '#0a77fa' }}
                    id='Banner'
                >
                    <BsImages style={{ color: active === 'banner' && '#0a77fa' }} />
                    <h1>Banner</h1>
                </Link>

                <Link
                    to={'/admin/products'} className='w-fit space-x-2 text-lg flex items-center cursor-pointer'
                    onClick={(e) => setShowMenu(false)}
                    style={{ color: active === 'products' && '#0a77fa' }}
                    id='Products'
                >
                    <RiProductHuntLine style={{ color: active === 'products' && '#0a77fa' }} />
                    <h1>Products</h1>
                </Link>

                <Link
                    to={'/admin/add-product'} className='w-fit space-x-2 text-lg flex items-center cursor-pointer'
                    onClick={(e) => setShowMenu(false)}
                    style={{ color: active === 'add-product' && '#0a77fa' }}
                    id='Add-Products'
                >
                    <BiAddToQueue style={{ color: active === 'add-product' && '#0a77fa' }} />
                    <h1>Add Products</h1>
                </Link>
                <Link
                    to={'/admin/orders'} className='w-fit space-x-2 text-lg flex items-center cursor-pointer'
                    onClick={(e) => setShowMenu(false)}
                    style={{ color: active === 'orders' && '#0a77fa' }}
                    id='Settings'
                >
                    <AiOutlineShoppingCart style={{ color: active === 'orders' && '#0a77fa' }} />
                    <h1>Orders</h1>
                </Link>
            </div>

        </>
    )
}
