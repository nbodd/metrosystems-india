import React, { useMemo } from 'react';
import { Box, Chip, Paper, Typography } from '@mui/material';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import IndiaOutline from '../data/india-outline.json';

const markerColor = (city) => {
  if (city.operational_kms > 0) {
    return '#0f766e';
  }
  if (city.under_construction_kms > 0) {
    return '#b45309';
  }
  return '#0369a1';
};

export default function InteractiveMap({ allCities = [] }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const cityCounts = useMemo(
    () => ({
      operational: allCities.filter((city) => city.operational_kms > 0).length,
      underConstruction: allCities.filter((city) => city.under_construction_kms > 0).length,
      planned: allCities.filter((city) => city.planned_kms > 0).length,
    }),
    [allCities]
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderColor: 'divider',
        background: isDark
          ? 'linear-gradient(135deg, rgba(12, 29, 53, 0.9), rgba(15, 47, 80, 0.7))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(235, 248, 255, 0.84))',
        backdropFilter: 'blur(16px) saturate(130%)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 1.5, mb: 2.25, flexWrap: 'wrap' }}>
        <Typography variant='h2'>Interactive Metro Map of India</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={`Operational ${cityCounts.operational}`} size='small' />
          <Chip label={`Under Construction ${cityCounts.underConstruction}`} size='small' />
          <Chip label={`Planned ${cityCounts.planned}`} size='small' />
        </Box>
      </Box>

      <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider', height: { xs: 360, md: 460 } }}>
        <MapContainer center={[22.5937, 79.9629]} zoom={5} scrollWheelZoom className='metro-map'>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; OpenStreetMap contributors'
          />
          <GeoJSON
            data={IndiaOutline}
            style={{
              color: 'transparent',
              weight: 0,
              opacity: 0,
              fillColor: isDark ? '#0d2c45' : '#dbeafe',
              fillOpacity: isDark ? 0.12 : 0.1,
            }}
          />
          {allCities.map((city) => (
            <CircleMarker
              key={city.city}
              center={[city.latitude, city.longitude]}
              radius={6}
              pathOptions={{
                color: markerColor(city),
                fillColor: markerColor(city),
                fillOpacity: 0.85,
                weight: 2,
              }}
            >
              <Popup>
                <Typography variant='subtitle2' sx={{ fontWeight: 700, mb: 1 }}>
                  {city.city}
                </Typography>
                <Typography variant='body2'>Operational: {city.operational_kms.toFixed(1)} km</Typography>
                <Typography variant='body2'>Under Construction: {city.under_construction_kms.toFixed(1)} km</Typography>
                <Typography variant='body2'>Planned: {city.planned_kms.toFixed(1)} km</Typography>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        <Box className='map-legend'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#0f766e' }} />
            <Typography variant='caption'>Operational</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#b45309' }} />
            <Typography variant='caption'>Planned / In Progress</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
