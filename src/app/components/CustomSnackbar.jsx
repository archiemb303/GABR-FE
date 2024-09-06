import { Alert, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import { loaderAction } from 'app/redux/actions/LoadingAndErrorAction';
import React, { useEffect, useState } from 'react';

const CustomSnackbar = ({ successMessage, loaderChild,errorMessage }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [snackbarOpen, setSnackbarOpen] = useState(null);
    useEffect(() => {
        setSnackbarOpen(() => {
            if (loaderChild?.isLoading === true) {
                return false;
            } else if (loaderChild?.isLoading === false) {
                return true;
            }
            return null;
        });
    }, [loaderChild]);

    return (
        <>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
        >
            <Alert
                onClose={() => setSnackbarOpen(false)}
                severity={loaderChild?.error ? 'error' : 'success'}
                sx={{ width: matches ? '50vw' : '100vw' }}
                variant="filled"
            >
                {loaderChild?.error
                    ? errorMessage?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                    letter.toUpperCase())
                    : successMessage?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                          letter.toUpperCase()
                      )}
            </Alert>
        </Snackbar>
        </>
    );
};

export default CustomSnackbar;
