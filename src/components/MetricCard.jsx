import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function MetricCard({ label, value, subtext, icon: Icon, color = 'slate' }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const colorMap = {
    slate: {
      bg: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(15, 23, 42, 0.05)',
      border: isDark ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 1)',
      text: isDark ? '#cbd5e1' : '#1e293b',
      accent: isDark ? '#e2e8f0' : '#0f172a',
      avatarBg: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(226, 232, 240, 1)',
    },
    blue: {
      bg: isDark ? 'rgba(30, 58, 138, 0.2)' : 'rgba(219, 234, 254, 0.5)',
      border: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(191, 219, 254, 1)',
      text: isDark ? '#93c5fd' : '#1e40af',
      accent: isDark ? '#60a5fa' : '#1e3a8a',
      avatarBg: isDark ? 'rgba(30, 58, 138, 0.8)' : 'rgba(219, 234, 254, 1)',
    },
    green: {
      bg: isDark ? 'rgba(5, 150, 105, 0.2)' : 'rgba(220, 252, 231, 0.5)',
      border: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(167, 243, 208, 1)',
      text: isDark ? '#86efac' : '#166534',
      accent: isDark ? '#34d399' : '#15803d',
      avatarBg: isDark ? 'rgba(5, 150, 105, 0.8)' : 'rgba(220, 252, 231, 1)',
    },
    purple: {
      bg: isDark ? 'rgba(126, 34, 206, 0.2)' : 'rgba(243, 232, 255, 0.5)',
      border: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(221, 214, 254, 1)',
      text: isDark ? '#d8b4fe' : '#7e22ce',
      accent: isDark ? '#c084fc' : '#6b21a8',
      avatarBg: isDark ? 'rgba(126, 34, 206, 0.8)' : 'rgba(243, 232, 255, 1)',
    },
  };

  const colors = colorMap[color];

  return (
    <Card
      sx={{
        background: colors.bg,
        border: `2px solid ${colors.border}`,
        borderRadius: 2,
        p: { xs: 1.5, sm: 2 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isDark
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          borderColor: colors.accent,
        },
      }}
      elevation={isDark ? 4 : 2}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant='caption'
              sx={{
                display: 'block',
                color: colors.text,
                opacity: 0.7,
                mb: 1,
                fontWeight: 700,
              }}
            >
              {label}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 800,
                color: colors.accent,
                mb: 0.5,
                letterSpacing: '-0.01em',
              }}
            >
              {value}
            </Typography>
            {subtext && (
              <Typography
                variant='caption'
                sx={{
                  color: colors.text,
                  opacity: 0.6,
                  fontSize: '0.8rem',
                  fontWeight: 400,
                }}
              >
                {subtext}
              </Typography>
            )}
          </Box>
          {Icon && (
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: colors.avatarBg,
                color: colors.accent,
                fontSize: '1.8rem',
                flex: '0 0 auto',
              }}
            >
              {Icon}
            </Avatar>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
