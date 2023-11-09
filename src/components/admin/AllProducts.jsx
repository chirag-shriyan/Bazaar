import React, { useState, useEffect } from 'react'
import Admin from './Admin'
import ImageNotFound from '../../../public/static/image-not-found-1-scaled.png'


import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

export default function AllProducts() {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        console.log(import.meta.env.VITE_API_URL);
        let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products?limit=5&sort_by=!createdAt`);
        res = await res.json();
        setProducts(res.data);
        console.log(res);
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <Admin title={'Products'}>
            {/* <button onClick={getProducts}>Get Products</button> */}
            <div className='w-full grid grid-cols-4 gap-16 max-md:grid-cols-1'>
                {
                    products.length > 0 && products.map((product) => {
                        return (
                            <div key={product._id}>
                                <Card sx={{ maxWidth: 545, minWidth: 300 }} >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={product.image ? product.image : ImageNotFound}

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
                                            <b>Price:{product.price}</b>   <b>Quantity:{product.quantity}</b>
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button size="small" variant='contained' >Edit</Button>
                                        <Button size="small" variant='contained' color='error'>Remove</Button>
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
