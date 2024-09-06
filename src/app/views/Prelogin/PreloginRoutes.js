import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import Aboutus from './Aboutus';

const Login = Loadable(lazy(() => import('./Login')));

const PreloginRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/aboutus', element: <Aboutus /> },
];
export default PreloginRoutes;
