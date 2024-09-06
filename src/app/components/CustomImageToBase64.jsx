import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';

const CustomImageToBase64 = () => {
    const [imageBase64, setImageBase64] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);

    const urlToBase64 = (url) =>
        fetch(url)
            .then((response) => response.blob())
            .then(
                (blob) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    })
            );


    const imgToBase64 = (img) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(img);
        });

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <Typography variant="h5" color="initial">
                    CustomImageToBase64
                </Typography>

                <input
                    type="file"
                    onChange={(ev) => {
                        const img = ev.target.files[0];
                        console.log(img)

                        imgToBase64(img).then((res) => {
                            console.log('🙏 Image to base 64 = ', res);
                            setImageFileUrl(res);
                        });

                        urlToBase64('https://cdn.pixabay.com/photo/2019/06/05/08/37/dog-4253238_1280.jpg').then(
                            (base64) => {
                                console.log('😋 url to base 64 = ', base64);
                                setImageBase64(base64);
                            }
                        );
                    }}
                />
                {imageFileUrl && (
                    <Box>
                        <Typography variant="body1" color="initial">
                            imgToBase64
                        </Typography>
                        <img src={imageFileUrl} alt="demo" height={100} width={100} />
                    </Box>
                )}
                {imageBase64 && (
                    <Box>
                        <Typography variant="body1" color="initial">
                            urlToBase64
                        </Typography>
                        <img src={imageBase64} alt="demo" height={100} width={100} />
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default CustomImageToBase64;
