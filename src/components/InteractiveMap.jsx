import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Box, Paper, Typography, Grid, LinearProgress, Chip, TextField, Button, IconButton, Dialog, DialogContent, DialogActions } from '@mui/material';
import { LocationOn, Train, Close } from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

import IndiaOutline from '../data/india-outline.json';

const InteractiveMap = ({ allCities = [] }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openOverlay, setOpenOverlay] = useState(false);

  const filteredCities = useMemo(() => {
    return allCities.filter(city => {
      const matchesSearch = city.city.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterStatus === 'operational') {
        return matchesSearch && city.operational_kms > 0;
      } else if (filterStatus === 'under-construction') {
        return matchesSearch && city.under_construction_kms > 0;
      } else if (filterStatus === 'planned') {
        return matchesSearch && city.planned_kms > 0;
      }
      return matchesSearch;
    });
  }, [allCities, searchTerm, filterStatus]);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setOpenOverlay(true);
  };

  const handleCloseOverlay = () => {
    setOpenOverlay(false);
    setSelectedCity(null);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  // Calculate total progress
  const totalMetros = allCities.length;
  const operationalCount = allCities.filter(c => c.operational_kms > 0).length;
  const underConstructionCount = allCities.filter(c => c.under_construction_kms > 0).length;
  const plannedCount = allCities.filter(c => c.planned_kms > 0).length;

  // Calculate network stats
  const stats = {
    totalOperational: allCities.reduce((sum, c) => sum + c.operational_kms, 0),
    totalUnderConstruction: allCities.reduce((sum, c) => sum + c.under_construction_kms, 0),
    totalPlanned: allCities.reduce((sum, c) => sum + c.planned_kms, 0),
  };

  const totalKms = stats.totalOperational + stats.totalUnderConstruction + stats.totalPlanned;

  // Zoom controls component
  const ZoomControls = () => {
    const map = useMap();

    const handleZoomIn = () => {
      map.zoomIn();
    };

    const handleZoomOut = () => {
      map.zoomOut();
    };

    return (
      <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <IconButton
          size="small"
          onClick={handleZoomIn}
          sx={{ backgroundColor: 'white', boxShadow: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}
        >
          <Typography variant="button" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+</Typography>
        </IconButton>
        <IconButton
          size="small"
          onClick={handleZoomOut}
          sx={{ backgroundColor: 'white', boxShadow: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}
        >
          <Typography variant="button" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>−</Typography>
        </IconButton>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Train sx={{ color: 'primary.main' }} />
        Interactive Metro Map of India
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Leaflet Map */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ height: '500px', overflow: 'hidden', borderRadius: 2, position: 'relative' }}>
            <MapContainer
              center={[20.5937, 78.9629]} // Center of India
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* India Outline */}
              <GeoJSON
                data={IndiaOutline}
                style={{
                  color: '#1e293b',
                  weight: 2,
                  opacity: 0.8,
                  fillColor: '#f0f9ff',
                  fillOpacity: 0.1,
                }}
              />

              {/* City Markers */}
              {filteredCities.map((city) => {
                const hasOperational = city.operational_kms > 0;
                const color = hasOperational ? '#10b981' : '#f59e0b';
                const radius = selectedCity?.city === city.city ? 12 : 8;

                return (
                  <CircleMarker
                    key={city.city}
                    center={[city.latitude, city.longitude]}
                    radius={radius}
                    pathOptions={{
                      color: color,
                      fillColor: color,
                      fillOpacity: 0.8,
                      weight: 3,
                    }}
                    eventHandlers={{
                      click: () => handleCityClick(city),
                    }}
                  >
                    <Popup>
                      <Box sx={{ p: 1, minWidth: 200 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {city.city}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Operational:</strong> {city.operational_kms.toFixed(1)} km
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Under Construction:</strong> {city.under_construction_kms.toFixed(1)} km
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Planned:</strong> {city.planned_kms.toFixed(1)} km
                        </Typography>
                        {city.wikipedia_link && (
                          <Button
                            size="small"
                            variant="outlined"
                            href={city.wikipedia_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ mt: 1 }}
                          >
                            Learn More
                          </Button>
                        )}
                      </Box>
                    </Popup>
                  </CircleMarker>
                );
              })}

              <ZoomControls />
            </MapContainer>
          </Paper>

          {/* Map Legend */}
          <Box sx={{ mt: 2, display: 'flex', gap: 3, p: 2, backgroundColor: '#f8fafc', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#10b981' }} />
              <Typography variant="caption">Operational Metro</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <Typography variant="caption">Planned/In Progress</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Sidebar with Stats and City List */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2.5, mb: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Network Progress
            </Typography>
            
            {/* Overall Stats */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Operational
                </Typography>
                <Typography variant="caption" sx={{ color: '#059669', fontWeight: 600 }}>
                  {stats.totalOperational.toFixed(1)} km
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(stats.totalOperational / totalKms) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e0f2fe',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#059669',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Under Construction
                </Typography>
                <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 600 }}>
                  {stats.totalUnderConstruction.toFixed(1)} km
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(stats.totalUnderConstruction / totalKms) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#fef3c7',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f59e0b',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Planned
                </Typography>
                <Typography variant="caption" sx={{ color: '#3b82f6', fontWeight: 600 }}>
                  {stats.totalPlanned.toFixed(1)} km
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(stats.totalPlanned / totalKms) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#dbeafe',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#3b82f6',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>

            <Box sx={{
              p: 1.5,
              backgroundColor: '#f3f4f6',
              borderRadius: 1,
              textAlign: 'center'
            }}>
              <Typography variant="caption" sx={{ display: 'block', color: '#6b7280', mb: 0.5 }}>
                Total Network
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {totalKms.toFixed(1)} km
              </Typography>
            </Box>
          </Paper>

          {/* City Stats Summary */}
          <Paper sx={{ p: 2.5, mb: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Cities by Status
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center', p: 1, backgroundColor: '#ecfdf5', borderRadius: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#059669' }}>
                    {operationalCount}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#059669' }}>
                    Operational
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center', p: 1, backgroundColor: '#fffbeb', borderRadius: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f59e0b' }}>
                    {underConstructionCount}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#f59e0b' }}>
                    Under Const.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center', p: 1, backgroundColor: '#eff6ff', borderRadius: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3b82f6' }}>
                    {plannedCount}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#3b82f6' }}>
                    Planned
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant={filterStatus === 'all' ? 'contained' : 'outlined'}
                onClick={() => setFilterStatus('all')}
                sx={{ flex: 1 }}
              >
                All
              </Button>
              <Button
                size="small"
                variant={filterStatus === 'operational' ? 'contained' : 'outlined'}
                onClick={() => setFilterStatus('operational')}
                sx={{ flex: 1, backgroundColor: filterStatus === 'operational' ? '#059669' : 'transparent', color: filterStatus === 'operational' ? 'white' : 'inherit' }}
              >
                Active
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              size="small"
              variant="text"
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* City Overlay Dialog */}
      <Dialog
        open={openOverlay}
        onClose={handleCloseOverlay}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedCity && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ color: 'primary.main' }} />
                  {selectedCity.city}
                </Typography>
                <IconButton onClick={handleCloseOverlay} size="small">
                  <Close />
                </IconButton>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 2 }}>
                  📍 Location: {selectedCity.latitude.toFixed(4)}°, {selectedCity.longitude.toFixed(4)}°
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                {selectedCity.operational_kms > 0 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ color: '#059669', fontSize: '1.2em' }}>✓</span>
                        Operational
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#059669', fontWeight: 'bold' }}>
                        {selectedCity.operational_kms} km
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e0f2fe',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#059669',
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                )}

                {selectedCity.under_construction_kms > 0 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ color: '#f59e0b', fontSize: '1.2em' }}>🔨</span>
                        Under Construction
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                        {selectedCity.under_construction_kms} km
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#fef3c7',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#f59e0b',
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                )}

                {selectedCity.planned_kms > 0 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ color: '#3b82f6', fontSize: '1.2em' }}>📋</span>
                        Planned
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#3b82f6', fontWeight: 'bold' }}>
                        {selectedCity.planned_kms} km
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#dbeafe',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#3b82f6',
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                )}
              </Box>

              <Box sx={{ p: 2, backgroundColor: '#f9fafb', borderRadius: 2, border: '1px solid #e5e7eb' }}>
                <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 2, fontWeight: 600 }}>
                  Progress Summary
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {(() => {
                    const total = selectedCity.operational_kms + selectedCity.under_construction_kms + selectedCity.planned_kms;
                    return (
                      <>
                        <Chip
                          icon={<span>✓</span>}
                          label={`${((selectedCity.operational_kms / total) * 100).toFixed(1)}% Operational`}
                          sx={{ backgroundColor: '#d1fae5', color: '#059669', fontWeight: 600 }}
                        />
                        {selectedCity.under_construction_kms > 0 && (
                          <Chip
                            icon={<span>🔨</span>}
                            label={`${((selectedCity.under_construction_kms / total) * 100).toFixed(1)}% Under Construction`}
                            sx={{ backgroundColor: '#fef3c7', color: '#f59e0b', fontWeight: 600 }}
                          />
                        )}
                        {selectedCity.planned_kms > 0 && (
                          <Chip
                            icon={<span>📋</span>}
                            label={`${((selectedCity.planned_kms / total) * 100).toFixed(1)}% Planned`}
                            sx={{ backgroundColor: '#dbeafe', color: '#3b82f6', fontWeight: 600 }}
                          />
                        )}
                      </>
                    );
                  })()}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          {selectedCity?.wikipedia_link && (
            <Button
              variant="contained"
              href={selectedCity.wikipedia_link}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Learn More on Wikipedia
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InteractiveMap;
