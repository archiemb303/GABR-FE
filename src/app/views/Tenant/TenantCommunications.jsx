import {
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
} from '@mui/material';
import {
    Card,
    Grid,
    Icon,
    IconButton,
    Typography,
    Button,
} from '@mui/material';
import { Box, Container, styled, useTheme } from '@mui/system';
import { H3, Paragraph } from 'app/components/Typography';
import React from 'react';

const TenantCommunications = () => {
    const statList = [
        {
            img: 'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_960_720.jpg',
            state: 'Malad, Mumbai',
            city: 'Centauri',
        },
        {
            img: 'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_960_720.jpg',
            state: 'Malad, Mumbai',
            city: 'Centauri',
        },
        {
            img: 'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_960_720.jpg',
            state: 'Malad, Mumbai',
            city: 'Centauri',
        },
        {
            img: 'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_960_720.jpg',
            state: 'Malad, Mumbai',
            city: 'Centauri',
        },
        {
            img: 'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_960_720.jpg',
            state: 'Malad, Mumbai',
            city: 'Centauri',
        },
    ];

    return (
        <Container>
            <Typography
                variant="h5"
                color="initial"
                my={4}
                textAlign="center"
                sx={{ color: '#0c5389' }}
            >
                Welcome to Tenant Owner. What do you want to do today?
            </Typography>

            <Grid
                container
                spacing={3}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {statList.map((item, ind) => (
                    <Grid key={item.title} item sm={'auto'} xs={12}>
                        <Card sx={{ flex: 1 }}>
                            <CardActionArea
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box sx={{ height: 80, width: 140 }}>
                                    <CardMedia
                                        component="img"
                                        image={item.img}
                                        alt={item.city}
                                        sx={{ objectFit: 'fill' }}
                                    />
                                </Box>

                                <CardContent sx={{ flex: 'auto' }}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {item.city}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {item.state}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TenantCommunications;
