import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='w-full h-[100dvh] grid place-content-center bg-black text-white'>
            <div className='relative grid'>
                <h1 className='text-4xl'>404 | Not Found</h1>
                <Link to={'/'} className='text-xl text-center hover:underline'>Go back to home page</Link>
            </div>
        </div>
    )
}
