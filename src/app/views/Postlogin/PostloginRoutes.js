import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Dashboard = Loadable(lazy(() => import('./Dashboard')));
const Help = Loadable(lazy(() => import('./Help')));

const PostloginRoutes = [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/help', element: <Help /> },
];
export default PostloginRoutes;
