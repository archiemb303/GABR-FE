import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import Aboutus from '../Prelogin/Aboutus';
import Contact from '../Prelogin/Contact';
import Home from '../Prelogin/Home';
import Howitworks from '../Prelogin/Howitworks';
import Signup from '../Prelogin/Login';
import PrivacyPolicy from '../Prelogin/PrivacyPolicy';
import TermsandConditions from '../Prelogin/Terms&Conditions';
import Testimonials from '../Prelogin/Testimonials';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
// const FirebaseLogin = Loadable(lazy(() => import('./login/FirebaseLogin')));
const JwtLogin = Loadable(lazy(() => import('./login/JwtLogin')));
// const CustomLogin = Loadable(lazy(() => import('../Prelogin/Login')));
const CustomLogin = Loadable(lazy(() => import('../Prelogin/Signup')));
// const Auth0Login = Loadable(lazy(() => import("./login/Auth0Login")));
// const FirebaseRegister = Loadable(lazy(() => import('./register/FirebaseRegister')));
const JwtRegister = Loadable(lazy(() => import('./register/JwtRegister')));

const sessionRoutes = [
    {
        path: '/session/signup',
        element: <JwtRegister />,
    },
    {
        path: '/session/login',
        element: <Home />,
    },
    {
        path: '/session/signin',
        element: <CustomLogin />,
    },
    {
        path: '/session/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/session/404',
        element: <NotFound />,
    },
    {
        path: '/session/home',
        element: <Signup />,
    },
    {
        path: '/session/howwework',
        element: <Howitworks />,
    },
    {
        path: '/session/testimonials',
        element: <Testimonials />,
    },
    {
        path: '/session/aboutus',
        element: <Aboutus />,
    },
    {
        path: '/session/contactus',
        element: <Contact />,
    },
    {
        path: '/session/termsandconditions',
        element: <TermsandConditions />,
    },
    {
        path: '/session/privacypolicy',
        element: <PrivacyPolicy />,
    },
];

export default sessionRoutes;
