import React, { useState, useEffect } from 'react'

export default function Banner({ updateBanner }) {

    const [Banner, setBanner] = useState();

    const getBanner = async () => {
        const res = await fetch(import.meta.env.VITE_API_URL + '/api/banner');
        const { url } = await res.json();
        setBanner(url);
    }

    useEffect(() => {
        getBanner();
    }, []);

    useEffect(() => {
        updateBanner && getBanner();
    }, [updateBanner]);
    return (

        <>

            <div className='w-full grid justify-items-center'>

                <img
                    src={Banner ? Banner : 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg'}
                    className='w-[80%]  aspect-[3/1] rounded'
                />



            </div>
        </>


    )
}
