import { useState, useEffect } from 'react'

import { Alert, IconButton } from '@mui/material'
import { IoCloseCircleOutline } from "react-icons/io5";


export default function CustomAlert({ message, showAlert, setShowAlert, alertType }) {


  useEffect(() => {
    const timer = setTimeout(function () {
      setShowAlert(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (

    showAlert && <div className='w-full grid justify-items-center'>

      <Alert
        severity={alertType}
        className='w-full'
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setShowAlert(false);
            }}
            className='relative bottom-[3px]'
          >
            <IoCloseCircleOutline className='text-2xl' />
          </IconButton>
        }
      >

        <strong>{message.length >= 50 ? message : message.substring(0, 50) + '...'}</strong>
      </Alert>

    </div>
  )
}
