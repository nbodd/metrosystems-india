import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Chip, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TrendingUpRounded, TrendingDownRounded, HorizontalRuleRounded, ArrowForwardRounded } from '@mui/icons-material';

function AnimatedNumber({ value, decimals = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start;
    let frame = 0;
    const duration = 1000;

    const tick = (timestamp) => {
      if (!start) {
        start = timestamp;
      }

      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const trendIcons = {
  up: TrendingUpRounded,
  down: TrendingDownRounded,
  stable: HorizontalRuleRounded,
};

const trendColors = {
  up: 'success',
  down: 'error',
  stable: 'action',
};

// Enhanced accent colors with glassmorphism effects
export default function MetricCard({
  label,
  value,
  suffix = '',
  subtext,
  icon: Icon,
  accent = 'primary',
  decimals = 0,
  trend = 'stable',
  trendValue,
  maxValue,
  progress,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const accents = useMemo(
    () => ({
      primary: {
        value: isDark ? '#7dd3fc' : '#1e40af',
        border: isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(37, 99, 235, 0.24) 0%, rgba(15, 23, 42, 0.1) 100%)'
          : 'linear-gradient(145deg, rgba(241, 245, 255, 0.95) 0%, rgba(224, 231, 255, 0.85) 100%)',
        glow: 'rgba(59, 130, 246, 0.15)',
        iconBg: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.12)',
        iconColor: isDark ? '#7dd3fc' : '#1e40af',
      },
      success: {
        value: isDark ? '#5eead4' : '#065f46',
        border: isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(6, 95, 70, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.24) 0%, rgba(4, 47, 51, 0.15) 100%)'
          : 'linear-gradient(145deg, rgba(240, 253, 250, 0.95) 0%, rgba(224, 242, 254, 0.85) 100%)',
        glow: 'rgba(16, 185, 129, 0.15)',
        iconBg: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 95, 70, 0.12)',
        iconColor: isDark ? '#5eead4' : '#065f46',
      },
      warning: {
        value: isDark ? '#fcd34d' : '#92400e',
        border: isDark ? 'rgba(245, 158, 11, 0.45)' : 'rgba(180, 83, 9, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(180, 83, 9, 0.25) 0%, rgba(79, 29, 14, 0.16) 100%)'
          : 'linear-gradient(145deg, rgba(255, 251, 235, 0.96) 0%, rgba(254, 243, 199, 0.86) 100%)',
        glow: 'rgba(245, 158, 11, 0.15)',
        iconBg: isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(180, 83, 9, 0.12)',
        iconColor: isDark ? '#fcd34d' : '#92400e',
      },
      info: {
        value: isDark ? '#7dd3fc' : '#0c4a6e',
        border: isDark ? 'rgba(147, 197, 253, 0.35)' : 'rgba(7, 89, 133, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(147, 197, 253, 0.18) 0%, rgba(12, 74, 110, 0.13) 100%)'
          : 'linear-gradient(145deg, rgba(240, 249, 255, 0.95) 0%, rgba(236, 253, 255, 0.82) 100%)',
        glow: 'rgba(147, 197, 253, 0.15)',
        iconBg: isDark ? 'rgba(147, 197, 253, 0.2)' : 'rgba(7, 89, 133, 0.12)',
        iconColor: isDark ? '#7dd3fc' : '#0c4a6e',
      },
      teal: {
        value: isDark ? '#5eead4' : '#0f766e',
        border: isDark ? 'rgba(45, 212, 191, 0.4)' : 'rgba(15, 118, 110, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(13, 148, 136, 0.22) 0%, rgba(8, 47, 73, 0.18) 100%)'
          : 'linear-gradient(145deg, rgba(240, 253, 250, 0.95) 0%, rgba(224, 242, 254, 0.9) 100%)',
        glow: 'rgba(45, 212, 191, 0.15)',
        iconBg: isDark ? 'rgba(45, 212, 191, 0.2)' : 'rgba(15, 118, 110, 0.12)',
        iconColor: isDark ? '#5eead4' : '#0f766e',
      },
      blue: {
        value: isDark ? '#7dd3fc' : '#0369a1',
        border: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(3, 105, 161, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(2, 132, 199, 0.24) 0%, rgba(30, 64, 175, 0.15) 100%)'
          : 'linear-gradient(145deg, rgba(240, 249, 255, 0.95) 0%, rgba(224, 231, 255, 0.85) 100%)',
        glow: 'rgba(56, 189, 248, 0.15)',
        iconBg: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(3, 105, 161, 0.12)',
        iconColor: isDark ? '#7dd3fc' : '#0369a1',
      },
      amber: {
        value: isDark ? '#fcd34d' : '#b45309',
        border: isDark ? 'rgba(245, 158, 11, 0.45)' : 'rgba(180, 83, 9, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(180, 83, 9, 0.25) 0%, rgba(120, 53, 15, 0.16) 100%)'
          : 'linear-gradient(145deg, rgba(255, 251, 235, 0.96) 0%, rgba(254, 243, 199, 0.86) 100%)',
        glow: 'rgba(245, 158, 11, 0.15)',
        iconBg: isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(180, 83, 9, 0.12)',
        iconColor: isDark ? '#fcd34d' : '#b45309',
      },
      slate: {
        value: isDark ? '#dbeafe' : '#1f3f61',
        border: isDark ? 'rgba(147, 197, 253, 0.35)' : 'rgba(31, 63, 97, 0.16)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(56, 189, 248, 0.14) 0%, rgba(30, 64, 175, 0.13) 100%)'
          : 'linear-gradient(145deg, rgba(247, 250, 252, 0.98) 0%, rgba(224, 242, 254, 0.82) 100%)',
        glow: 'rgba(147, 197, 253, 0.15)',
        iconBg: isDark ? 'rgba(147, 197, 253, 0.2)' : 'rgba(31, 63, 97, 0.12)',
        iconColor: isDark ? '#dbeafe' : '#1f3f61',
      },
    }),
    [isDark]
  );

  const colors = accents[accent] || accents.primary;
  const TrendIcon = trendIcons[trend] || HorizontalRuleRounded;
  const trendColor = trendColors[trend] || 'action';

  return (
    <Card
      elevation={0}
      sx={{
        background: colors.bg,
        backdropFilter: 'blur(16px) saturate(130%)',
        borderColor: colors.border,
        p: { xs: 2, sm: 2.5 },
        minHeight: 196,
        height: '100%',
        boxShadow: isDark ? '0 12px 32px rgba(0, 0, 0, 0.26)' : '0 12px 28px rgba(20, 38, 63, 0.08)',
        border: '1px solid',
        borderColor: colors.border,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(100% 100% at 0% 0%, ${colors.glow} 0%, transparent 50%)`,
          opacity: 0.4,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isDark ? '0 16px 40px rgba(0, 0, 0, 0.33)' : '0 16px 36px rgba(20, 38, 63, 0.12)',
          '&::before': {
            opacity: 0.6,
          },
        },
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant='caption' sx={{ 
              display: 'block', 
              color: 'text.secondary', 
              mb: 1.25, 
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {label}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 1, minWidth: 0, flexWrap: 'wrap' }}>
              <Typography
                sx={{
                  fontSize: 'clamp(2rem, 4vw, 2.9rem)',
                  lineHeight: 1,
                  fontWeight: 700,
                  color: colors.value,
                  whiteSpace: 'nowrap',
                }}
              >
                <AnimatedNumber value={value} decimals={decimals} />
              </Typography>
              {suffix && (
                <Box component='span' sx={{ 
                  fontSize: 'clamp(1rem, 2vw, 1.4rem)', 
                  color: 'text.secondary',
                  fontWeight: 500
                }}>
                  {suffix}
                </Box>
              )}
            </Box>

            {subtext && (
              <Typography variant='body2' sx={{ 
                color: 'text.secondary', 
                fontSize: '0.875rem',
                lineHeight: 1.5
              }}>
                {subtext}
              </Typography>
            )}

            {/* Progress bar if provided */}
            {progress !== undefined && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant='determinate'
                  value={progress}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 999,
                      backgroundColor: colors.value,
                    },
                  }}
                />
                <Typography variant='caption' sx={{ 
                  color: 'text.secondary', 
                  display: 'block', 
                  mt: 0.75
                }}>
                  {progress}% complete
                </Typography>
              </Box>
            )}
          </Box>

          {Icon && (
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.25,
                bgcolor: colors.iconBg,
                color: colors.iconColor,
                border: '1px solid',
                borderColor: colors.border,
                flex: '0 0 auto',
                display: 'grid',
                placeItems: 'center',
                boxShadow: `0 0 0 2px ${colors.glow}`,
                transition: 'all 0.3s ease',
              }}
            >
              <Icon sx={{ fontSize: 20 }} />
            </Box>
          )}
        </Box>

        {/* Trend indicator */}
        {trendValue && (
          <Chip
            label={trendValue}
            icon={<TrendIcon sx={{ fontSize: 14 }} />}
            size='small'
            color={trendColor}
            variant='outlined'
            sx={{
              mt: 2,
              height: 28,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: '0.6875rem',
              borderWidth: '1.5px',
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.04)',
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
