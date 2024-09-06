import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Card, TextField, useMediaQuery } from "@mui/material";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import "./swiper.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  generateOtpAction,
  verifyOtpAction,
} from "app/redux/actions/PreloginActions";
// import BackSlider from "./BackSlider"
import Loading from "app/components/MatxLoading";
import CustomSnackbar from "app/components/CustomSnackbar";
import { useTheme as useMuiTheme } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();
  const prelogin = useSelector((state) => state.prelogin);
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
  const theme = useMuiTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    // validating the email
    if (prelogin.userSessionId && !prelogin.isLoggedIn) {
      setOtpInputVisible(true);
      setDisableClick(false);
    }
  }, [prelogin]);

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  const SendOTPBtn = () => {
    return GENERATE_OTP?.isLoading === true ? (
      <Box sx={{ mt: 3 }}>
        <Loading />
      </Box>
    ) : (
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
    );
  };

  const VerifyOTPBtn = useMemo(() => {
    function VerifyOtpButton() {
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
          <TextField
            disabled={disableClick}
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
              console.log("Check");
              setOtp(ev.target.value);
            }}
            required
          />

          <Box sx={{ display: "flex", gap: 5 }}>
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
              Change Email
            </Button>
          </Box>

          {
            (seconds > 0 || minutes > 0) && !errorCounter && (
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ color: custom.text.disabled }}
              >
               Resend OTP in {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </Typography>
            )

            // <>
            //   {VERIFY_OTP?.error ? setOtp("") : ""}
            //   <Typography
            //     variant="body1"
            //     textAlign="center"
            //     sx={{ color: custom.text.disabled }}
            //   >
            //     Didn't receive code?
            //   </Typography>
            // </>
          }
        </>
      );
    }
    return VerifyOtpButton;
  }, [email]);
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

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2023/02/14/04/39/house-7788811_1280.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        <Card
          sx={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2023/02/14/04/39/house-7788811_1280.jpg)",
            minWidth: matches ? 500 : 200,
            marginX: "20px",
            marginTop: "30px",
          }}
        >
          <Box
            sx={{
              minHeight: "500px",
              height: "100%",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              color="black"
              textAlign={"center"}
              mb={3}
              letterSpacing="0.1em"
              fontSize={"20px"}
            >
              Get your Rental Agreement hassle free
            </Typography>
            <Box pl={6}>
              <Typography color="grey" letterSpacing="0.1em" mb={2}>
                1. Add Property Details
              </Typography>
              <Typography color="grey" letterSpacing="0.1em" mb={2}>
                2. Add Tenancy Terms
              </Typography>
              <Typography color="grey" letterSpacing="0.1em" mb={2}>
                3. Add Property Images
              </Typography>
              <Typography color="grey" letterSpacing="0.1em" mb={2}>
                4. Add Parties
              </Typography>
              <Typography color="grey" letterSpacing="0.1em" mb={2}>
                5. Sign using Adhaar OTP
              </Typography>
              <Typography color="grey" letterSpacing="0.1em" mb={2}>
                6. Get Rental agreement instantly on e-stamp paper
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            py: 3,
            minWidth: matches ? 500 : 350,
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2023/02/14/04/39/house-7788811_1280.jpg)",
            backgroundPosition: "cover",
            minHeight: "500px",
            marginX: "20px",
            marginTop: "30px",
          }}
        >
          <Box sx={{ width: 200, height: 100 }}>
            <img
              style={{ objectFit: "contain", height: "100%", width: "100%" }}
              src="http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
            ></img>
          </Box>

          <Typography
            variant="h4"
            align="center"
            sx={{
              color: custom.heading.preloginheading,
            }}
          >
            LOG IN NOW!
          </Typography>

          <TextField
            disabled={otpInputVisible || disableClick}
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
          {GENERATE_OTP?.isLoading === true ? (
            <Box sx={{ mt: 3 }}>
              <Loading />
            </Box>
          ) : (
            <>{!otpInputVisible ? <SendOTPBtn /> : <VerifyOTPBtn />}</>
          )}
        </Card>
      </Box>
    </>
  );
}
