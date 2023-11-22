import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../contexts/authContext'
import Navbar from './Navbar';

export default function Home() {

  const { currentUser, hasRole } = useAuth();

  const superAdmin = currentUser.roles && hasRole(currentUser.roles, 'superAdmin');
  console.log(superAdmin);
  useEffect(() => {
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
    </>
  )
}
