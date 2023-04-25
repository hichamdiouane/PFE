import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayoutAdmin from './layouts/dashboardAdmin';
import DashboardLayout from './layouts/dashboardUser';

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
import LoginPage from './login_stuff/Login'
import NotificationsPage from './pages/NotificationsPage'

// ----------------------------------------------------------------------

export default function Router() {
  const logged = Boolean(window.localStorage.getItem("logged"));
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
        { path: 'notification', element: <NotificationsPage /> },
      ],
    },
    {
      path: '/admin/dashboard',
      element: <DashboardLayoutAdmin />,
      children: [
        { element: <Navigate to="/admin/dashboard/app" />, index: true },
        { path: 'app', element: <CarPage /> },
        { path: 'car', element: <CarPage /> },
        { path: 'trip', element: <TripPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'notification', element: <NotificationsPage /> },
      ],
    },
    {
      path: 'login',
      element: logged? <Navigate to="/dashboard/app" />:<LoginPage />,
    },
    {
      path: 'register',
      element: logged? <Navigate to="/dashboard/app" />:<Register/>,
    },
    {
      path: 'reset',
      element: logged? <Navigate to="/dashboard/app" />:<Reset/>,
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
