import useAuth from 'app/hooks/useAuth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
// import AllPages from '../routes';

// const userHasPermission = (pathname, user, routes) => {
//   if (!user) {
//     return false;
//   }
//   const matched = routes.find((r) => r.path === pathname);

//   const authenticated =
//     matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
//   return authenticated;
// };

// const AuthGuard = ({ children }) => { uui
//     const {
//         isAuthenticated,
//         // user
//     } = useAuth();
//     const { pathname } = useLocation();
//     //   const routes = flat(AllPages);

//     //   const hasPermission = userHasPermission(pathname, user, routes);
//     //   let authenticated = isAuthenticated && hasPermission;

//     // // IF YOU NEED ROLE BASED AUTHENTICATION,
//     // // UNCOMMENT ABOVE LINES
//     // // AND COMMENT OUT BELOW authenticated VARIABLE

//     let authenticated = isAuthenticated;
//     console.log('🤔pathname', pathname);
//     return (
//         <>
//             {authenticated ? (
//                 children
//             ) : (
//                 <Navigate replace to="/login" state={{ from: pathname }} />
//             )}
//         </>
//     );
// };

const AuthGuard = ({ children }) => {
    const { pathname } = useLocation();

    const { isLoggedIn } =
        JSON.parse(localStorage.getItem('persistentState')) || false;

    return (
        <>
            {isLoggedIn ? (
                children
            ) : (
                <Navigate
                    replace
                    to="/session/signin"
                    state={{ from: pathname }}
                />
            )}
        </>
    );
};

export default AuthGuard;
