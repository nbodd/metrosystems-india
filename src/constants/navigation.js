import {
  AnalyticsRounded,
  DashboardRounded,
  InfoRounded,
  MapRounded,
  SettingsRounded,
  SubwayRounded,
} from '@mui/icons-material';

export const DRAWER_WIDTH = 280;
export const APP_BAR_HEIGHT = 68;

export const navigationItems = [
  { text: 'Dashboard', icon: DashboardRounded, href: '#dashboard' },
  { text: 'Live Status', icon: SubwayRounded, href: '#live-status' },
  { text: 'Analytics', icon: AnalyticsRounded, href: '#analytics' },
  { text: 'Network Map', icon: MapRounded, href: '#network-map' },
];

export const bottomNavigationItems = [
  { text: 'Settings', icon: SettingsRounded, href: '#settings' },
  { text: 'About', icon: InfoRounded, href: '#about' },
];

