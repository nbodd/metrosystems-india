import React, { useMemo, useState } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DarkModeRounded,
  LightModeRounded,
  SubwayRounded,
  TimelineRounded,
  ConstructionRounded,
  ApartmentRounded,
  FmdGoodRounded,
  MenuRounded,
  DashboardRounded,
  AnalyticsRounded,
  MapRounded,
  SettingsRounded,
  InfoRounded,
} from '@mui/icons-material';
import { darkTheme, lightTheme } from './theme';
import MetricCard from './components/MetricCard.jsx';
import AnalyticsCharts from './components/AnalyticsCharts.jsx';
import InteractiveMap from './components/InteractiveMap.jsx';
import MetroData from './data/metro.json';
import MetroCitiesData from './data/metro-cities.json';

const DRAWER_WIDTH = 280;
const APP_BAR_HEIGHT = 72;

const navigationItems = [
  { text: 'Dashboard', icon: DashboardRounded, href: '#dashboard' },
  { text: 'Live Status', icon: SubwayRounded, href: '#live-status' },
  { text: 'Analytics', icon: AnalyticsRounded, href: '#analytics' },
  { text: 'Network Map', icon: MapRounded, href: '#network-map' },
];

const bottomNavigationItems = [
  { text: 'Settings', icon: SettingsRounded, href: '#settings' },
  { text: 'About', icon: InfoRounded, href: '#about' },
];

function NavigationDrawer({ open, onClose, onNavigate }) {
  const theme = useTheme();

  return (
    <Drawer
      variant='temporary'
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 250, 252, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <Toolbar sx={{ height: APP_BAR_HEIGHT, px: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'primary.main', display: 'grid', placeItems: 'center' }}>
          <FmdGoodRounded sx={{ fontSize: 24, color: 'primary.contrastText' }} />
        </Box>
        <Typography variant='h6' sx={{ fontWeight: 700, color: 'text.primary' }}>
          Metro Systems
        </Typography>
      </Toolbar>
      
      <Divider sx={{ my: 1, borderColor: 'divider' }} />
      
      <List component='nav' disablePadding>
        <Typography variant='overline' sx={{ px: 3, py: 1.5, color: 'text.secondary', fontSize: '0.6875rem' }}>
          Navigation
        </Typography>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                onNavigate(item.href);
                onClose();
              }}
              selected={false}
              sx={{
                height: 48,
                px: 3,
                borderRadius: 2,
                mx: 1.5,
                my: 0.5,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'translateX(4px)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: 'text.secondary',
                }}
              >
                <item.icon fontSize='medium' />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, borderColor: 'divider' }} />

      <List component='nav' disablePadding>
        <Typography variant='overline' sx={{ px: 3, py: 1.5, color: 'text.secondary', fontSize: '0.6875rem' }}>
          More
        </Typography>
        {bottomNavigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                onNavigate(item.href);
                onClose();
              }}
              sx={{
                height: 44,
                px: 3,
                borderRadius: 2,
                mx: 1.5,
                my: 0.5,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: 'text.secondary',
                }}
              >
                <item.icon fontSize='medium' />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, borderColor: 'divider' }} />

      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block' }}>
          v2.0.0
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.tertiary', fontSize: '0.75rem' }}>
          Transit Operations
        </Typography>
      </Box>
    </Drawer>
  );
}

function HeaderBar({ darkMode, onToggleMode, onOpenDrawer }) {
  const theme = useTheme();

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        height: APP_BAR_HEIGHT,
        bgcolor: theme.palette.mode === 'dark'
          ? 'rgba(15, 23, 42, 0.88)'
          : 'rgba(255, 255, 255, 0.88)',
        color: 'text.primary',
        backdropFilter: 'blur(20px) saturate(150%)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: theme.zIndex.appBar,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Toolbar sx={{ height: APP_BAR_HEIGHT, px: { xs: 2, sm: 3, md: 4 }, gap: 2 }}>
        <Box sx={{ display: { md: 'none' } }}>
          <IconButton
            onClick={onOpenDrawer}
            aria-label='Open navigation'
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <MenuRounded fontSize='large' />
          </IconButton>
        </Box>

        {/* Centered Title and Icon */}
        <Box sx={{ 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5
        }}>
          <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'primary.main', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <FmdGoodRounded sx={{ fontSize: 26, color: 'primary.contrastText' }} />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant='h1' sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 700, textAlign: 'center' }}>
              Metro Systems India
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={onToggleMode}
              aria-label='Toggle dark mode'
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {darkMode ? <LightModeRounded fontSize='large' /> : <DarkModeRounded fontSize='large' />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function StatusIndicator({ label, value, icon: Icon, color = 'primary', variant = 'contained' }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.04)'
          : 'rgba(0, 0, 0, 0.04)',
        border: '1px solid',
        borderColor: `${color}.main`,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: `${color}.light`,
          boxShadow: theme.customShadows.glassSm,
        },
      }}
    >
      {Icon && <Icon sx={{ fontSize: 18, color: `${color}.main` }} />}
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant='caption' sx={{ color: 'text.secondary', fontSize: '0.75rem', display: 'block' }}>
          {label}
        </Typography>
        <Typography variant='subtitle1' sx={{ color: `${color}.main`, fontWeight: 700, lineHeight: 1.1 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const allData = useMemo(() => [...MetroData, ...MetroCitiesData], []);

  const totals = useMemo(() => {
    const operational = allData.reduce((sum, city) => sum + city.operational_kms, 0);
    const underConstruction = allData.reduce((sum, city) => sum + city.under_construction_kms, 0);
    const planned = allData.reduce((sum, city) => sum + city.planned_kms, 0);
    const total = operational + underConstruction + planned;
    return { operational, underConstruction, planned, total, cities: allData.length };
  }, [allData]);

  const handleToggleMode = () => {
    const next = !darkMode;
    localStorage.setItem('darkMode', String(next));
    setDarkMode(next);
  };

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleNavigate = (href) => {
    // Simple navigation handling
    console.log('Navigate to:', href);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className='dashboard-shell' sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Navigation Drawer - Mobile Only */}
        <NavigationDrawer open={drawerOpen} onClose={handleCloseDrawer} onNavigate={handleNavigate} />

        {/* Header */}
        <HeaderBar darkMode={darkMode} onToggleMode={handleToggleMode} onOpenDrawer={handleOpenDrawer} />

        {/* Main Content */}
        <Box
          component='main'
          sx={{
            flex: 1,
            pt: `${APP_BAR_HEIGHT}px`,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Page Content */}
          <Container
            maxWidth='xl'
            sx={{
              flex: 1,
              py: { xs: 3, sm: 4, md: 5 },
              display: 'grid',
              gap: 3,
              px: { xs: 2, sm: 3 },
            }}
          >
            {/* Metric Cards - Centered */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, minmax(0, 1fr))',
                    lg: 'repeat(4, minmax(0, 1fr))',
                  },
                  gap: 2,
                  width: '100%',
                  maxWidth: 1400,
                }}
              >
              <MetricCard
                label='Total Network Length'
                value={totals.total}
                suffix='km'
                subtext='Across all metro systems'
                icon={TimelineRounded}
                accent='primary'
                trend='up'
                trendValue='12.5%'
              />
              <MetricCard
                label='Operational Network'
                value={totals.operational}
                suffix='km'
                subtext={`${((totals.operational / (totals.total || 1)) * 100).toFixed(1)}% of total`}
                icon={SubwayRounded}
                accent='success'
                trend='up'
                trendValue='8.2%'
              />
              <MetricCard
                label='Under Construction'
                value={totals.underConstruction}
                suffix='km'
                subtext={`${((totals.underConstruction / (totals.total || 1)) * 100).toFixed(1)}% of total`}
                icon={ConstructionRounded}
                accent='warning'
                trend='up'
                trendValue='15.3%'
              />
              <MetricCard
                label='Cities Analyzed'
                value={totals.cities}
                subtext='Metro networks tracked'
                icon={ApartmentRounded}
                accent='info'
                trend='stable'
              />
            </Box>
            </Box>

            <AnalyticsCharts allData={allData} />
            <InteractiveMap allCities={allData} />

            {/* Footer */}
            <Box sx={{ textAlign: 'center', color: 'text.secondary', pt: 2, borderTop: '1px solid', borderColor: 'divider', mt: 1 }}>
              <Typography variant='body2'>
                Data compiled from publicly available metro rail sources for analytical visualization.
              </Typography>
              <Typography variant='caption' sx={{ mt: 0.5, display: 'block' }}>
                Updated April 2026 | v2.0.0
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
