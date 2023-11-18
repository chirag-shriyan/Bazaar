import { useState } from 'react'
import Logo from '../../public/logo.svg'
import { Link } from 'react-router-dom'
import { Avatar, Menu, MenuItem, Typography } from '@mui/material'
import useAuth from '../contexts/authContext';

export default function Navbar() {

  const { currentUser } = useAuth();
  console.log(currentUser?.username);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='w-full h-16 bg-black grid justify-items-center'>

      <div className='w-full h-16 container flex justify-between '>

        <Link to={'/'}>
          <h1 className='text-5xl text-[#0a77fa] flex items-end hover:cursor-pointer'>
            <img src={Logo} alt="" className='w-[40px] h-[40px]' />
            <p className='relative top-[2px]'>azaar</p>
          </h1>
        </Link>

        <div className='flex items-center'>

          <Avatar className='hover:cursor-pointer' onClick={handleClick}>

            {currentUser?.username.charAt(0)}

          </Avatar>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}

            PaperProps={{
              sx: { marginTop: '5px', width: '200px',left:1000},

            }}

          >
            <h1 className='m-2 text-xl font-bold'> {currentUser?.username}</h1>
            <MenuItem >Profile</MenuItem>
            <MenuItem >My account</MenuItem>
            <MenuItem >Logout</MenuItem>
          </Menu>

        </div>
      </div>



    </div>
  )
}
