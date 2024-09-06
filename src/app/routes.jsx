import AuthGuard from "app/auth/AuthGuard";
import Redirect from "app/auth/Redirect";
import Account from "app/views/account";
import calendarRoutes from "app/views/calendar/CalendarRoutes";
import chartsRoute from "app/views/charts/ChartsRoute";
import chatRoutes from "app/views/chat-box/ChatRoutes";
import crudRoute from "app/views/CRUD/CrudRoutes";
import { dashboardRoutes } from "app/views/dashboard/DashboardRoutes";
import dataTableRoutes from "app/views/data-table/dataTableRoutes";
import dragAndDropRoute from "app/views/Drag&Drop/DragAndDropRoute";
import ecommerceRoutes from "app/views/ecommerce/EcommerceRoutes";
import formsRoutes from "app/views/forms/FormsRoutes";
import inboxRoute from "app/views/inbox/InboxRoutes";
import invoiceRoutes from "app/views/invoice/InvoioceRoutes";
import ListRoute from "app/views/list/ListRoute";
import mapRoutes from "app/views/map/MapRoutes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import pageLayoutRoutes from "app/views/page-layouts/PageLayoutRoutees";
import pagesRoutes from "app/views/pages/pagesRoutes";
import pricingRoutes from "app/views/pricing/PricingRoutes";
import scrumBoardRoutes from "app/views/scrum-board/ScrumBoardRoutes";
import NotFound from "app/views/sessions/NotFound";
import sessionRoutes from "app/views/sessions/SessionRoutes";
import todoRoutes from "app/views/todo/TodoRoutes";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import ProfileRoutes from "app/views/Profile/ProfileRoutes";
import PropertyRoutes from "app/views/Property/PropertyRoutes";
import PartyRoutes from "./views/Party/PartyRoutes";
import PreloginRoutes from "./views/Prelogin/PreloginRoutes";
import PostloginRoutes from "./views/Postlogin/PostloginRoutes";
import TenantRoutes from "./views/Tenant/TenantRoutes";
import Order from "./views/Order/Order";
import LeegalityProcureStatus from "./views/Postlogin/LeegalityProcureStatus";
import AcceptorRejectInvitation from "./views/Prelogin/AcceptOrRejectInvitation";

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...calendarRoutes,
      ...chartsRoute,
      ...chatRoutes,
      ...crudRoute,
      ...dataTableRoutes,
      ...dragAndDropRoute,
      ...ecommerceRoutes,
      ...formsRoutes,
      ...invoiceRoutes,
      ...ListRoute,
      ...mapRoutes,
      ...materialRoutes,
      ...inboxRoute,
      ...pageLayoutRoutes,
      ...pagesRoutes,
      ...pricingRoutes,
      ...scrumBoardRoutes,
      ...todoRoutes,
      ...ProfileRoutes,
      ...PropertyRoutes,
      ...PartyRoutes,
      ...PreloginRoutes,
      ...PostloginRoutes,
      ...TenantRoutes,
      { path: "/order", element: <Order /> },
      { path: "/page-layouts/account", element: <Account /> },
    ],
  },
  ...sessionRoutes,
  //Place any pre login routes here
  { path: "/", element: <Redirect /> },
  { path: "*", element: <NotFound /> },
  { path: "/procureStatus", element: <LeegalityProcureStatus /> },
  { path: "/invitationAction", element: <AcceptorRejectInvitation /> },
];

export default routes;
