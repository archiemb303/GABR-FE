import { Grid, Typography } from '@mui/material';
import React from 'react';

const CustomErrorListForForm = ({ errorObject }) => {
    if (errorObject) {
        return (
            <Grid item xs={12} display="flex" flexDirection="column">
                {errorObject &&
                    Object.keys(errorObject).map((key, i) => (
                        <Typography key={i} variant="caption" color="error">
                            {errorObject[key]}
                        </Typography>
                    ))}
            </Grid>
        );
    }
    return null;
};

export default CustomErrorListForForm;
