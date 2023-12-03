import { useState } from 'react'
import Logo from '../../public/logo.svg'
import { Link } from 'react-router-dom'
import { Avatar, Badge, ListItemIcon, Menu, MenuItem } from '@mui/material'

import useAuth from '../contexts/authContext';
import useSnackbar from '../contexts/snackbarContext';

import { TbLogout2 } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import Cart from './Cart';

export default function Navbar() {

  const { currentUser, logout, isLoggedIn } = useAuth();
  const { setSnackbar } = useSnackbar();

  const [cartOpen, setCartOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cartToggle = () => {
    if (cartOpen) {
      setCartOpen(false);
      handleClose();
    }
    else {
      setCartOpen(true);
      handleClose();
    }
  }

  const handleLogout = async () => {

    if (isLoggedIn) {
      await logout();
      handleClose();
      setSnackbar({ message: 'Logged out', showSnackBar: true });
    }
  }

  return (
    <div className='w-full h-16 bg-black grid justify-items-center'>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />

      <div className='w-full h-16 container flex justify-between '>

        <Link to={'/'}>
          <h1 className='text-5xl text-[#0a77fa] flex items-end hover:cursor-pointer'>
            <img src={Logo} alt="" className='w-[40px] h-[40px]' />
            <p className='relative top-[2px]'>azaar</p>
          </h1>
        </Link>

        <div className='flex items-center m-2 space-x-5'>

          <div onClick={cartToggle}>
            <Badge badgeContent={1} color='primary' className='cursor-pointer badge-red'>
              <FaShoppingCart className='text-white text-3xl' />
            </Badge>
          </div>

          <Avatar className='hover:cursor-pointer grid justify-items-center' onClick={handleClick}>
            {currentUser?.username?.charAt(0).toUpperCase()}
          </Avatar>


          {isLoggedIn ?
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  width: 180,
                  padding: '8px',
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem className='!hidden' />

              <MenuItem onClick={handleClose} tabIndex={-1} className='!rounded-md !mb-1'>
                <Avatar>
                  {currentUser?.username?.charAt(0).toUpperCase()}
                </Avatar>
                Profile
              </MenuItem>

              <MenuItem onClick={handleClose} className='!rounded-md !mb-1'>
                <ListItemIcon>
                  <IoSettings className='text-3xl relative right-1' />
                </ListItemIcon>
                Settings
              </MenuItem>

              <MenuItem onClick={cartToggle} className='!rounded-md !mb-1'>
                <ListItemIcon>
                  <FaShoppingCart className='text-3xl relative right-1' />
                </ListItemIcon>
                Cart
              </MenuItem>

              <MenuItem onClick={handleLogout} className='!rounded-md !mb-1'>
                <ListItemIcon>
                  <TbLogout2 className='text-3xl relative right-[5px]' />
                </ListItemIcon>
                Logout
              </MenuItem>

            </Menu>
            :
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  width: 180,
                  padding: '8px',
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem className='!hidden' />

              <Link to={'/login'}>
                <MenuItem className='!rounded-md !mb-1'>
                  <ListItemIcon>
                    <FiLogIn className='text-3xl relative right-2' />
                  </ListItemIcon>
                  Log In
                </MenuItem>
              </Link>

              <Link to={'/signup'}>
                <MenuItem className='!rounded-md !mb-1'>
                  <ListItemIcon>
                    <IoPersonAddOutline className='text-3xl relative right-2' />
                  </ListItemIcon>
                  Sign Up
                </MenuItem>
              </Link>

            </Menu>
          }

        </div>

      </div>



    </div>
  )
}
