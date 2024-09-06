import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";

const InstallPwa = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for the "beforeinstallprompt" event

    // Listen for the "beforeinstallprompt" event
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup event listener
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA installed");
        } else {
          console.log("PWA installation declined");
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  useEffect(() => {
    // Automatically close the Snackbar after 10 seconds (10000 milliseconds)
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Snackbar
      open={showPrompt}
      message={
        <Box display={"flex"} alignItems={"center"} gap={5}>
          <img
            src="/assets/images/tenant-logo-512x512.png"
            alt="App Logo"
            width={48}
            height={48}
          />
          <Typography>Enjoy a better experience with our App.</Typography>
        </Box>
      }
      action={
        <>
          <Button color="inherit" size="small" onClick={handleInstallClick}>
            Install
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

export default InstallPwa;
