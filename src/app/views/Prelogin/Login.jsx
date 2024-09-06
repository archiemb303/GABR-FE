import { useTheme } from '@emotion/react';
import Signup from '../Prelogin/Signup.jsx';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import Loading from 'app/components/MatxLoading';
import {
    generateOtpAction,
    verifyOtpAction,
} from 'app/redux/actions/PreloginActions';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Contact from './Contact.jsx';

const Login = () => {
    const dispatch = useDispatch();
    const { custom } = useTheme();
    const prelogin = useSelector((state) => state.prelogin);
    const navigate = useNavigate();
    const [otpInputVisible, setOtpInputVisible] = useState(false);
    const [email, setEmail] = useState(prelogin.email);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [disableClick, setDisableClick] = useState(false); // disable the input and button
    const [waitForEmail, setWaitForEmail] = useState(false); // toggle the edit email button
    const submitBtn = useRef(null);

    useEffect(() => {
        // Show the edit email button after delay to avoid multiple api calls
        let interval;
        if (disableClick) {
            interval = setInterval(() => setWaitForEmail(true), 5000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [disableClick]);

    useEffect(() => {
        if (prelogin.isLoggedIn) {
            navigate('/dashboard');
        }
    }, []);

    useEffect(() => {
        if (prelogin.isLoggedIn) {
            navigate('/dashboard');
        }

        // validating the email
        if (prelogin.userSessionId && !prelogin.isLoggedIn) {
            setOtpInputVisible(true);
            setDisableClick(false);
        }
    }, [prelogin]);

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        return false;
    }

    const OtpComponent = () => {
        const [minutes, setMinutes] = useState(0);
        const [seconds, setSeconds] = useState(10);

        useEffect(() => {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }, [seconds]);

        const resendOTP = () => {
            dispatch(
                generateOtpAction({
                    email_id: email,
                    login_type: 'email',
                })
            );
            setMinutes(0);
            setSeconds(10);
        };

        return (
            <>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="OTP"
                        value={otp}
                        onChange={(ev) => {
                            setOtp(ev.target.value);
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box
                        justifyContent={'space-between'}
                        display="flex"
                        gap={2}
                        mx="auto"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                dispatch(
                                    verifyOtpAction({
                                        otp: parseInt(otp, 10),
                                        user_session_id: prelogin.userSessionId,
                                    })
                                );
                            }}
                        >
                            Verify OTP
                        </Button>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => {
                                setOtpInputVisible(false);
                            }}
                        >
                            Enter different email ?
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box
                        className="countdown-text"
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {seconds > 0 || minutes > 0 ? (
                            <Typography
                                variant="body1"
                                sx={{ color: custom.text.disabled }}
                            >
                                Time Remaining:{' '}
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </Typography>
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{ color: custom.text.disabled }}
                            >
                                Didn't receive code?
                            </Typography>
                        )}

                        <Button
                            variant="text"
                            disabled={seconds > 0 || minutes > 0}
                            onClick={resendOTP}
                        >
                            Resend OTP
                        </Button>
                    </Box>
                </Grid>
            </>
        );
    };

    const LoginComponent = () => {
        return (
            <>
                <Grid item xs={12}>
                    <TextField
                        disabled={disableClick}
                        fullWidth
                        autoFocus
                        label="Email"
                        value={email}
                        type="email"
                        onKeyUp={(ev) => {
                            if (ev.code === 'Enter') {
                                ev.preventDefault();
                                submitBtn.current.click();
                            }
                        }}
                        onChange={(ev) => {
                            setEmail(ev.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        justifyContent={'center'}
                        display="flex"
                        gap={2}
                        mx="auto"
                    >
                        <Button
                            ref={submitBtn}
                            disabled={disableClick}
                            variant="contained"
                            color="primary"
                            onClick={async () => {
                                if (email.length < 1) {
                                    return;
                                }

                                if (ValidateEmail(email)) {
                                    setDisableClick(true);
                                    dispatch(
                                        generateOtpAction({
                                            email_id: email,
                                            login_type: 'email',
                                        })
                                    );
                                }
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </Grid>
                {disableClick && (
                    <Grid item xs={12} sx={{ my: 2 }}>
                        <Loading />
                        <Box
                            justifyContent={'center'}
                            display="flex"
                            gap={2}
                            mx="auto"
                        >
                            {waitForEmail && (
                                <Button
                                    variant="text"
                                    color="primary"
                                    onClick={() => {
                                        setDisableClick(false);
                                    }}
                                >
                                    Enter different email ?
                                </Button>
                            )}
                        </Box>
                    </Grid>
                )}
            </>
        );
    };

    return (
        <>
            <Container sx={{}}>
                <Typography
                    textAlign={'center'}
                    variant="h2"
                    my={3}
                    color="initial"
                >
                    Sign In
                </Typography>

                <Paper elevation={3} sx={{ width: '80%', mx: 'auto' }}>
                    <Grid
                        container
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Grid item sm={6}>
                            <Box sx={{ px: 3, py: 5 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    TenantOwner is a platform where you can find
                                    property on rent, find tenants, and also
                                    manage your entire tenancy journey all in
                                    one place.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={6}>
                            <Box sx={{ px: 3, py: 5 }}>
                                <Grid container spacing={2}>
                                    {otpInputVisible ? (
                                        <OtpComponent />
                                    ) : (
                                        <LoginComponent />
                                    )}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            {/* <Signup/> */}
        </>
    );
};

export default Login;
