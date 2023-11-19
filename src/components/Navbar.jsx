import { useState } from 'react'
import Logo from '../../public/logo.svg'
import { Link } from 'react-router-dom'
import { Avatar, ListItemIcon, Menu, MenuItem } from '@mui/material'
import useAuth from '../contexts/authContext';

import { TbLogout2 } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";

export default function Navbar() {

  const { currentUser } = useAuth();
  console.log(currentUser);
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

        <div className='flex items-center m-2'>

          <Avatar className='hover:cursor-pointer grid justify-items-center' onClick={handleClick}>
            {currentUser?.username.charAt(0)}
          </Avatar>

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
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <IoSettings className='text-3xl relative right-1' />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <TbLogout2 className='text-3xl relative right-[5px]' />
              </ListItemIcon>
              Logout
            </MenuItem>

          </Menu>
        </div>

      </div>



    </div>
  )
}
