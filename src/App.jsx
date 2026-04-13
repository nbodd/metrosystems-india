import React, { Component } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, Box, Paper, IconButton, Tooltip } from '@mui/material';
import { Train, DarkMode, LightMode } from '@mui/icons-material';
import { lightTheme, darkTheme } from './theme';

import MetricCard from './components/MetricCard.jsx';
import AnalyticsCharts from './components/AnalyticsCharts.jsx';

import MetroData from './data/metro.json';
import MetroCitiesData from './data/metro-cities.json';

class App extends Component {
  constructor(props) {
    super(props);
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    this.state = {
      darkMode: savedDarkMode,
    };
  }

  toggleDarkMode = () => {
    this.setState((prevState) => {
      const newDarkMode = !prevState.darkMode;
      localStorage.setItem('darkMode', newDarkMode);
      return { darkMode: newDarkMode };
    });
  };

  render() {
    const { darkMode } = this.state;
    const theme = darkMode ? darkTheme : lightTheme;

    const allData = [...MetroData, ...MetroCitiesData];
    const tierOneData = allData.filter(city => city.operational_kms >= 60 || city.city === 'Chennai');
    const tierTwoData = allData.filter(city => city.operational_kms < 60 && city.city !== 'Chennai');
    const totalOperational = allData.reduce((sum, d) => sum + d.operational_kms, 0);
    const totalUnderConstruction = allData.reduce((sum, d) => sum + d.under_construction_kms, 0);
    const totalPlanned = allData.reduce((sum, d) => sum + d.planned_kms, 0);
    const totalNetwork = totalOperational + totalUnderConstruction + totalPlanned;
    const citiesCount = allData.length;

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', transition: 'background-color 0.3s ease' }}>
          {/* Header AppBar */}
          <AppBar position='sticky' sx={{ background: darkMode 
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          }}>
            <Toolbar sx={{ gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                <Train sx={{ fontSize: 36 }} />
                <Box>
                  <Typography variant='h5' sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                    Metro Systems India
                  </Typography>
                  <Typography variant='caption' sx={{ opacity: 0.85, fontWeight: 500 }}>
                    Comprehensive Analytics Dashboard
                  </Typography>
                </Box>
              </Box>
              <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
                <IconButton
                  onClick={this.toggleDarkMode}
                  sx={{
                    color: 'inherit',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                >
                  {darkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container maxWidth='lg' sx={{ py: 6 }}>
            {/* KPI Cards */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' },
              gap: { xs: 2, md: 3 },
              mb: 6,
            }}>
              <MetricCard
                label='Total Network Length'
                value={`${totalNetwork.toFixed(0)} km`}
                subtext='Across all Indian metros'
                color='blue'
                icon='📊'
              />
              <MetricCard
                label='Operational Network'
                value={`${totalOperational.toFixed(0)} km`}
                subtext={`${((totalOperational / totalNetwork) * 100).toFixed(1)}% of total`}
                color='green'
                icon='✓'
              />
              <MetricCard
                label='Under Construction'
                value={`${totalUnderConstruction.toFixed(0)} km`}
                subtext={`${((totalUnderConstruction / totalNetwork) * 100).toFixed(1)}% of total`}
                color='purple'
                icon='⚙'
              />
              <MetricCard
                label='Cities Analyzed'
                value={citiesCount}
                subtext={`${tierOneData.length} Tier I, ${tierTwoData.length} Tier II`}
                color='slate'
                icon='🏙'
              />
            </Box>

            {/* Charts Section */}
            <AnalyticsCharts tierOneData={tierOneData} tierTwoData={tierTwoData} darkMode={darkMode} />

            {/* Data Source Footer */}
            <Paper 
              elevation={2}
              sx={{
                mt: 8,
                p: { xs: 3, md: 4 },
                background: darkMode
                  ? 'linear-gradient(135deg, #1e3a3a 0%, #0d2b2b 100%)'
                  : 'linear-gradient(135deg, #f0f9ff 0%, #e7f5ff 100%)',
                borderLeft: '4px solid',
                borderLeftColor: 'primary.main',
                transition: 'all 0.3s ease',
              }}
            >
              <Typography variant='body1' sx={{ lineHeight: 1.8 }}>
                <Typography component='span' sx={{ fontWeight: 700, color: 'primary.main' }}>
                  📚 Data Source:
                </Typography>
                {' '}
                <Typography component='span' sx={{ color: 'text.secondary' }}>
                  Information compiled from Wikipedia and official metro authority sources. This dashboard provides a comprehensive view of India's rapid metro rail expansion across Tier I and Tier II cities.
                </Typography>
              </Typography>
            </Paper>
            <Box sx={{ 
              textAlign: 'center',
              mt: 5,
              mb: 4,
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}>
              <Typography variant='caption'>
                📊 Last Updated: April 14, 2026
              </Typography>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
