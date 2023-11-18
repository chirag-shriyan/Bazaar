import { useRef, useState, useEffect } from 'react';

import { FirebaseStorage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { Button } from '@mui/material';

import useTopLoading from '../../contexts/topLoadingContext';
import CustomAlert from '../states/CustomAlert';
import Admin from './Admin';

export default function AddProduct() {

    const { setTopLoadingProgress } = useTopLoading();
    const categories = ['Shirt', 'Pant', 'T-Shirt', 'Jeans'];
    const defaultSelected = '- - Select - -'

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);
    const [productCategories, setProductCategories] = useState(defaultSelected);
    const [productImage, setProductImage] = useState(null);

    const [alert, setAlert] = useState({ message: '', showAlert: false, type: 'error' });

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

        if (new RegExp('image/').test(image.type)) {
            const imageName = `${new Date().toJSON()}-${image.name}`;
            const ImageRef = ref(FirebaseStorage, `Product Images/${imageName}`);

            await uploadBytes(ImageRef, image);
            const ImageUrl = await getDownloadURL(ref(FirebaseStorage, `Product Images/${imageName}`));

            return { ImageUrl, imageName }
        }
        else {
            setAlert({ message: 'Your image should be a image file', showAlert: true, type: 'error' });
            imageRef.current.value = '';
            setProductImage(null);
            setTopLoadingProgress(100);
            return null
        }
    }

    const createProduct = async (e) => {
        e.preventDefault();

        if (productName && productDescription && productPrice > 0 && productQuantity > 0 && productCategories !== defaultSelected && productImage) {
            setTopLoadingProgress(30);
            const { ImageUrl, imageName } = await uploadImage(productImage);
            console.log(imageName);
            if (ImageUrl && imageName) {
                const res = await fetch(import.meta.env.VITE_API_URL + '/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            "name": productName,
                            "description": productDescription,
                            "price": productPrice,
                            "quantity": productQuantity,
                            "image": ImageUrl,
                            "imageName": imageName,
                            "categories": productCategories
                        }
                    )

                });

                setTopLoadingProgress(70);

                const resData = await res.json();
                console.log(resData);

                if (resData.status >= 200 && resData.status < 400) {
                    setAlert({ message: 'Products is successfully created', showAlert: true, type: 'success' });
                }
                else {
                    setAlert({ message: resData.message, showAlert: true, type: 'error' });
                }

                setTopLoadingProgress(100);

                setProductName('');
                setProductDescription('');
                setProductPrice(0);
                setProductQuantity(0);
                setProductCategories(defaultSelected);
                setProductImage(null);
                imageRef.current.value = '';

            }

        }
        else {
            if (!productName) {
                setAlert({ message: 'Name is required', showAlert: true, type: 'error' });
            }
            else if (!productDescription) {
                setAlert({ message: 'Description is required', showAlert: true, type: 'error' });
            }
            else if (!productPrice) {
                setAlert({ message: 'Price is required and should be greater than 0', showAlert: true, type: 'error' });
            }
            else if (!productQuantity) {
                setAlert({ message: 'Quantity is required and should be greater than 0', showAlert: true, type: 'error' });
            }
            else if (!productImage) {
                setAlert({ message: 'Image is required', showAlert: true, type: 'error' });
            }
            else if (productCategories === defaultSelected) {
                setAlert({ message: 'Categories is required', showAlert: true, type: 'error' });
            }

        }

    }


    return (

        <Admin title={'Add Product'}>

            <form className='mt-28 space-y-2 w-full grid place-content-center max-sm:mt-0' onSubmit={(e) => { goToNextInput(e) }}>

                <CustomAlert message={alert.message} showAlert={alert.showAlert} setShowAlert={setAlert} alertType={alert.type} />

                <label htmlFor="name" className='font-bold text-xl'>Product name</label>
                <input autoFocus type='text' id='name' placeholder='Product name'
                    className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />


                <label htmlFor="description" className='font-bold text-xl'>Product description</label>
                <input type='text' id='description' placeholder='Product description'
                    className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />


                <label htmlFor="price" className='font-bold text-xl'>Product price</label>
                <input type='number' id='price' placeholder='Product price'
                    className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px] noArrow'
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value >= 0 ? e.target.value : 0)}
                />


                <label htmlFor="quantity" className='font-bold text-xl'>Product quantity</label>
                <input type='number' id='quantity' placeholder='Product quantity'
                    className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px] noArrow'
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value >= 0 ? e.target.value : 0)}
                />

                <label htmlFor="image" className='font-bold text-xl'>Product image</label>
                <input type='file' id='image' placeholder='Product quantity'
                    className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                    onChange={(e) => setProductImage(e.target.files[0])}
                    ref={imageRef}
                />


                {/* <input type="" placeholder='Product category' className='p-1 border' /> */}
                <label htmlFor="categories" className='font-bold text-xl'>Product category</label>
                <select
                    id='categories'
                    className=' w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                    value={productCategories}
                    onChange={(e) => setProductCategories(e.target.value)}
                >

                    {categories.map((category) => {
                        return <option key={category}>{category}</option>
                    })
                    }
                    <option>- - Select - -</option>
                </select>

                <Button variant='contained' className='!mt-4 h-10' onClick={createProduct}>Create Product</Button>

                <button className='hidden'></button>

            </form>
        </Admin>
    )
}
