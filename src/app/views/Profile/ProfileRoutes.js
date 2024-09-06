import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const EditProfile = Loadable(lazy(() => import('./EditProfile')));

const ProfileRoutes = [{ path: '/profile/editProfile', element: <EditProfile /> }];

export default ProfileRoutes;
