import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import NotFound from './NotFound';

export default function Product() {

  const { id: productId } = useParams();

  const [product, setProduct] = useState();
  const [notFound, setNotFound] = useState(false);


  const getProduct = async () => {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
    res = await res.json();
    setProduct(res.data);
    setTimeout(function () {
      setNotFound(true);
    }, 100);
  }

  useEffect(() => {
    getProduct();
  }, [])

  return (
    product ?
      <>
        <Navbar />

        <div className='flex justify-center'>

          <div className='mt-28 p-5 container flex justify-between max-md:flex-col max-md:items-center'>

            <div className='max-w-[450px] max-h-[600px] grid place-content-center'>
              <img
                src={product?.image}
                alt="product image"
                className='rounded-md border'
              />
            </div>

            <div className='w-[65%] p-5 flex flex-col max-md:w-full max-md:max-w-[450px]'>
              <h1 className='mb-1 text-4xl'>{product?.name}</h1>
              <h1 className='px-1 text-2xl'>₹{product?.price}</h1>
              <h1 className='mt-2 text-xl'>{product?.description}</h1>

              <div className='space-x-3 mt-16'>
                <Button variant='contained' color='success'>Buy Now</Button>
                <Button variant='contained' >Add To Cart</Button>
              </div>

            </div>

          </div>

        </div>

      </>
      :
      <>
        <Navbar />
        {notFound && <h1 className='mt-32 text-center text-5xl'>Product Not Found</h1>}
      </>



  )
}
