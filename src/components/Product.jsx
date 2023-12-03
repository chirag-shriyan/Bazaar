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
    getProduct()
  }, [])

  console.log(product);
  return (
    product ?
      <div>{productId}</div>
      :
      <h1>Product Not Found</h1>
  )
}
