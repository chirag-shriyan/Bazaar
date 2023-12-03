import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Product() {

  const { id: productId } = useParams();

  const [product, setProduct] = useState();


  const getProduct = async () => {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
    res = await res.json();
    setProduct(res.data);
  }

  useEffect(() => {
    getProduct();
  }, [])

  return (
    product ?
      <div>

        <h1 className='text-2xl'>{productId}</h1>
        <h1 className='text-2xl'>{product?.name}</h1>
        <h1 className='text-2xl'>{product?.description}</h1>
        <h1 className='text-2xl'>₹{product?.price}</h1>
        <h1 className='text-2xl'>{product?.quantity}</h1>
        <h1 className='text-2xl'>{product?.categories}</h1>


      </div>
      :
      <h1>Product Not Found</h1>
  )
}
