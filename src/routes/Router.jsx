import { createBrowserRouter} from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import ErrorPage from "../pages/shared/ErrorPage"
import AboutPage from "../pages/user/AboutPage"
import SearchResult from "../pages/user/SearchResult"
import ContactPage from "../pages/user/ContactPage";
import LoginPage from "../pages/user/LoginPage"
import SignUpPage from "../pages/user/SignUpPage"
import AdminLayout from "../layout/AdminLayout";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminHomePage from "../pages/admin/AdminHomePage"
import { ProtectedRouter } from "./ProtectedRouter";
import TurfDisplay from "../pages/user/TurfDisplay";
import TurfDetailsPage from "../pages/user/TurfDetailsPage"
import AdminTurfPage from "../pages/admin/AdminTurfPage";
import AdminManagerPage from "../pages/admin/AdminManagerPage";
import AdminEnquiryPage from "../pages/admin/AdminEnquiryPage";
import ManagerHomePage from "../pages/manager/ManagerHomePage";
import ManagerLayout from "../layout/ManagerLayout";
import ManagerBookingPage from "../pages/manager/ManagerBookingPage";
import Profile from "../pages/shared/Profile";
import UserProfile from "../pages/user/UserProfile";
import ManagerProfile from "../pages/manager/ManagerProfile";
import HomePage from "../pages/user/HomePage"


export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "search",
        element: <SearchResult />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "user",
        element: <ProtectedRouter />,
        ErrorPage: <ErrorPage />,
        children: [
          {
            path: "turf",
            element: <TurfDisplay />,
          },
          {
            path: "turf/turf-details/:id",
            element: <TurfDetailsPage />,
          },
          {
            path: "user-search",
            element: <SearchResult />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "admin-login",
        element: <AdminLoginPage />,
      },
    ],
  },
  {
    path: "",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin",
        element: <ProtectedRouter />,
        children: [
          {
            path: "homepage",
            element: <AdminHomePage />,
          },
          {
            path: "login",
            element: <AdminLoginPage />,
          },
          {
            path: "turf",
            element: <AdminTurfPage />,
          },
          {
            path: "manager",
            element: <AdminManagerPage />,
          },
          {
            path: "enquiries",
            element: <AdminEnquiryPage />,
          },
          {
            path: "turf-details/:id",
            element: <TurfDetailsPage />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "",
    element: <ManagerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "manager",
        element: <ProtectedRouter />,
        children: [
          {
            path: "login",
            element: <AdminLoginPage />,
          },
          {
            path: "homepage",
            element: <ManagerHomePage />,
          },

          {
            path: "homepage/turf-details/:id",
            element: <TurfDetailsPage />,
          },
          {
            path: "bookings",
            element: <ManagerBookingPage />,
          },
          {
            path: "profile",
            element : <ManagerProfile />
          }
        ],
      },
    ],
  },
]);
