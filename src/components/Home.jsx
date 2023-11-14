import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../contexts/authContext'

export default function Home() {

  const { currentUser } = useAuth();

  useEffect(() => {
    document.title = `Bazaar | Home`
  }, [])
  // console.log(currentUser);
  return (

    <>
      <div>Home</div>
      {currentUser && <h1 className='text-3xl font-bold'>User: {currentUser.email}</h1>}
      <br />

      <Link to={'/login'}>Log In</Link>
      <br />
      <Link to={'/signup'}>Sign Up</Link>
      <br />
      <Link to={'/admin/banner'}>Admin</Link>
    </>
  )
}
