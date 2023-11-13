import React, { useState, useRef } from 'react'
import Admin from './Admin'
import Banner from '../Banner'
import { Button } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FirebaseStorage } from '../../firebase';
import useTopLoading from '../../contexts/topLoadingContext';

export default function AdminBanner() {

    const { setTopLoadingProgress } = useTopLoading();

    const [productImage, setProductImage] = useState(null);
    const [error, setError] = useState('');
    const imageRef = useRef();

    const goToNextInput = (e) => {
        e.preventDefault();
        const currentElement = document.activeElement;
        const nextElement = currentElement.nextElementSibling;

        if (nextElement && currentElement.value.trim().length !== 0) {
            nextElement.focus();
        }

    }

    const uploadImage = async (image) => {
        setError('');
        if (new RegExp('image/').test(image.type)) {
            const ImageRef = ref(FirebaseStorage, `Banner Images/Banner`);

            await uploadBytes(ImageRef, image);
            const ImageUrl = await getDownloadURL(ref(FirebaseStorage, `Banner Images/Banner`));

            return ImageUrl
        }
        else {
            setError('Your image should be a image file');
            imageRef.current.value = '';
            setProductImage(null);
            setTopLoadingProgress(100);
            return null
        }
    }

    const changeImage = async () => {
        if (productImage) {
            alert('Press ok to continue with the process');
            setTopLoadingProgress(40);
            const url = await uploadImage(productImage);
            await fetch(import.meta.env.VITE_API_URL + '/api/banner', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: url,
                    adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2E3YTBlMjExNjkwYjM4MTg5M2M1MiIsImlhdCI6MTY5OTg3MDExM30.wsTv6yAhi2kFDoqoyJ8UjHCGw_8FKg6Fp4DoO7uC-68'
                })
            });

            setTopLoadingProgress(100);
            imageRef.current.value = '';
            setProductImage(null);
            setUpdateBanner(true);
        }
    }

    return (
        <Admin title={'Banner'}>

            <div className=''>

                <Banner />

                <form className='mt-10 space-y-2 w-full grid place-content-center max-sm:mt-0' onSubmit={(e) => { goToNextInput(e) }}>

                    <label htmlFor="image" className='font-bold text-xl'>Change Image</label>
                    <input type='file' id='image' placeholder='Product quantity'
                        className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                        onChange={(e) => setProductImage(e.target.files[0])}
                        ref={imageRef}
                    />

                    <Button variant='contained' className=' h-10' onClick={changeImage}>Change Image</Button>

                </form>

            </div>


        </Admin>
    )
}
