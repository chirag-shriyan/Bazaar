import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function MinProduct({ products }) {

    return (
        <div className='w-full grid grid-cols-4 gap-16 max-xl:grid-cols-2 max-md:grid-cols-1'>
            {
                products?.length > 0 && products.map((product) => {
                    return (
                        <Link to={`/products/${product._id}`} key={product._id}>
                            <Card sx={{ maxWidth: 545, minWidth: 300 }} >
                                <img
                                    className='w-full aspect-[3/2] object-contain'
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
                                            <b>Price: ₹{product.price} | Quantity: {product.quantity}</b>
                                            <b>Categories: {product.categories}</b>
                                        </div>
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Link>
                    )
                })
            }
        </div>
    )
}
