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
import Home from "../pages/user/Home";
import { ProtectedRouterAdmin } from "./ProtectedRouterAdmin";
import { ProtectedRouterManager } from "./ProtectedRouterManager";
import NewTurfPage from "../pages/admin/NewTurfPage";
import NewManager from "../pages/admin/NewManager";
import UserBooking from "../pages/user/UserBooking";
import BookingDetailsPage from "../pages/admin/BookingDetailsPage";
import ManagerTurfDetailsPage from "../pages/manager/ManagerTurfDetailsPage";
import AdminTurfDetailsPage from "../pages/admin/AdminTurfDetailsPage";
import AdminTurfEditPage from "../pages/admin/AdminTurfEditPage";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import PaymentError from "../pages/user/PaymentError";
import ManagerDetails from "../pages/admin/ManagerDetails";
import PaymentDetails from "../pages/admin/PaymentDetails";
import PaymentHistory from "../pages/user/PaymentHistory";
import ReviewPage from "../pages/user/ReviewPage";


export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
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
            children: [
              {
                path: "turf-details/:id",
                element : <TurfDetailsPage />
              }
            ]
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "booking",
            element: <UserBooking />,
          },
          {
            path: "payment-success",
            element: <PaymentSuccess />
          },
          {
            path: "payment-error",
            element : <PaymentError />
          },
          {
            path: "payment",
            element:<PaymentHistory />
          },
          {
            path: "review",
            element:<ReviewPage />
          }
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <AdminLoginPage />,
      },
      {
        path: "",
        element: <ProtectedRouterAdmin />,
        children: [
          {
            path: "home",
            element: <AdminHomePage />,
          },
          {
            path: "turfs",
            element: <AdminTurfPage />,
          },
          {
            path: "managers",
            element: <AdminManagerPage />,
          },
          {
            path: "enquiries",
            element: <AdminEnquiryPage />,
          },
          {
            path: "turf-details/:id",
            element: <AdminTurfDetailsPage />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "new-turf",
            element: <NewTurfPage />,
          },
          {
            path: "new-manager",
            element: <NewManager />,
          },
          {
            path: "bookings",
            element: <BookingDetailsPage />,
          },
          {
            path: "turf-edit/:id",
            element: <AdminTurfEditPage />,
          },
          {
            path: "manager-details/:id",
            element : <ManagerDetails/>
          },
          {
            path: "payment",
            element : <PaymentDetails />
          }
        ],
      },
    ],
  },
  {
    path: "manager",
    element: <ManagerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <AdminLoginPage />,
      },
      {
        path: "",
        element: <ProtectedRouterManager />,
        children: [
          {
            path: "home",
            element: <ManagerHomePage />,
          },
          {
            path: "home/turf-details/:id",
            element: <ManagerTurfDetailsPage />,
          },
          {
            path: "bookings",
            element: <ManagerBookingPage />,
          },
          {
            path: "profile",
            element: <ManagerProfile />,
          },
        ],
      },
    ],
  },
]);
