import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Roots from './routes/roots';
import HomePage from './pages/user/Homepage';
import ErrorPage from './pages/shared/ErrorPage';
import store from './app/store'
import { Provider } from 'react-redux'
import AboutPage from './pages/user/AboutPage';
import Contacts from './components/shared/Contacts';
import SearchResult from './pages/user/searchResult';
import LoginPage from './pages/user/LoginPage';
import SignUpPage from './pages/user/SignUpPage';
import UserHomePage from './pages/user/TurfDisplay';
import UserRoots from './routes/UserRoots';
import TurfDetailsPage from './pages/user/TurfDetailsPage';
import AdminRoots from './routes/AdminRoots';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import ManagerHomePage from './pages/manager/ManagerHomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserRoots />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/user",
        element: <UserHomePage />,
      },
      {
        path: "/user/turf-details/:id",
        element: <TurfDetailsPage />,
      },
      {
        path: "/user/user-search",
        element: <SearchResult />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoots />,
    children: [
      {
        path: "/admin",
        element: <AdminLoginPage />,
      },
      {
        path: "/admin/about",
        element: <AboutPage />,
      },
      {
        path: "/admin/contact",
        element: <Contacts />,
      },
      {
        path: "/admin/homepage",
        element : <AdminHomePage />
      },
    ],
  },
  {
    path: "/manager",
    element: <ManagerHomePage />,
    children: [
      {
        
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>,
)
