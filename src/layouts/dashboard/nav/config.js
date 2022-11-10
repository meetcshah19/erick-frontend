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
    title: 'Map',
    path: '/dashboard/map',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Trajectory',
    path: '/dashboard/trajectory',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Downlink',
    path: '/dashboard/downlink',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
