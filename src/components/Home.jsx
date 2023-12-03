import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../contexts/authContext'
import Navbar from './Navbar';
import MinProduct from './MinProduct';

export default function Home() {

  const { currentUser, hasRole } = useAuth();

  const superAdmin = currentUser.roles && hasRole(currentUser.roles, 'superAdmin');

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products?limit=8&created_at=desc`);
    res = await res.json();
    setProducts(res.data);
  }



  useEffect(() => {
    getProducts()
    document.title = `Bazaar | Home`
  }, [])
  // console.log(currentUser);
  return (

    <>
      <Navbar />

      <br />
      <h1 className='text-3xl font-bold'>User: {currentUser.email}</h1>
      <h1 className='text-3xl font-bold'>Role: {superAdmin ? 'superAdmin' : 'No Role'}</h1>
      <br />

      <Link to={'/login'}>Log In</Link>
      <br />
      <Link to={'/signup'}>Sign Up</Link>
      <br />
      <Link to={'/admin/banner'}>Admin</Link>

      <div className='px-5 mt-16 mb-32 container m-auto space-y-16'>

        <MinProduct products={products} />
        <MinProduct products={products} />
        <MinProduct products={products} />

      </div>

    </>
  )
}
