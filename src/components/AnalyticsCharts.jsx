import React, { useMemo, useState } from 'react';
import {
  Autocomplete,
  Box,
  Chip,
  Link,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  Badge,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  FilterListRounded, 
  SortRounded,
  SearchRounded,
  CheckCircleRounded,
} from '@mui/icons-material';
import { FALLBACK_STATUS_ICON, METRO_STATUS, STATUS_ORDER } from '../constants/metroStatus.js';
import { getMetroTotals, withCityTotals } from '../utils/metroData.js';

const STATUS_FILTERS = {
  all: () => true,
  active: (city) => city.operational_kms > 0,
  planned: (city) => city.under_construction_kms > 0 || city.planned_kms > 0,
};

const SORT_ACCESSORS = {
  city: (city) => city.city,
  total: (city) => city.total,
  operational: (city) => city.operational_kms,
  underConstruction: (city) => city.under_construction_kms,
  planned: (city) => city.planned_kms,
};

const getFilteredCityRows = ({ allData, selectedCity, statusFilter, sortBy, sortDirection }) => {
  const base = selectedCity === 'All' ? allData : allData.filter((city) => city.city === selectedCity);
  const filtered = base.filter(STATUS_FILTERS[statusFilter] || STATUS_FILTERS.all);
  const rows = withCityTotals(filtered);
  const accessor = SORT_ACCESSORS[sortBy] || SORT_ACCESSORS.total;

  return rows.sort((a, b) => {
    if (sortBy === 'city') {
      return sortDirection === 'asc' ? accessor(a).localeCompare(accessor(b)) : accessor(b).localeCompare(accessor(a));
    }

    const aVal = accessor(a) || 0;
    const bVal = accessor(b) || 0;
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });
};

function StatusBadge({ status, size = 'medium' }) {
  const statusConfig = METRO_STATUS[status] || {};
  const Icon = statusConfig.icon || FALLBACK_STATUS_ICON;
  const label = statusConfig.label || status;
  const color = statusConfig.color || '#64748b';

  return (
    <Chip
      icon={<Icon sx={{ color, fontSize: size === 'small' ? 14 : 16 }} />}
      label={label}
      size={size}
      variant='outlined'
      sx={{
        borderColor: color,
        color: color,
        fontWeight: 600,
        fontSize: size === 'small' ? '0.6875rem' : '0.75rem',
        height: size === 'small' ? 24 : 28,
        borderRadius: 999,
        '& .MuiChip-icon': {
          marginLeft: 0,
          marginRight: 0.5,
        },
      }}
    />
  );
}

function PercentBar({ value, color, height = 8 }) {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: height, borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
      <LinearProgress
        variant='determinate'
        value={value}
        sx={{
          height: height,
          borderRadius: 999,
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(148, 163, 184, 0.15)' 
            : 'rgba(140, 157, 176, 0.25)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 999,
            backgroundColor: color,
          },
        }}
      />
    </Box>
  );
}

function EmptyState({ message = 'No data available', icon: Icon }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 4,
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 3,
        color: 'text.secondary',
      }}
    >
      {Icon && <Icon sx={{ fontSize: 48, color: 'text.tertiary', mb: 2 }} />}
      <Typography variant='h6' sx={{ mb: 1 }}>{message}</Typography>
      <Typography variant='body2'>Try adjusting your filters or check back later</Typography>
    </Box>
  );
}

function CityBreakdownBar({ city }) {
  const theme = useTheme();
  const total = city.total || 1;
  const op = (city.operational_kms / total) * 100;
  const uc = (city.under_construction_kms / total) * 100;
  const pl = (city.planned_kms / total) * 100;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          height: 8,
          borderRadius: 999,
          overflow: 'hidden',
          display: 'flex',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: theme.palette.mode === 'dark'
            ? 'rgba(148, 163, 184, 0.12)'
            : 'rgba(140, 157, 176, 0.12)',
        }}
      >
        <Box sx={{ width: `${op}%`, bgcolor: METRO_STATUS.operational.color }} />
        <Box sx={{ width: `${uc}%`, bgcolor: METRO_STATUS.underConstruction.color }} />
        <Box sx={{ width: `${pl}%`, bgcolor: METRO_STATUS.planned.color }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Tooltip title={`Operational: ${city.operational_kms.toFixed(1)} km`}>
          <span>
            <Badge
              color='success'
              variant='dot'
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{
                '& .MuiBadge-dot': {
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  minWidth: 6,
                },
              }}
            />
            <Typography variant='caption' sx={{ ml: 0.5, color: 'text.secondary', fontSize: '0.6875rem' }}>
              {city.operational_kms.toFixed(1)}km
            </Typography>
          </span>
        </Tooltip>
        <Tooltip title={`Under Construction: ${city.under_construction_kms.toFixed(1)} km`}>
          <span>
            <Badge
              color='warning'
              variant='dot'
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{
                '& .MuiBadge-dot': {
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  minWidth: 6,
                },
              }}
            />
            <Typography variant='caption' sx={{ ml: 0.5, color: 'text.secondary', fontSize: '0.6875rem' }}>
              {city.under_construction_kms.toFixed(1)}km
            </Typography>
          </span>
        </Tooltip>
        <Tooltip title={`Planned: ${city.planned_kms.toFixed(1)} km`}>
          <span>
            <Badge
              color='primary'
              variant='dot'
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{
                '& .MuiBadge-dot': {
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  minWidth: 6,
                },
              }}
            />
            <Typography variant='caption' sx={{ ml: 0.5, color: 'text.secondary', fontSize: '0.6875rem' }}>
              {city.planned_kms.toFixed(1)}km
            </Typography>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default function AnalyticsCharts({ allData }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [selectedCity, setSelectedCity] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('total');
  const [sortDirection, setSortDirection] = useState('desc');

  const totals = useMemo(() => getMetroTotals(allData), [allData]);

  const statusData = useMemo(() => {
    const safeTotal = totals.total || 1;
    return STATUS_ORDER.map((key) => ({
      key,
      name: METRO_STATUS[key].label,
      value: totals[key],
      color: METRO_STATUS[key].color,
      percent: (totals[key] / safeTotal) * 100,
    }));
  }, [totals]);

  const cityOptions = useMemo(
    () => ['All', ...allData.map((city) => city.city).sort((a, b) => a.localeCompare(b))],
    [allData]
  );

  const cityRows = useMemo(() => {
    return getFilteredCityRows({ allData, selectedCity, statusFilter, sortBy, sortDirection });
  }, [allData, selectedCity, statusFilter, sortBy, sortDirection]);

  const toggleSortDirection = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {/* Network Progress */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          border: '1px solid',
          borderColor: 'divider',
          background: isDark
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(31, 41, 55, 0.88) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(236, 255, 250, 0.95) 100%)',
          backdropFilter: 'blur(16px) saturate(130%)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
          <Typography variant='h2' sx={{ fontWeight: 700 }}>
            Network Progress
          </Typography>
          <StatusBadge status='operational' size='small' />
        </Box>
        <Box sx={{ display: 'grid', gap: 2 }}>
          {statusData.map((item) => (
            <Box key={item.key}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box component={METRO_STATUS[item.key].icon} fontSize='small' sx={{ color: item.color }} />
                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant='body2' sx={{ color: item.color, fontWeight: 700 }}>
                    {item.value.toFixed(1)} km
                  </Typography>
                  <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                    {item.percent.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
              <PercentBar value={item.percent} color={item.color} />
            </Box>
          ))}
          
          <Box
            sx={{
              mt: 1,
              p: 1.75,
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(241, 245, 249, 0.9)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='caption' sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                TOTAL NETWORK LENGTH
              </Typography>
              <Chip
                label='+12.5%'
                size='small'
                color='success'
                variant='outlined'
                icon={<CheckCircleRounded fontSize='small' />}
              />
            </Box>
            <Typography sx={{ fontSize: '2rem', lineHeight: 1.1, fontWeight: 700, mt: 0.5, color: 'primary.main' }}>
              {totals.total.toFixed(0)} km
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', mt: 0.5 }}>
              Across {allData.length} metro systems
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* City Data Table */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          border: '1px solid',
          borderColor: 'divider',
          background: isDark
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(38, 51, 74, 0.88) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 248, 255, 0.95) 100%)',
          backdropFilter: 'blur(16px) saturate(130%)',
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(260px, 380px) minmax(0, 1fr)' }, gap: 2, mb: 2.5 }}>
          <Autocomplete
            options={cityOptions}
            value={selectedCity}
            onChange={(_, option) => setSelectedCity(option || 'All')}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Search or select a city...'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 999,
                    borderWidth: '1.5px',
                  },
                }}
              />
            )}
            PopperComponent={(props) => (
              <Box
                {...props}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.customShadows.elevated,
                  ...props.style,
                }}
              />
            )}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Chip
              label='All'
              clickable
              color={statusFilter === 'all' ? 'primary' : 'default'}
              variant={statusFilter === 'all' ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter('all')}
              icon={statusFilter === 'all' ? <CheckCircleRounded sx={{ fontSize: 14 }} /> : undefined}
              sx={{ fontWeight: 600, height: 28 }}
            />
            <Chip
              label='Active'
              clickable
              color={statusFilter === 'active' ? 'success' : 'default'}
              variant={statusFilter === 'active' ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter('active')}
              icon={statusFilter === 'active' ? <CheckCircleRounded sx={{ fontSize: 14 }} /> : undefined}
              sx={{ fontWeight: 600, height: 28 }}
            />
            <Chip
              label='Planned'
              clickable
              color={statusFilter === 'planned' ? 'warning' : 'default'}
              variant={statusFilter === 'planned' ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter('planned')}
              icon={statusFilter === 'planned' ? <CheckCircleRounded sx={{ fontSize: 14 }} /> : undefined}
              sx={{ fontWeight: 600, height: 28 }}
            />
          </Box>
        </Box>

        {/* Table Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
          <Typography variant='h2' sx={{ fontWeight: 700 }}>
            Total Network Length by City
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title='Sort options'>
              <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => toggleSortDirection('total')}>
                <SortRounded fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Filter'>
              <IconButton size='small' sx={{ color: 'text.secondary' }}>
                <FilterListRounded fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Table */}
        {cityRows.length === 0 ? (
          <EmptyState message='No cities match your filters' icon={SearchRounded} />
        ) : (
          <TableContainer sx={{ borderRadius: 2, overflowX: 'auto', border: '1px solid', borderColor: 'divider' }}>
            <Table size='small' sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08333em', textTransform: 'uppercase' }}>
                    City
                  </TableCell>
                  <TableCell align='right' sx={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08333em', textTransform: 'uppercase' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5, cursor: 'pointer' }} onClick={() => toggleSortDirection('total')}>
                      Total Length
                      <SortRounded fontSize='small' color={sortBy === 'total' ? 'primary' : 'action'} />
                    </Box>
                  </TableCell>
                  <TableCell align='right' sx={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08333em', textTransform: 'uppercase' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5, cursor: 'pointer' }} onClick={() => toggleSortDirection('operational')}>
                      Operational
                      <SortRounded fontSize='small' color={sortBy === 'operational' ? 'primary' : 'action'} />
                    </Box>
                  </TableCell>
                  <TableCell align='right' sx={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08333em', textTransform: 'uppercase' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5, cursor: 'pointer' }} onClick={() => toggleSortDirection('underConstruction')}>
                      Under Construction
                      <SortRounded fontSize='small' color={sortBy === 'underConstruction' ? 'primary' : 'action'} />
                    </Box>
                  </TableCell>
                  <TableCell align='right' sx={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08333em', textTransform: 'uppercase' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5, cursor: 'pointer' }} onClick={() => toggleSortDirection('planned')}>
                      Planned
                      <SortRounded fontSize='small' color={sortBy === 'planned' ? 'primary' : 'action'} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08333em', textTransform: 'uppercase' }}>
                    Breakdown
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cityRows.slice(0, 10).map((city, index) => (
                  <TableRow
                    key={city.city}
                    hover
                    sx={{
                      '&:last-child td': { borderBottom: 0 },
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: index % 2 === 0 ? 'primary.main' : 'secondary.main' }} />
                        <Link
                          href={city.official_link || city.wikipedia_link}
                          target='_blank'
                          rel='noopener noreferrer'
                          underline='hover'
                          sx={{
                            color: 'text.primary',
                            fontWeight: 700,
                            textDecorationColor: 'primary.main',
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          {city.city}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell align='right' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {city.total.toFixed(1)} km
                    </TableCell>
                    <TableCell align='right' sx={{ color: 'success.main', fontWeight: 600 }}>
                      {city.operational_kms.toFixed(1)} km
                    </TableCell>
                    <TableCell align='right' sx={{ color: 'warning.main', fontWeight: 600 }}>
                      {city.under_construction_kms.toFixed(1)} km
                    </TableCell>
                    <TableCell align='right' sx={{ color: 'info.main', fontWeight: 600 }}>
                      {city.planned_kms.toFixed(1)} km
                    </TableCell>
                    <TableCell>
                      <CityBreakdownBar city={city} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {cityRows.length > 10 && (
          <Box sx={{ textAlign: 'center', pt: 2 }}>
            <Typography variant='body2' color='text.secondary'>
              +{cityRows.length - 10} more cities
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
