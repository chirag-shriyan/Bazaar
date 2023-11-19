import React from 'react'
import useSnackbar from '../../contexts/snackbarContext'

import { IconButton, Snackbar, Typography } from '@mui/material'
import { IoCloseCircleOutline } from "react-icons/io5";

export default function CustomSnackBar() {

    const { snackbar, setSnackbar } = useSnackbar();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };

    const action = (
        <>
            <IconButton
                aria-label="close"
                color="info"
                size="small"
                onClick={handleClose}
            >
                <IoCloseCircleOutline className='text-2xl' />
            </IconButton>
        </>
    );

    return (
        <Snackbar
            anchorOrigin={{ vertical: snackbar.vertical || 'bottom', horizontal: snackbar.horizontal || 'right' }}
            open={snackbar.showSnackbar}
            autoHideDuration={snackbar.autoHide}
            onClose={handleClose}
            message={<Typography noWrap>{snackbar.message}</Typography>}
            action={action}

        />
    )
}
