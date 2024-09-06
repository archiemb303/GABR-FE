import { StyledEngineProvider } from "@mui/styled-engine";
import { SnackbarProvider } from "notistack";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Store from './app/redux/Store';
import App from "./app/App";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{ horizontal: "right", vertical: "top" }}>
        <Provider store={Store}>
          <App />
        </Provider>
      </SnackbarProvider>
    </BrowserRouter>
  </StyledEngineProvider>,
  document.getElementById("root")
);

