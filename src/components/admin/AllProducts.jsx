import React, { useState, useEffect } from 'react'
import Admin from './Admin'
import ImageNotFound from '../../../public/static/image-not-found-1-scaled.png'

import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import useTopLoading from '../../contexts/topLoadingContext';
import { Link } from 'react-router-dom';


export default function AllProducts() {

    const { setTopLoadingProgress } = useTopLoading();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const getProducts = async () => {
        let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products?limit=8&created_at=desc`);
        res = await res.json();
        setProducts(res.data);
    }

    const getSearchProducts = async (search) => {
        let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products?limit=8&search=${search}&created_at=desc`);
        res = await res.json();
        setProducts(res.data);
    }

    const deleteProduct = async (productId) => {
        const confirm = prompt(`This action can't be undone if you sill want to proceed type:\n"i understand"`)

        if (confirm?.toLocaleLowerCase() === 'i understand') {
            let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
                method: 'DELETE'
            });
            res = await res.json();
            await getProducts();
        }
        else {
            alert('Product deletion failed');
        }

    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {

        const timer = setTimeout(async () => {
            if (search && search !== '') {
                setTopLoadingProgress(100);
                getSearchProducts(search);
            }
            else if (search === '') {
                getProducts();
            }
        }, 700);

        return () => clearTimeout(timer);
    }, [search]);


    return (
        <Admin title={'Products'}>
            {/* <button onClick={getProducts}>Get Products</button> */}
            <div className='w-full h-20 relative grid justify-items-center'>
                <input
                    type="text"
                    className='w-[50%] p-1 absolute border border-black rounded max-md:w-[100%]'
                    placeholder='Search Product'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='w-full grid grid-cols-4 gap-16 max-md:grid-cols-1'>
                {
                    products?.length > 0 && products.map((product) => {
                        return (
                            <div key={product._id}>
                                <Card sx={{ maxWidth: 545, minWidth: 300 }} >
                                    <img
                                        className='w-full aspect-[3/2] object-fill'
                                        src={product.image ? product.image : ImageNotFound}

                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {product.description}
                                        </Typography>

                                    </CardContent>
                                    <CardContent>
                                        <Typography variant="p" color="text.secondary">
                                            <div className='flex flex-col'>
                                                <b>Price: {product.price} | Quantity: {product.quantity}</b>
                                                <b>Categories: {product.categories}</b>
                                            </div>
                                        </Typography>
                                    </CardContent>

                                    <CardActions className='space-x-2'>
                                        <Link
                                            to={`/admin/edit/${product._id}`}
                                        >
                                            <Button size="small" variant='contained'>Edit</Button>
                                        </Link>

                                        <div onClick={() => deleteProduct(product._id)}>
                                            <Button
                                                size="small" variant='contained'
                                                color='error'

                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </Admin>
    )
}
