// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'car',
    path: '/dashboard/car',
    icon: icon('ic_car'),
  },
  {
    title: 'trip',
    path: '/dashboard/trip',
    icon: icon('ic_fuel'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'notification',
    path: '/dashboard/notification',
    icon: icon('ic_notification'),
  },

  
];

export default navConfig;
