import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (

    <>
      <div>Home</div>
      <Link to={'/login'}>Log In</Link>
      <br />
      <Link to={'/signup'}>Sign Up</Link>
      <br />
      <Link to={'/admin/banner'}>Admin</Link>
    </>
  )
}
