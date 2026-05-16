import React, { useMemo, useState } from 'react';
import { Box, Chip, Paper, Typography, Tooltip, IconButton } from '@mui/material';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import IndiaOutline from '../data/india-outline.json';
import { 
  CheckCircleRounded,
  WarningRounded,
  ConstructionRounded,
  InfoOutlined,
  LocationOnRounded,
  DirectionsRailwayRounded
} from '@mui/icons-material';
import { DEFAULT_STATUS, METRO_STATUS } from '../constants/metroStatus.js';
import { getCityPrimaryStatus, getCityTotalKms, getStatusCounts, hasStatusKms } from '../utils/metroData.js';

const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const getMarkerColors = (city, activeFilter) => {
  const status = METRO_STATUS[activeFilter] ? activeFilter : getCityPrimaryStatus(city);
  const config = METRO_STATUS[status] || DEFAULT_STATUS;
  return { fill: config.color, border: config.borderColor };
};

function StatusChip({ status, count, selected, onClick, size = 'small' }) {
  const config = METRO_STATUS[status] || DEFAULT_STATUS;
  const Icon = config.icon || DirectionsRailwayRounded;
  const label = config.label || status;
  const color = config.color;

  return (
    <Chip
      icon={<Icon sx={{ color: selected ? '#ffffff' : color, fontSize: 15 }} />}
      label={`${label} ${count}`}
      size={size}
      variant={selected ? 'filled' : 'outlined'}
      clickable
      onClick={onClick}
      sx={{
        border: '1px solid',
        borderColor: selected ? color : `${color}66`,
        color: selected ? '#ffffff' : color,
        fontWeight: 700,
        fontSize: '0.75rem',
        height: 30,
        borderRadius: 999,
        bgcolor: selected ? color : 'transparent',
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? (selected ? color : 'rgba(255, 255, 255, 0.08)')
          : (selected ? color : 'rgba(255, 255, 255, 0.72)'),
        '&:hover': {
          bgcolor: selected ? color : `${color}14`,
          borderColor: color,
        },
        '& .MuiChip-icon': {
          marginLeft: '8px',
          marginRight: '-2px',
        },
        '& .MuiChip-label': {
          px: 1.25,
        },
      }}
    />
  );
}

function MapPopup({ city }) {
  const theme = useTheme();
  const total = getCityTotalKms(city);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        minWidth: 240,
        boxShadow: theme.customShadows.elevated,
      }}
    >
      <Typography variant='h4' sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationOnRounded color='primary' fontSize='medium' />
        {city.city}
      </Typography>
      
      <Box sx={{ display: 'grid', gap: 1, mb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Total Network
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 700, color: 'primary.main' }}>
            {total.toFixed(1)} km
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CheckCircleRounded fontSize='small' color='success' />
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Operational
            </Typography>
          </Box>
          <Typography variant='subtitle2' sx={{ fontWeight: 700, color: 'success.main' }}>
            {city.operational_kms.toFixed(1)} km
          </Typography>
        </Box>
        
        {city.under_construction_kms > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <WarningRounded fontSize='small' color='warning' />
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Under Construction
              </Typography>
            </Box>
            <Typography variant='subtitle2' sx={{ fontWeight: 700, color: 'warning.main' }}>
              {city.under_construction_kms.toFixed(1)} km
            </Typography>
          </Box>
        )}
        
        {city.planned_kms > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ConstructionRounded fontSize='small' color='info' />
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Planned
              </Typography>
            </Box>
            <Typography variant='subtitle2' sx={{ fontWeight: 700, color: 'info.main' }}>
              {city.planned_kms.toFixed(1)} km
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ 
        height: 6, 
        borderRadius: 999, 
        overflow: 'hidden',
        display: 'flex',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(140, 157, 176, 0.25)'
      }}>
        {city.operational_kms > 0 && (
          <Box sx={{ 
            width: `${((city.operational_kms / total) * 100).toFixed(0)}%`, 
            bgcolor: '#0f766e' 
          }} />
        )}
        {city.under_construction_kms > 0 && (
          <Box sx={{ 
            width: `${((city.under_construction_kms / total) * 100).toFixed(0)}%`, 
            bgcolor: '#b45309' 
          }} />
        )}
        {city.planned_kms > 0 && (
          <Box sx={{ 
            width: `${((city.planned_kms / total) * 100).toFixed(0)}%`, 
            bgcolor: '#0369a1' 
          }} />
        )}
      </Box>
    </Paper>
  );
}

export default function InteractiveMap({ allCities = [] }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [statusFilter, setStatusFilter] = useState('operational');

  const cityCounts = useMemo(() => getStatusCounts(allCities), [allCities]);

  const filteredCities = useMemo(() => {
    return allCities.filter((city) => hasStatusKms(city, statusFilter));
  }, [allCities, statusFilter]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        border: '1px solid',
        borderColor: 'divider',
        background: isDark
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(24, 39, 65, 0.7) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(236, 255, 250, 0.84) 100%)',
        backdropFilter: 'blur(16px) saturate(130%)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 1.5, mb: 2.25, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <DirectionsRailwayRounded color='primary' fontSize='large' />
          <Typography variant='h2' sx={{ fontWeight: 700 }}>
            Interactive Metro Map of India
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <StatusChip
            status='operational'
            count={cityCounts.operational}
            selected={statusFilter === 'operational'}
            onClick={() => setStatusFilter('operational')}
          />
          <StatusChip
            status='underConstruction'
            count={cityCounts.underConstruction}
            selected={statusFilter === 'underConstruction'}
            onClick={() => setStatusFilter('underConstruction')}
          />
          <StatusChip
            status='planned'
            count={cityCounts.planned}
            selected={statusFilter === 'planned'}
            onClick={() => setStatusFilter('planned')}
          />
          <Tooltip title='Total cities with metro systems'>
            <Chip
              label={`Total ${cityCounts.total}`}
              size='small'
              variant='outlined'
              sx={{
                borderColor: 'divider',
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 28,
                borderRadius: 999,
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
              }}
            />
          </Tooltip>
          <Tooltip title='Map information'>
            <IconButton size='small' sx={{ color: 'text.secondary' }}>
              <InfoOutlined fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ 
        position: 'relative', 
        borderRadius: 3, 
        overflow: 'hidden', 
        border: '1px solid', 
        borderColor: 'divider', 
        height: { xs: 360, md: 460 }
      }}>
        <MapContainer 
          center={[22.5937, 79.9629]} 
          zoom={5} 
          scrollWheelZoom 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          {/* Custom tile layer */}
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution={ATTRIBUTION}
          />
          
          {/* India outline */}
          <GeoJSON
            data={IndiaOutline}
            style={{
              color: isDark ? '#334155' : '#cbd5e1',
              weight: 2,
              opacity: 0.8,
              fillColor: isDark ? '#0d2c45' : '#dbeafe',
              fillOpacity: isDark ? 0.15 : 0.1,
            }}
          />
          
          {/* City markers */}
          {filteredCities.map((city) => {
            const colors = getMarkerColors(city, statusFilter);
            const total = getCityTotalKms(city);
            const size = Math.max(6, Math.min(14, 6 + Math.sqrt(total / 10)));
            
            return (
              <CircleMarker
                key={city.city}
                center={[city.latitude, city.longitude]}
                radius={size}
                pathOptions={{
                  color: colors.border,
                  fillColor: colors.fill,
                  fillOpacity: 0.9,
                  weight: 2,
                }}
              >
                <Popup offset={[0, -10]}>
                  <MapPopup city={city} />
                </Popup>
              </CircleMarker>
            );
          })}
          
          {/* Custom zoom control */}
          <ZoomControl 
            position='topright' 
            zoomInTitle='Zoom in'
            zoomOutTitle='Zoom out'
          />
        </MapContainer>

        {/* Map legend */}
        <Box 
          sx={{
            position: 'absolute',
            right: { xs: 10, sm: 16 },
            bottom: { xs: 10, sm: 16 },
            zIndex: 500,
            display: 'grid',
            gap: 1,
            borderRadius: 2,
            p: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(14px) saturate(130%)',
            boxShadow: theme.customShadows.glassSm,
            maxWidth: { xs: 178, sm: 240 },
          }}
        >
          <Typography variant='caption' sx={{ 
            color: 'text.secondary', 
            fontWeight: 700, 
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            pb: 0.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            mb: 1
          }}>
            Legend
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: METRO_STATUS.operational.color, boxShadow: '0 0 0 2px rgba(15, 118, 110, 0.3)' }} />
            <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 500 }}>
              Operational
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: METRO_STATUS.underConstruction.color, boxShadow: '0 0 0 2px rgba(180, 83, 9, 0.3)' }} />
            <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 500 }}>
              Under Construction
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: METRO_STATUS.planned.color, boxShadow: '0 0 0 2px rgba(3, 105, 161, 0.3)' }} />
            <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 500 }}>
              Planned
            </Typography>
          </Box>
        </Box>

        {/* Scale indicator */}
        <Box 
          sx={{
            position: 'absolute',
            left: 16,
            bottom: { xs: 'auto', sm: 16 },
            top: { xs: 10, sm: 'auto' },
            zIndex: 500,
            borderRadius: 1,
            p: 1,
            bgcolor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(14px)',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: theme.customShadows.glassSm,
          }}
        >
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            Scale
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Box sx={{ width: 20, height: 2, bgcolor: 'divider' }} />
            <Box sx={{ width: 20, height: 2, bgcolor: 'divider' }} />
            <Box sx={{ width: 20, height: 2, bgcolor: 'divider' }} />
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>
              100 km
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
