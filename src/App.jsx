import React, { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Container,
  IconButton,
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
} from '@mui/icons-material';
import { darkTheme, lightTheme } from './theme';
import MetricCard from './components/MetricCard.jsx';
import AnalyticsCharts from './components/AnalyticsCharts.jsx';
import InteractiveMap from './components/InteractiveMap.jsx';
import MetroData from './data/metro.json';
import MetroCitiesData from './data/metro-cities.json';

export default function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
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

  return (
    <ThemeProvider theme={theme}>
      <Box className='dashboard-shell' sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar
          position='sticky'
          elevation={0}
          sx={{
            bgcolor: darkMode ? 'rgba(8, 18, 36, 0.66)' : 'rgba(255, 255, 255, 0.62)',
            color: 'text.primary',
            backdropFilter: 'blur(16px) saturate(130%)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ minHeight: 78, gap: 2 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: 2.5, bgcolor: darkMode ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.1)', border: '1px solid', borderColor: 'divider', display: 'grid', placeItems: 'center' }}>
              <FmdGoodRounded sx={{ fontSize: 20, color: 'primary.main' }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant='h1' sx={{ fontSize: { xs: '1.15rem', sm: '1.35rem' }, mb: 0.25 }}>
                Metro Systems India
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Comprehensive Analytics Dashboard
              </Typography>
            </Box>
            <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton onClick={handleToggleMode} aria-label='Toggle dark mode'>
                {darkMode ? <LightModeRounded /> : <DarkModeRounded />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Container maxWidth='xl' sx={{ py: { xs: 2.5, md: 4 }, display: 'grid', gap: 3 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
              },
              gap: 2,
            }}
          >
            <MetricCard
              label='Total Network Length'
              value={totals.total}
              suffix='km'
              subtext='Across all metro systems'
              icon={TimelineRounded}
              accent='blue'
            />
            <MetricCard
              label='Operational Network'
              value={totals.operational}
              suffix='km'
              subtext={`${((totals.operational / (totals.total || 1)) * 100).toFixed(1)}% of total`}
              icon={SubwayRounded}
              accent='teal'
            />
            <MetricCard
              label='Under Construction'
              value={totals.underConstruction}
              suffix='km'
              subtext={`${((totals.underConstruction / (totals.total || 1)) * 100).toFixed(1)}% of total`}
              icon={ConstructionRounded}
              accent='amber'
            />
            <MetricCard
              label='Cities Analyzed'
              value={totals.cities}
              subtext='Metro networks tracked'
              icon={ApartmentRounded}
              accent='slate'
            />
          </Box>

          <AnalyticsCharts allData={allData} />
          <InteractiveMap allCities={allData} />

          <Box sx={{ textAlign: 'center', color: 'text.secondary', pb: 1 }}>
            <Typography variant='body2'>
              Data compiled from publicly available metro rail sources for analytical visualization.
            </Typography>
            <Typography variant='caption' sx={{ mt: 0.5, display: 'block' }}>
              Updated April 2026
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
