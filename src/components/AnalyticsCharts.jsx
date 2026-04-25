import React, { useMemo, useState } from 'react';
import {
  Autocomplete,
  Box,
  Chip,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '@mui/material/styles';

const STATUS_COLORS = {
  operational: '#0f766e',
  underConstruction: '#b45309',
  planned: '#0369a1',
};

function PercentBar({ value, color }) {
  return (
    <LinearProgress
      variant='determinate'
      value={value}
      sx={{
        height: 8,
        borderRadius: 999,
        backgroundColor: 'rgba(140, 157, 176, 0.25)',
        '& .MuiLinearProgress-bar': {
          borderRadius: 999,
          backgroundColor: color,
        },
      }}
    />
  );
}

function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0].payload;
  return (
    <Paper sx={{ p: 1.5 }}>
      <Typography variant='body2' sx={{ fontWeight: 600 }}>
        {point.name}
      </Typography>
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        {point.value.toFixed(1)} km ({point.percent.toFixed(1)}%)
      </Typography>
    </Paper>
  );
}

function CityBreakdownBar({ city }) {
  const total = city.total || 1;
  const op = (city.operational_kms / total) * 100;
  const uc = (city.under_construction_kms / total) * 100;
  const pl = (city.planned_kms / total) * 100;

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: 10,
          borderRadius: 999,
          overflow: 'hidden',
          display: 'flex',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'rgba(140, 157, 176, 0.12)',
          mb: 1,
        }}
      >
        <Box sx={{ width: `${op}%`, bgcolor: STATUS_COLORS.operational }} />
        <Box sx={{ width: `${uc}%`, bgcolor: STATUS_COLORS.underConstruction }} />
        <Box sx={{ width: `${pl}%`, bgcolor: STATUS_COLORS.planned }} />
      </Box>
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        Operational {city.operational_kms.toFixed(1)} km | Under Construction {city.under_construction_kms.toFixed(1)} km | Planned {city.planned_kms.toFixed(1)} km
      </Typography>
    </Box>
  );
}

export default function AnalyticsCharts({ allData }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [selectedCity, setSelectedCity] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');

  const totals = useMemo(() => {
    const operational = allData.reduce((sum, city) => sum + city.operational_kms, 0);
    const underConstruction = allData.reduce((sum, city) => sum + city.under_construction_kms, 0);
    const planned = allData.reduce((sum, city) => sum + city.planned_kms, 0);
    const total = operational + underConstruction + planned;
    return { operational, underConstruction, planned, total };
  }, [allData]);

  const statusData = useMemo(() => {
    const safeTotal = totals.total || 1;
    return [
      {
        name: 'Operational',
        value: totals.operational,
        color: STATUS_COLORS.operational,
        percent: (totals.operational / safeTotal) * 100,
      },
      {
        name: 'Under Construction',
        value: totals.underConstruction,
        color: STATUS_COLORS.underConstruction,
        percent: (totals.underConstruction / safeTotal) * 100,
      },
      {
        name: 'Planned',
        value: totals.planned,
        color: STATUS_COLORS.planned,
        percent: (totals.planned / safeTotal) * 100,
      },
    ];
  }, [totals]);

  const cityOptions = useMemo(
    () => ['All', ...allData.map((city) => city.city).sort((a, b) => a.localeCompare(b))],
    [allData]
  );

  const cityRows = useMemo(() => {
    const base = selectedCity === 'All' ? allData : allData.filter((city) => city.city === selectedCity);
    const statusFiltered = base.filter((city) => {
      if (statusFilter === 'active') {
        return city.operational_kms > 0;
      }
      if (statusFilter === 'planned') {
        return city.under_construction_kms > 0 || city.planned_kms > 0;
      }
      return true;
    });

    return statusFiltered
      .map((city) => ({
        ...city,
        total: city.operational_kms + city.under_construction_kms + city.planned_kms,
      }))
      .sort((a, b) => b.total - a.total);
  }, [allData, selectedCity, statusFilter]);

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' }, gap: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderColor: 'divider',
            background: isDark
              ? 'linear-gradient(135deg, rgba(12, 29, 53, 0.88), rgba(14, 44, 73, 0.72))'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(236, 245, 255, 0.85))',
            backdropFilter: 'blur(16px) saturate(130%)',
          }}
        >
          <Typography variant='h2' sx={{ mb: 2.5 }}>
            Metro Network Status Distribution
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' }, gap: 2 }}>
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey='value'
                    innerRadius={62}
                    outerRadius={104}
                    stroke='none'
                    paddingAngle={2}
                  >
                    {statusData.map((segment) => (
                      <Cell key={segment.name} fill={segment.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ display: 'grid', alignContent: 'center', gap: 1.25 }}>
              {statusData.map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    p: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(241, 245, 249, 0.8)',
                  }}
                >
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {item.name}
                  </Typography>
                  <Typography variant='h3' sx={{ color: item.color, mt: 0.25 }}>
                    {item.percent.toFixed(1)}%
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {item.value.toFixed(1)} km
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderColor: 'divider',
            background: isDark
              ? 'linear-gradient(135deg, rgba(12, 29, 53, 0.88), rgba(17, 55, 69, 0.7))'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(236, 255, 250, 0.84))',
            backdropFilter: 'blur(16px) saturate(130%)',
          }}
        >
          <Typography variant='h2' sx={{ mb: 2.5 }}>
            Network Progress
          </Typography>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                <Typography variant='body2'>Operational</Typography>
                <Typography variant='body2' sx={{ color: STATUS_COLORS.operational, fontWeight: 700 }}>
                  {totals.operational.toFixed(1)} km
                </Typography>
              </Box>
              <PercentBar value={(totals.operational / (totals.total || 1)) * 100} color={STATUS_COLORS.operational} />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                <Typography variant='body2'>Under Construction</Typography>
                <Typography variant='body2' sx={{ color: STATUS_COLORS.underConstruction, fontWeight: 700 }}>
                  {totals.underConstruction.toFixed(1)} km
                </Typography>
              </Box>
              <PercentBar value={(totals.underConstruction / (totals.total || 1)) * 100} color={STATUS_COLORS.underConstruction} />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                <Typography variant='body2'>Planned</Typography>
                <Typography variant='body2' sx={{ color: STATUS_COLORS.planned, fontWeight: 700 }}>
                  {totals.planned.toFixed(1)} km
                </Typography>
              </Box>
              <PercentBar value={(totals.planned / (totals.total || 1)) * 100} color={STATUS_COLORS.planned} />
            </Box>
            <Box
              sx={{
                mt: 1,
                p: 1.75,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(241, 245, 249, 0.8)',
              }}
            >
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                TOTAL NETWORK LENGTH
              </Typography>
              <Typography sx={{ fontSize: '2rem', lineHeight: 1.1, fontWeight: 700, mt: 0.5 }}>
                {totals.total.toFixed(0)} km
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderColor: 'divider',
          background: isDark
            ? 'linear-gradient(135deg, rgba(12, 29, 53, 0.88), rgba(23, 49, 87, 0.7))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(238, 248, 255, 0.85))',
          backdropFilter: 'blur(16px) saturate(130%)',
        }}
      >
        <Typography variant='h2' sx={{ mb: 2.5 }}>
          Total Network Length by City
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(260px, 380px) auto' }, gap: 2, mb: 2.5 }}>
          <Autocomplete
            options={cityOptions}
            value={selectedCity}
            onChange={(_, option) => setSelectedCity(option || 'All')}
            renderInput={(params) => <TextField {...params} placeholder='Search or select a city...' />}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 999,
              },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: 'All' },
              { key: 'active', label: 'Active' },
              { key: 'planned', label: 'Planned' },
            ].map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                clickable
                color={statusFilter === chip.key ? 'primary' : 'default'}
                variant={statusFilter === chip.key ? 'filled' : 'outlined'}
                onClick={() => setStatusFilter(chip.key)}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 1.5 }}>
          {cityRows.map((city) => (
            <Box
              key={city.city}
              sx={{
                p: 1.75,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2.5,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '200px 130px 1fr' },
                gap: 1.5,
                alignItems: 'center',
                '&:hover': {
                  borderColor: isDark ? 'rgba(125, 211, 252, 0.55)' : 'rgba(2, 132, 199, 0.3)',
                  boxShadow: isDark ? '0 10px 24px rgba(0, 0, 0, 0.3)' : '0 8px 22px rgba(20, 38, 63, 0.08)',
                },
              }}
            >
              <Typography variant='h3'>{city.city}</Typography>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                {city.total.toFixed(1)} km
              </Typography>
              <CityBreakdownBar city={city} />
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
