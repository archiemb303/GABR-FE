import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import StampPaperRequests from './StampPaperRequests';

const Property = Loadable(lazy(() => import('./Property')));
const MyProperties = Loadable(lazy(() => import('./MyProperties')));
const AddProperties = Loadable(lazy(() => import('./AddProperties')));
const SearchProperties = Loadable(lazy(() => import('./SearchProperties')));
const PropertyInclusion = Loadable(lazy(() => import('./PropertyInclusion')));
const MyInvitations = Loadable(lazy(() => import('./MyInvitations')));
const AddNewPropertyListing = Loadable(
    lazy(() => import('./AddNewPropertyListing'))
);
const SupportCenter = Loadable(
    lazy(() => import('./SupportCenter'))
);
const Faq = Loadable(
    lazy(() => import('../faq/Faq'))
);
const FaqType = Loadable(
    lazy(() => import('../faq/FaqType'))
);

const CustomerSupportExecutive = Loadable(
    lazy(() => import('../customerSupportExecutive/CustomerSupportExecutive'))
);


const PropertyRoutes = [
    { path: '/property', element: <Property /> },
    { path: '/property/myProperties', element: <MyProperties /> },
    { path: '/property/addProperties', element: <AddProperties /> },
    { path: '/property/searchProperties', element: <SearchProperties /> },
    { path: '/property/propertyInclusion', element: <PropertyInclusion /> },
    {
        path: '/property/addNewPropertyListing',
        element: <AddNewPropertyListing />,
    },
    {
        path: '/property/createRentalAgreement',
        element: <AddNewPropertyListing />,
    },
    {
        path: '/property/myInvitations',
        element: <MyInvitations />,
    },
    {
        path: '/property/supportCenter',
        element: <SupportCenter/>
    },
    {
        path: '/faq',
        element: <Faq></Faq>,
    },
    {
        path: '/faq/:id',
        element: <FaqType></FaqType>,
    },
    {
        path: '/customerSupportExecutive',
        element: <CustomerSupportExecutive></CustomerSupportExecutive>,
    },
    {
        path: '/stampPaperRequests',
        element: <StampPaperRequests></StampPaperRequests>,
    },
];

export default PropertyRoutes;
