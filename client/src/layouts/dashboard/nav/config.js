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
    icon: icon('ic_user'),
  },
  {
    title: 'trip',
    path: '/dashboard/trip',
    icon: icon('ic_cart'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
