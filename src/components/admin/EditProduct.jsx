import { Link, useParams } from "react-router-dom"
import Admin from "./Admin";
import NotFound from "../NotFound";
import useTopLoading from "../../contexts/topLoadingContext";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { FirebaseStorage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function EditProduct() {

    const { id: productId } = useParams();

    const { setTopLoadingProgress } = useTopLoading();
    const categories = ['Shirt', 'Pant', 'T-Shirt', 'Jeans'];
    const defaultSelected = '- - Select - -'

    const [product, setProduct] = useState();
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);
    const [productCategories, setProductCategories] = useState(defaultSelected);
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

    const getProducts = async () => {
        let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
        res = await res.json();
        setProduct(res.data);
    }

    const uploadImage = async (image) => {
        setError('');
        if (new RegExp('image/').test(image.type)) {
            const imageName = `${new Date().toJSON()}-${image.name}`;
            const ImageRef = ref(FirebaseStorage, `Product Images/${imageName}`);

            await uploadBytes(ImageRef, image);
            const ImageUrl = await getDownloadURL(ref(FirebaseStorage, `Product Images/${imageName}`));

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


    const updateProduct = async (e) => {
        e.preventDefault();
        setError('');

        if (productName && productDescription && productPrice > 0 && productQuantity > 0 && productCategories !== defaultSelected) {

            setTopLoadingProgress(30);
            const productImageUrl = productImage && await uploadImage(productImage);

            if (productImageUrl) {
                let res = await fetch(import.meta.env.VITE_API_URL + `/api/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "name": productName,
                            "description": productDescription,
                            "price": productPrice,
                            "quantity": productQuantity,
                            "image": productImageUrl,
                            "categories": productCategories
                        }
                    )

                });

                setTopLoadingProgress(70);

                res = await res.json();
                setTopLoadingProgress(100);
            }
            else {
                let res = await fetch(import.meta.env.VITE_API_URL + `/api/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "name": productName,
                            "description": productDescription,
                            "price": productPrice,
                            "quantity": productQuantity,
                            "categories": productCategories
                        }
                    )

                });

                setTopLoadingProgress(70);

                res = await res.json();
                setTopLoadingProgress(100);
            }


        }
        else {
            setError('');
            if (!productName) {
                setError('Name is required');
            }
            else if (!productDescription) {
                setError('Description is required');
            }
            else if (!productPrice) {
                setError('Price is required and should be greater than 0');
            }
            else if (!productQuantity) {
                setError('Quantity is required and should be greater than 0');
            }
            else if (productCategories === defaultSelected) {
                setError('Categories is required');
            }

        }
    }

    useEffect(() => {
        getProducts();

    }, [])

    useEffect(() => {
        if (product) {
            setProductName(product.name);
            setProductDescription(product.description);
            setProductPrice(product.price);
            setProductQuantity(product.quantity);
            setProductCategories(product.categories);
        }

    }, [product])

    return (

        product ?

            <form className='pt-28 space-y-2 w-full grid place-content-center max-sm:mt-0' onSubmit={(e) => { goToNextInput(e) }}>

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

                {/* Errors */}
                {error && <b className='text-red-600'>{error}</b>}

                <Button variant='contained' className='!mt-4 h-10' onClick={updateProduct}>Update Product</Button>
                <Link to={'/admin/products'}>
                    <Button variant='contained' color='error' className='!mt-2 w-full h-10'>Cancel Update</Button>
                </Link>

                <button className='hidden'></button>

            </form>


            :
            <NotFound />
    )
}
