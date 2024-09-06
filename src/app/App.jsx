import "../fake-db";
// import { AuthProvider } from "app/contexts/Auth0Context";
// import { AuthProvider } from 'app/contexts/JWTAuthContext';
import { AuthProvider } from "app/contexts/FirebaseAuthContext";
import { SettingsProvider } from "app/contexts/SettingsContext";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
import routes from "./routes";
import { fetchMyNotificationAction } from "./redux/actions/NotificationActions";
import { useEffect } from "react";
import InstallPWA from "./components/InstallPwa";
import customHistory from "./utils/customHistory";
import LeegalityProcureStatus from "./views/Postlogin/LeegalityProcureStatus";
import { SET_CURRENT_USER_LOCATION } from "./redux/actions/LocationActions";

const App = () => {
  const navigate = useNavigate();
  customHistory.navigate = navigate;
  const content = useRoutes(routes);
  const user = JSON.parse(localStorage.getItem("persistentState"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.isLoggedIn) {
      const interval = setInterval(() => {
        dispatch(fetchMyNotificationAction({}));
      }, 50000);
    }
  }, [user?.isLoggedIn]);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      dispatch({
        type: SET_CURRENT_USER_LOCATION,
        payload: {
          lat: coords.latitude,
          long: coords.longitude,
        },
      });
    });
  }, []);
  return (
    <SettingsProvider>
      <MatxTheme>
        <AuthProvider>{content}</AuthProvider>
        {/* <InstallPWA /> */}
      </MatxTheme>
    </SettingsProvider>
  );
};

export default App;
