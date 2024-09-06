import {
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    TextField,
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

const Help = () => {
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

    const statListVideos = [
        {
            tag: (
                <iframe
                    src="https://www.youtube.com/embed/J828uvG8xC4"
                    title="Intel Humbles Nvidia"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            ),
            title: 'Portal overview',
        },
        {
            tag: (
                <iframe
                    src="https://www.youtube.com/embed/J828uvG8xC4"
                    title="Intel Humbles Nvidia"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            ),
            title: 'How to find Tenants',
        },
        {
            tag: (
                <iframe
                    src="https://www.youtube.com/embed/J828uvG8xC4"
                    title="Intel Humbles Nvidia"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            ),
            title: 'How to find House to Rent',
        },
        {
            tag: (
                <iframe
                    src="https://www.youtube.com/embed/J828uvG8xC4"
                    title="Intel Humbles Nvidia"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            ),
            title: 'How to Sign Rental Agreement',
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
                Please click on a video that is most closely related to your
                query
            </Typography>
            <Box sx={{}}>
                <Grid container spacing={3} justifyContent="center">
                    {statListVideos.map((item, ind) => (
                        <Grid
                            key={item.title}
                            item
                            sm={'auto'}
                            xs={12}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Box sx={{ width: 300, height: 150 }}>
                                            {item.tag}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            color="text.secondary"
                                            textAlign="center"
                                            mt={1}
                                        >
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ my: 6 }}>
                <Typography
                    variant="h5"
                    color="initial"
                    my={2}
                    textAlign="center"
                    sx={{ color: '#0c5389' }}
                >
                    Didn't find what you were looking for? Write to Us!
                </Typography>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alginItems: 'center',
                        paddingY: 4,
                        maxWidth: 400,
                        margin: '0 auto',
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            maxWidth: 300,
                            mx: 'auto',
                        }}
                    >
                        <Grid item>
                            <TextField
                                fullWidth
                                select
                                name="topic"
                                label="Topic"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                select
                                name="subTopic"
                                label="Sub Topic"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                name="query"
                                label="Query"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </Container>
    );
};

export default Help;
