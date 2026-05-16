import React, { useEffect, useMemo, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ApartmentRounded, ConstructionRounded, SubwayRounded, TimelineRounded } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import MetricCard from './components/MetricCard.jsx';
import AnalyticsCharts from './components/AnalyticsCharts.jsx';
import InteractiveMap from './components/InteractiveMap.jsx';
import HeaderBar from './components/layout/HeaderBar.jsx';
import HeroOverview from './components/layout/HeroOverview.jsx';
import NavigationDrawer from './components/layout/NavigationDrawer.jsx';
import MetroData from './data/metro.json';
import MetroCitiesData from './data/metro-cities.json';
import { APP_BAR_HEIGHT } from './constants/navigation.js';
import { getMetroTotals } from './utils/metroData.js';

const metricCards = [
  {
    label: 'Total Network Length',
    valueKey: 'total',
    suffix: 'km',
    subtext: 'Across all metro systems',
    icon: TimelineRounded,
    accent: 'primary',
    trend: 'up',
    trendValue: '12.5%',
  },
  {
    label: 'Operational Network',
    valueKey: 'operational',
    suffix: 'km',
    icon: SubwayRounded,
    accent: 'success',
    trend: 'up',
    trendValue: '8.2%',
    subtext: (totals) => `${((totals.operational / (totals.total || 1)) * 100).toFixed(1)}% of total`,
  },
  {
    label: 'Under Construction',
    valueKey: 'underConstruction',
    suffix: 'km',
    icon: ConstructionRounded,
    accent: 'warning',
    trend: 'up',
    trendValue: '15.3%',
    subtext: (totals) => `${((totals.underConstruction / (totals.total || 1)) * 100).toFixed(1)}% of total`,
  },
  {
    label: 'Cities Analyzed',
    valueKey: 'cities',
    subtext: 'Metro networks tracked',
    icon: ApartmentRounded,
    accent: 'info',
    trend: 'stable',
  },
];

function MetricsGrid({ totals }) {
  return (
    <Box id='live-status' sx={{ display: 'flex', justifyContent: 'center', scrollMarginTop: `${APP_BAR_HEIGHT + 20}px` }}>
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
        {metricCards.map((card) => (
          <MetricCard
            key={card.label}
            label={card.label}
            value={totals[card.valueKey]}
            suffix={card.suffix}
            subtext={typeof card.subtext === 'function' ? card.subtext(totals) : card.subtext}
            icon={card.icon}
            accent={card.accent}
            trend={card.trend}
            trendValue={card.trendValue}
          />
        ))}
      </Box>
    </Box>
  );
}

function AppFooter() {
  return (
    <Box sx={{ textAlign: 'center', color: 'text.secondary', pt: 2, borderTop: '1px solid', borderColor: 'divider', mt: 1 }}>
      <Typography variant='body2'>
        Data compiled from publicly available metro rail sources for analytical visualization.
      </Typography>
      <Typography variant='caption' sx={{ mt: 0.5, display: 'block' }}>
        Updated April 2026 | v2.0.0
      </Typography>
    </Box>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;
  const allData = useMemo(() => [...MetroData, ...MetroCitiesData], []);
  const totals = useMemo(() => getMetroTotals(allData), [allData]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleToggleMode = () => {
    const next = !darkMode;
    localStorage.setItem('darkMode', String(next));
    setDarkMode(next);
  };

  const handleNavigate = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className='dashboard-shell' sx={{ display: 'flex', minHeight: '100vh' }}>
        <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={handleNavigate} />
        <HeaderBar darkMode={darkMode} onToggleMode={handleToggleMode} onOpenDrawer={() => setDrawerOpen(true)} />

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
            <HeroOverview totals={totals} onNavigate={handleNavigate} />
            <MetricsGrid totals={totals} />
            <Box id='analytics' sx={{ scrollMarginTop: `${APP_BAR_HEIGHT + 20}px` }}>
              <AnalyticsCharts allData={allData} />
            </Box>
            <Box id='network-map' sx={{ scrollMarginTop: `${APP_BAR_HEIGHT + 20}px` }}>
              <InteractiveMap allCities={allData} />
            </Box>
            <AppFooter />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

