import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const TenantCommunications = Loadable(
    lazy(() => import('./TenantCommunications'))
);

const TenantRoutes = [
    { path: '/tenant/communications', element: <TenantCommunications /> },
];

export default TenantRoutes;
