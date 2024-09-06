import React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const ExistingTenancy = (props) => {
    return (
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', mx: 1 }}>
            {props?.allTenancy?.map((item) => {
                return (
                    <>
                        {item.start_date && item.end_date ? (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    console.log('👩‍🦲', item);
                                }}
                            >
                                [ {item.start_date} - {item.end_date} ]
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    console.log('🤱', item);
                                }}
                            >
                                [ No Date]
                            </Button>
                        )}
                    </>
                );
            })}
        </Box>
    );
};

export default ExistingTenancy;
