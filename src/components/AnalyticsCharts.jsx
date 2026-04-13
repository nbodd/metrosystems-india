import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { Box, Paper, Typography, FormControl, Button, ButtonGroup, Card, CardContent, Grid, Link, Chip, LinearProgress, Autocomplete, TextField } from '@mui/material';
import { CheckCircle, Settings, Checklist } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function AnalyticsCharts({ tierOneData, tierTwoData, darkMode }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [chartType, setChartType] = useState('stacked');
  const [selectedCity, setSelectedCity] = useState('All');

  // Combine all data for top performers
  const allData = [...tierOneData, ...tierTwoData];
  const filteredData = selectedCity === 'All' ? allData : allData.filter(city => city.city === selectedCity);
  const totalOperational = allData.reduce((sum, d) => sum + d.operational_kms, 0);
  const totalUnderConstruction = allData.reduce((sum, d) => sum + d.under_construction_kms, 0);
  const totalPlanned = allData.reduce((sum, d) => sum + d.planned_kms, 0);

  const statusData = [
    { name: 'Operational', value: totalOperational, fill: '#3b82f6', percentage: ((totalOperational / (totalOperational + totalUnderConstruction + totalPlanned)) * 100).toFixed(1) },
    { name: 'Under Construction', value: totalUnderConstruction, fill: '#f59e0b', percentage: ((totalUnderConstruction / (totalOperational + totalUnderConstruction + totalPlanned)) * 100).toFixed(1) },
    { name: 'Planned', value: totalPlanned, fill: '#8b5cf6', percentage: ((totalPlanned / (totalOperational + totalUnderConstruction + totalPlanned)) * 100).toFixed(1) },
  ];

  const cityOptions = [
    'All',
    ...allData
      .map(city => city.city)
      .filter((city, index, self) => self.indexOf(city) === index)
      .sort(),
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={4}
          sx={{
            p: 1.5,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: 600, mb: 0.5 }}>
            {payload[0].payload.city}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant='caption'
              sx={{ display: 'block', color: entry.color, fontWeight: 500 }}
            >
              {entry.name}: {entry.value.toFixed(1)} km
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={4}
          sx={{
            p: 1.5,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: 600, mb: 0.5 }}>
            {payload[0].name}
          </Typography>
          <Typography variant='caption' sx={{ fontWeight: 500 }}>
            {payload[0].value.toFixed(0)} km
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
      {/* Status Overview - Pie Chart */}
      <Paper
        elevation={isDark ? 4 : 2}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          background: isDark
            ? 'linear-gradient(135deg, #1e3a3a 0%, #0d2b2b 100%)'
            : 'linear-gradient(135deg, #f0f9ff 0%, #e7f5ff 100%)',
          transition: 'all 0.3s ease',
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 700, mb: 3, color: 'text.primary', letterSpacing: '-0.01em' }}>
          📊 Metro Network Status Distribution
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: { xs: 3, md: 4 }, alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, minHeight: 300 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {statusData.map((item, idx) => (
              <Card
                key={idx}
                sx={{
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    boxShadow: isDark ? 6 : 4,
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 1, backgroundColor: item.fill }} />
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant='subtitle2' sx={{ fontWeight: 700, color: 'text.primary' }}>
                      {item.value.toFixed(0)} km
                    </Typography>
                    <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                      ({item.percentage}%)
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Tier I Cities - Stacked/Grouped Bar Chart */}
      <Paper
        elevation={isDark ? 4 : 2}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          background: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #1a1f35 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          transition: 'all 0.3s ease',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Box>
            <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.01em' }}>
              🏙️ Tier I Cities - Metro Network
            </Typography>
            <Typography variant='caption' sx={{ color: 'text.secondary', mt: 0.5, display: 'block', fontWeight: 500 }}>
              Cities with operational metro network length of 60 km or more
            </Typography>
          </Box>
          <ButtonGroup
            variant='outlined'
            size='small'
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Button
              onClick={() => setChartType('stacked')}
              variant={chartType === 'stacked' ? 'contained' : 'outlined'}
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                ...(chartType === 'stacked' && {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }),
              }}
            >
              Stacked
            </Button>
            <Button
              onClick={() => setChartType('grouped')}
              variant={chartType === 'grouped' ? 'contained' : 'outlined'}
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                ...(chartType === 'grouped' && {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }),
              }}
            >
              Grouped
            </Button>
          </ButtonGroup>
        </Box>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={tierOneData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis
              dataKey="city"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12, fill: isDark ? '#cbd5e1' : '#64748b' }}
            />
            <YAxis
              label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft', fill: isDark ? '#cbd5e1' : '#64748b' }}
              tick={{ fill: isDark ? '#cbd5e1' : '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px', color: isDark ? '#cbd5e1' : '#64748b' }} />
            <Bar dataKey="operational_kms" stackId={chartType === 'stacked' ? 'a' : undefined} fill="#3b82f6" name="Operational" radius={[4, 4, 0, 0]} />
            <Bar dataKey="under_construction_kms" stackId={chartType === 'stacked' ? 'a' : undefined} fill="#f59e0b" name="Under Construction" radius={[4, 4, 0, 0]} />
            <Bar dataKey="planned_kms" stackId={chartType === 'stacked' ? 'a' : undefined} fill="#8b5cf6" name="Planned" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Tier II Cities - Chart */}
      <Paper
        elevation={isDark ? 4 : 2}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          background: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #1a1f35 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          transition: 'all 0.3s ease',
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary', letterSpacing: '-0.01em' }}>
          🌆 Tier II Cities - Metro Network
        </Typography>
        <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mb: 3, fontWeight: 500 }}>
          Cities with operational metro network length less than 60 km
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={tierTwoData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis
              dataKey="city"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12, fill: isDark ? '#cbd5e1' : '#64748b' }}
            />
            <YAxis
              label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft', fill: isDark ? '#cbd5e1' : '#64748b' }}
              tick={{ fill: isDark ? '#cbd5e1' : '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px', color: isDark ? '#cbd5e1' : '#64748b' }} />
            <Bar dataKey="operational_kms" fill="#3b82f6" name="Operational" radius={[4, 4, 0, 0]} />
            <Bar dataKey="under_construction_kms" fill="#f59e0b" name="Under Construction" radius={[4, 4, 0, 0]} />
            <Bar dataKey="planned_kms" fill="#8b5cf6" name="Planned" radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>

      {/* Total Distance by City */}
      <Paper
        elevation={isDark ? 4 : 2}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          background: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #1a1f35 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          transition: 'all 0.3s ease',
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 700, mb: 3, color: 'text.primary', letterSpacing: '-0.01em' }}>
          🔍 Total Network Length by City
        </Typography>
        <Box sx={{ mb: 4, maxWidth: 300 }}>
          <Typography variant='caption' sx={{ color: 'text.secondary', mb: 1.5, display: 'block', fontWeight: 700 }}>
            FILTER BY CITY
          </Typography>
          <Autocomplete
            options={cityOptions}
            value={selectedCity}
            onChange={(event, newValue) => setSelectedCity(newValue || 'All')}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Search or select a city...'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontWeight: 500,
                  },
                }}
              />
            )}
            freeSolo={false}
            disableClearable={false}
            noOptionsText='No cities found'
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease',
              },
            }}
          />
        </Box>
        <Grid container spacing={2}>
          {filteredData
            .map(city => {
              const total = city.operational_kms + city.under_construction_kms + city.planned_kms;
              const sortKey = city.operational_kms + 2 * city.under_construction_kms + city.planned_kms;
              return { ...city, total, sortKey };
            })
            .sort((a, b) => b.sortKey - a.sortKey)
            .slice(0, selectedCity === 'All' ? 8 : filteredData.length)
            .map((city, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: isDark ? 6 : 4,
                    },
                  }}
                >
                  <CardContent sx={{ pb: { xs: 1.5, md: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flex: 1, pr: 1 }}>
                        {city.wikipedia_link ? (
                          <Link
                            href={city.wikipedia_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              fontWeight: 700,
                              color: 'primary.main',
                              textDecoration: 'none',
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                textDecoration: 'underline',
                                color: 'primary.light',
                              },
                            }}
                          >
                            {city.city}
                          </Link>
                        ) : (
                          <Typography variant='subtitle1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                            {city.city}
                          </Typography>
                        )}
                      </Box>
                      <Chip
                        label={`${city.total.toFixed(1)} km`}
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          bgcolor: isDark ? 'rgba(30, 58, 138, 0.3)' : '#e0f2fe',
                          color: isDark ? '#93c5fd' : '#0c4a6e',
                          flex: '0 0 auto',
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle sx={{ fontSize: 16, color: '#3b82f6' }} />
                            <Typography variant='caption' sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              Operational
                            </Typography>
                          </Box>
                          <Typography variant='body2' sx={{ fontWeight: 700, color: '#3b82f6' }}>
                            {city.operational_kms.toFixed(1)} km
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(city.operational_kms / city.total) * 100}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#e0f2fe',
                            '& .MuiLinearProgress-bar': { bgcolor: '#3b82f6', borderRadius: 3 },
                          }}
                        />
                      </Box>

                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Settings sx={{ fontSize: 16, color: '#f59e0b' }} />
                            <Typography variant='caption' sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              Under Constr.
                            </Typography>
                          </Box>
                          <Typography variant='body2' sx={{ fontWeight: 700, color: '#f59e0b' }}>
                            {city.under_construction_kms.toFixed(1)} km
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(city.under_construction_kms / city.total) * 100}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: isDark ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
                            '& .MuiLinearProgress-bar': { bgcolor: '#f59e0b', borderRadius: 3 },
                          }}
                        />
                      </Box>

                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Checklist sx={{ fontSize: 16, color: '#8b5cf6' }} />
                            <Typography variant='caption' sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              Planned
                            </Typography>
                          </Box>
                          <Typography variant='body2' sx={{ fontWeight: 700, color: '#8b5cf6' }}>
                            {city.planned_kms.toFixed(1)} km
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(city.planned_kms / city.total) * 100}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: isDark ? 'rgba(139, 92, 246, 0.2)' : '#f3e8ff',
                            '& .MuiLinearProgress-bar': { bgcolor: '#8b5cf6', borderRadius: 3 },
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </Box>
  );
}
