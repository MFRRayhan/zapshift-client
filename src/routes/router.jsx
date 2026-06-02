import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Loading from "../components/Loading";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AboutUs from "../pages/AboutUs";
import BeARider from "../pages/BeARider";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Coverage from "../pages/Coverage";
import DashboardHome from "../pages/dashboard/DashboardHome";
import MyParcels from "../pages/dashboard/MyParcels";
import Payment from "../pages/dashboard/payment/Payment";
import PaymentCancel from "../pages/dashboard/payment/PaymentCancel";
import PaymentHistory from "../pages/dashboard/payment/PaymentHistory";
import PaymentSuccess from "../pages/dashboard/payment/PaymentSuccess";
import RiderApplications from "../pages/dashboard/adminRoute/RiderApplications";
import UsersManagement from "../pages/dashboard/adminRoute/UsersManagement";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Pricing from "../pages/Pricing";
import Register from "../pages/Register";
import SendParcel from "../pages/SendParcel";
import Services from "../pages/Services";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import AssignRiders from "../pages/dashboard/adminRoute/AssignRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "services",
        Component: Services,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "pricing",
        Component: Pricing,
      },
      {
        path: "send-parcel",
        // element: (
        //   <PrivateRoute>
        //     <SendParcel />
        //   </PrivateRoute>
        // ),
        Component: SendParcel,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "be-a-rider",
        // Component: BeARider,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
      },
      {
        path: "blog",
        Component: Blog,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "my-parcels",
        element: (
          <PrivateRoute>
            <MyParcels />
          </PrivateRoute>
        ),
      },
      {
        path: "payments/:parcelId",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "rider-applications",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <RiderApplications />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AssignRiders />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UsersManagement />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
