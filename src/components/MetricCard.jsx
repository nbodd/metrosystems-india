import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function AnimatedNumber({ value, decimals = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start;
    let frame = 0;
    const duration = 900;

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

export default function MetricCard({
  label,
  value,
  suffix = '',
  subtext,
  icon: Icon,
  accent = 'teal',
  decimals = 0,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const accents = useMemo(
    () => ({
      teal: {
        value: isDark ? '#5eead4' : '#0f766e',
        border: isDark ? 'rgba(45, 212, 191, 0.4)' : 'rgba(15, 118, 110, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(13, 148, 136, 0.22), rgba(8, 47, 73, 0.18))'
          : 'linear-gradient(145deg, rgba(240, 253, 250, 0.95), rgba(224, 242, 254, 0.9))',
      },
      blue: {
        value: isDark ? '#7dd3fc' : '#0369a1',
        border: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(3, 105, 161, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(2, 132, 199, 0.24), rgba(30, 64, 175, 0.15))'
          : 'linear-gradient(145deg, rgba(240, 249, 255, 0.95), rgba(224, 231, 255, 0.85))',
      },
      amber: {
        value: isDark ? '#fcd34d' : '#b45309',
        border: isDark ? 'rgba(245, 158, 11, 0.45)' : 'rgba(180, 83, 9, 0.22)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(180, 83, 9, 0.25), rgba(120, 53, 15, 0.16))'
          : 'linear-gradient(145deg, rgba(255, 251, 235, 0.96), rgba(254, 243, 199, 0.86))',
      },
      slate: {
        value: isDark ? '#dbeafe' : '#1f3f61',
        border: isDark ? 'rgba(147, 197, 253, 0.35)' : 'rgba(31, 63, 97, 0.16)',
        bg: isDark
          ? 'linear-gradient(145deg, rgba(56, 189, 248, 0.14), rgba(30, 64, 175, 0.13))'
          : 'linear-gradient(145deg, rgba(247, 250, 252, 0.98), rgba(224, 242, 254, 0.82))',
      },
    }),
    [isDark]
  );

  const colors = accents[accent] || accents.teal;

  return (
    <Card
      elevation={0}
      sx={{
        background: colors.bg,
        backdropFilter: 'blur(14px) saturate(128%)',
        borderColor: colors.border,
        p: { xs: 2, sm: 2.5 },
        height: '100%',
        boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.26)' : '0 12px 28px rgba(20, 38, 63, 0.08)',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: colors.value,
          boxShadow: isDark ? '0 14px 32px rgba(0, 0, 0, 0.33)' : '0 14px 30px rgba(20, 38, 63, 0.12)',
        },
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant='caption' sx={{ display: 'block', color: 'text.secondary', mb: 1.25, fontWeight: 700 }}>
              {label}
            </Typography>
            <Typography
              sx={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                lineHeight: 1,
                fontWeight: 700,
                color: colors.value,
                mb: 1,
                whiteSpace: 'nowrap',
              }}
            >
              <AnimatedNumber value={value} decimals={decimals} />
              {suffix && (
                <Box component='span' sx={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', ml: 0.5 }}>
                  {suffix}
                </Box>
              )}
            </Typography>
            {subtext && (
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {subtext}
              </Typography>
            )}
          </Box>
          {Icon && (
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.25,
                bgcolor: isDark ? 'rgba(225, 242, 255, 0.12)' : 'rgba(2, 132, 199, 0.1)',
                color: colors.value,
                border: '1px solid',
                borderColor: colors.border,
                flex: '0 0 auto',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Icon fontSize='small' />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
