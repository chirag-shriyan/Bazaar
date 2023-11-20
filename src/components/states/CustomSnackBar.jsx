import React from 'react'
import useSnackbar from '../../contexts/snackbarContext'

import { Alert, IconButton, Snackbar, Typography } from '@mui/material'
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
            open={snackbar.showSnackBar}
            autoHideDuration={snackbar.autoHide || 6000}
            onClose={handleClose}
            message={!snackbar.type && snackbar.message}
            action={!snackbar.type && action}

        >

            {snackbar.type &&
                <Alert severity={snackbar.type} sx={{ width: '100%' }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="info"
                            size="small"
                            onClick={handleClose}
                        >
                            <IoCloseCircleOutline className='text-2xl relative bottom-[2px]' />
                        </IconButton>
                    }
                >

                    <Typography noWrap>{snackbar.message}</Typography>
                </Alert>

            }

        </Snackbar >
    )
}
