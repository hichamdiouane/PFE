import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Web_site from './pages/Web_site';
import CarPage from './pages/CarPage';
import ProfilePage from './pages/ProfilePage';
import Page404 from './pages/Page404';
import TripPage from './pages/TripPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Register from './login_stuff/Register';
import Reset from './login_stuff/Reset';
import User from './login_stuff/User';
import LoginPage from './pages/LoginPage'

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    { path: '', 
      element: <Web_site/>,
      children: [
        {element: <Navigate to="" />, index: true },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'car', element: <CarPage /> },
        { path: 'trip', element: <TripPage /> },
        { path: 'profile', element: <ProfilePage /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <Register/>,
    },
    {
      path: 'reset',
      element: <Reset/>,
    },
    {
      path: 'user',
      element: <User/>,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
