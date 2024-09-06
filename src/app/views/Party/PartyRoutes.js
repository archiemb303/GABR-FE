import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AddParty = Loadable(lazy(() => import('./AddParty')));
const TenancyTerm = Loadable(lazy(() => import('./TenancyTerm')));

const PartyRoutes = [
    { path: '/party/addParty', element: <AddParty /> },
    { path: '/party/tenancyTerm', element: <TenancyTerm /> },
];

export default PartyRoutes;
