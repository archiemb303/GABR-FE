import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Card, Grid, TextField } from "@mui/material";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import "./swiper.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import Screenshot from "./images/Screenshot.png";
import * as Yup from "yup";
import {
  generateOtpAction,
  GENERATE_OTP,
  verifyOtpAction,
  VERIFY_OTP,
} from "app/redux/actions/PreloginActions";
// import BackSlider from "./BackSlider"
import image89 from "./images/image89.png";
import Loading from "app/components/MatxLoading";
import { Form, Formik } from "formik";
import NavBar from "./NavBar";
import CustomSnackbar from "app/components/CustomSnackbar";

export default function Home() {
  const dispatch = useDispatch();
  const prelogin = useSelector((state) => state.prelogin);
  const navigate = useNavigate();
  const [otpInputVisible, setOtpInputVisible] = useState(false);
  const [email, setEmail] = useState(prelogin.email);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableClick, setDisableClick] = useState(false); // disable the input and button
  const [waitForEmail, setWaitForEmail] = useState(false); // toggle the edit email button
  const { custom } = useTheme();
  const submitBtn = useRef(null);
  const verifyotpBtn = useRef(null);
  const { GENERATE_OTP, VERIFY_OTP } = useSelector(
    (store) => store.loadingAndError.loader
  );

  useEffect(() => {
    // validating the email
    if (prelogin.userSessionId && !prelogin.isLoggedIn) {
      setOtpInputVisible(true);
      setDisableClick(false);
    }
  }, [prelogin]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const SendOTPBtn = () => {
    return (
      <>
        <Grid
          item
          align="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            paddingBottom: "100px",
          }}
        >
          <Button
            ref={submitBtn}
            // disabled={!ValidateEmail(email)}
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            type="button"
            onClick={() => {
              if (ValidateEmail(email)) {
                setDisableClick(true);
                // setresendotpinterval(true);
                dispatch(
                  generateOtpAction({
                    email_id: email,
                    login_type: "email",
                  })
                );
              }
            }}
          >
            Send OTP
          </Button>

          {disableClick && (
            <Box sx={{ ml: 5, mt: 2 }}>
              <Loading />
            </Box>
          )}
        </Grid>
      </>
    );
  };

  // const VerifyOTPBtn = () => {
  //   const [minutes, setMinutes] = useState(0);
  //   const [seconds, setSeconds] = useState(10);
  //   const [errorCounter, seterrorCounter] = useState(false);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (seconds > 0) {
  //         setSeconds(seconds - 1);
  //       }
  //       if (seconds === 0) {
  //         if (minutes === 0) {
  //           clearInterval(interval);
  //         } else {
  //           setMinutes(minutes - 1);
  //           setSeconds(59);
  //         }
  //       }
  //     }, 1000);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, [seconds]);
  //   // useEffect(() => {
  //   //   if(VERIFY_OTP?.error)
  //   //   seterrorCounter(true);
  //   // },[VERIFY_OTP?.error]);
  //   const resendOTP = () => {
  //     setOtp("");
  //     dispatch(
  //       generateOtpAction({
  //         email_id: email,
  //         login_type: "email",
  //       })
  //     );
  //   };

  //   return (
  //     <>
  //       <Grid item align="center">
  //         <TextField
  //           disabled={disableClick}
  //           sx={{
  //             width: { md: 344, xs: 1 },
  //             ml: { md: 6, xs: 3 },
  //             height: { md: 12, xs: 2 },
  //           }}
  //           autoFocus
  //           label="OTP"
  //           type="text"
  //           value={otp}
  //           onKeyUp={(ev) => {
  //             if (ev.code === "Enter") {
  //               ev.preventDefault();
  //               verifyotpBtn.current.click();
  //             }
  //           }}
  //           onChange={(ev) => {
  //             setOtp(ev.target.value);
  //           }}
  //           required
  //         />
  //       </Grid>
  //       <Grid
  //         sx={{
  //           width: "70%",
  //           mt: 7,
  //           ml: { md: 12, xs: "60px" },
  //           display: "flex",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <Button
  //           variant="text"
  //           disabled={seconds > 0 || minutes > 0}
  //           onClick={resendOTP}
  //         >
  //           Resend OTP
  //         </Button>
  //         {VERIFY_OTP?.isLoading == true ? (
  //           <Box sx={{ mt: 2 }}>
  //             <Loading />
  //           </Box>
  //         ) : (
  //           <Button
  //             ref={verifyotpBtn}
  //             variant="contained"
  //             color="primary"
  //             onClick={() => {
  //               setDisableClick(!disableClick);
  //               dispatch(
  //                 verifyOtpAction({
  //                   otp: parseInt(otp, 10),
  //                   user_session_id: prelogin.userSessionId,
  //                 })
  //               );
  //             }}
  //           >
  //             Verify OTP
  //           </Button>
  //         )}
  //         <Button
  //           variant="text"
  //           color="primary"
  //           // disabled={seconds > 0 || minutes > 0}
  //           onClick={() => {
  //             setOtp("");
  //             setOtpInputVisible(false);
  //           }}
  //         >
  //           Change email
  //         </Button>
  //       </Grid>

  //       <Grid item xs={12}>
  //         {console.log("Error Counter: " + errorCounter)}
  //         {(seconds > 0 || minutes > 0) && !errorCounter ? (
  //           <Typography
  //             variant="body1"
  //             textAlign="center"
  //             sx={{ color: custom.text.disabled }}
  //           >
  //             Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
  //             {seconds < 10 ? `0${seconds}` : seconds}
  //           </Typography>
  //         ) : (
  //           <>
  //             {VERIFY_OTP?.error ? setOtp("") : ""}
  //             <Typography
  //               variant="body1"
  //               textAlign="center"
  //               sx={{ color: custom.text.disabled }}
  //             >
  //               Didn't receive code?
  //             </Typography>
  //           </>
  //         )}
  //       </Grid>
  //     </>
  //   );
  // };
  const VerifyOTPBtn = useMemo(() => {
    function VerifyOtpButton(){
      const prelogin = useSelector((state) => state.prelogin);
      const [otp, setOtp] = useState("");
      const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [errorCounter, seterrorCounter] = useState(false);

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
    // useEffect(() => {
    //   if(VERIFY_OTP?.error)
    //   seterrorCounter(true);
    // },[VERIFY_OTP?.error]);
    const resendOTP = () => {
      setOtp("");
      dispatch(
        generateOtpAction({
          email_id: email,
          login_type: "email",
        })
      );
    };

    return (
      <>
        <Grid item align="center">
          <TextField
            disabled={disableClick}
            sx={{
              width: { md: 344, xs: 1 },
              ml: { md: 6, xs: 3 },
              height: { md: 12, xs: 2 },
            }}
            autoFocus
            label="OTP"
            type="text"
            value={otp}
            onKeyUp={(ev) => {
              if (ev.code === "Enter") {
                ev.preventDefault();
                verifyotpBtn.current.click();
              }
            }}
            onChange={(ev) => {
              console.log("Check")
              setOtp(ev.target.value);
            }}
            required
          />
        </Grid>
        <Grid
          sx={{
            width: "70%",
            mt: 7,
            ml: { md: 12, xs: "60px" },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="text"
            disabled={seconds > 0 || minutes > 0}
            onClick={resendOTP}
          >
            Resend OTP
          </Button>
          {VERIFY_OTP?.isLoading == true ? (
            <Box sx={{ mt: 2 }}>
              <Loading />
            </Box>
          ) : (
            <Button
              ref={verifyotpBtn}
              variant="contained"
              color="primary"
              onClick={() => {
                setDisableClick(!disableClick);
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
          )}
          <Button
            variant="text"
            color="primary"
            // disabled={seconds > 0 || minutes > 0}
            onClick={() => {
              setOtp("");
              setOtpInputVisible(false);
            }}
          >
            Change email
          </Button>
        </Grid>

        <Grid item xs={12}>
          {(seconds > 0 || minutes > 0) && !errorCounter ? (
            <Typography
              variant="body1"
              textAlign="center"
              sx={{ color: custom.text.disabled }}
            >
              Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
          ) : (
            <>
              {VERIFY_OTP?.error ? setOtp("") : ""}
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ color: custom.text.disabled }}
              >
                Didn't receive code?
              </Typography>
            </>
          )}
        </Grid>
      </>
    );
    }
    return VerifyOtpButton;
  }, [])
  const a = useLocation().pathname;
  return (
    <>
      {VERIFY_OTP?.isLoading === false && (
        <CustomSnackbar
          loaderChild={VERIFY_OTP}
          successMessage="OTP Verified Successfully !"
          errorMessage="OTP was incorrect. Please try again."
        />
      )}
      {GENERATE_OTP?.isLoading === false && (
        <CustomSnackbar
          loaderChild={GENERATE_OTP}
          successMessage="OTP Sent Successfully !"
          errorMessage="OTP wasn't Sent, Some Error occurred! Please try again later."
        />
      )}
      {a === "/session/login" ? <NavBar /> : ""}
      <div style={{ position: "relative" }} id="SIGN UP">
        {/* <img
          style={{
            width: "100%",
            height: "750px",
          }}
          src={image89}
        /> */}
        {/* <BackSlider/> */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: { xs: "space-between" },
            ml: "12%",
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Box
            style={{
              position: "absolute",
              background: "rgb(129 116 116 / 89%)",
              "border-radius": "40px",
              marginTop: "-5%",
            }}
            sx={{
              backgroundColor: "white",
              top: { xs: "100px", md: "250px" },
              height: "auto",
              width: { xs: "75%", md: "30%" },
              paddingBottom: { xs: "20px", md: "24px" },
            }}
          >
            <Grid container spacing={5}>
              <Grid item sx={{ alignItems: "center" }}>
                <Typography
                  align="left"
                  style={{
                    "font-family": "ui-monospace",
                    "text-align": "center",
                  }}
                  sx={{
                    mt: { md: 3, xs: 3 },
                    mx: "1%",
                    color: "white",
                    fontSize: {
                      xl: "37px",
                      md: "24px",
                      lg: "30px",
                      sm: "19px",
                      xs: "19px",
                    },
                    width: { md: "102%" },
                  }}
                >
                  TenantOwner is a platform where you can find property on rent,
                  find tenants manage your entire tenancy journey
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            style={{
              position: "absolute",
              background: "rgb(129 116 116 / 89%);",
              "border-radius": "5px",
              // marginTop: '-5%',
            }}
            sx={{
              top: { xs: "260px", md: "120px" },
              backgroundColor: "white",
              ml: { lg: "50%", md: "40%", sm: "auto", xs: "auto" },
              height: "auto",
              width: { md: 452, xs: "auto" },
              marginTop: { xs: "auto", md: "0%" },
              marginRight: { xs: "9%" },
            }}
          >
            <Box sx={{ height: "68%", width: "100%", padding: "17px" }}>
              <Box
                component="img"
                src="http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
                sx={{ height: "100%", width: "inherit" }}
              />
            </Box>
            <Typography
              variant="h4"
              align="center"
              sx={{
                pt: 2,
                pb: "10%",
                color: custom.heading.preloginheading,
              }}
            >
              LOG IN NOW!
            </Typography>

            <Grid container spacing={5}>
              <Grid item>
                <TextField
                  disabled={otpInputVisible || disableClick}
                  sx={{
                    width: { md: 344, xs: 1 },
                    ml: { md: 6, xs: 3 },
                    height: { md: 12, xs: 2 },
                  }}
                  autoFocus
                  label="Email"
                  type="email"
                  value={email}
                  error={!ValidateEmail(email) && email !== prelogin.email}
                  helperText={
                    !ValidateEmail(email) && email !== prelogin.email
                      ? "Email is not correct"
                      : ""
                  }
                  onKeyUp={(ev) => {
                    if (ev.code === "Enter") {
                      ev.preventDefault();
                      submitBtn.current.click();
                    }
                  }}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                  }}
                  required
                />
              </Grid>
              {!otpInputVisible ? <SendOTPBtn /> : <VerifyOTPBtn />}
              {/* <Grid item xs={12}>
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
                            </Grid> */}
            </Grid>
          </Box>
        </Box>
      </div>
      {/* <img src={Screenshot} sx={{mx:10}} style={{"width":"100%","margin-top":"12%"}}/> */}
      {/* {a !== "/session/login" ? (
        <Box
          component="img"
          src={Screenshot}
          sx={{
            mx: { md: 4, xs: 1 },
            ml: { md: 5 },
            mt: { md: 2, xs: 5 },
            width: "95%",
            // p:10,
          }}
        />
      ) : (
        ""
      )} */}
    </>
  );
}
