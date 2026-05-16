import { Box, Button, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowForwardRounded } from '@mui/icons-material';

export default function HeroOverview({ totals, onNavigate }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const operationalShare = ((totals.operational / (totals.total || 1)) * 100).toFixed(1);
  const buildShare = (((totals.underConstruction + totals.planned) / (totals.total || 1)) * 100).toFixed(1);

  return (
    <Box
      id='dashboard'
      sx={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.4fr) minmax(320px, 0.6fr)' },
        gap: { xs: 2, md: 3 },
        p: { xs: 2.25, sm: 3, md: 4 },
        border: '1px solid',
        borderColor: isDark ? 'rgba(148, 163, 184, 0.22)' : 'rgba(15, 23, 42, 0.12)',
        borderRadius: 2,
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(135deg, rgba(10, 18, 32, 0.9), rgba(19, 39, 60, 0.76))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(236, 253, 245, 0.76))',
        boxShadow: isDark ? '0 24px 80px rgba(0, 0, 0, 0.34)' : '0 24px 70px rgba(31, 63, 97, 0.12)',
        backdropFilter: 'blur(22px) saturate(150%)',
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Chip
          label={`${totals.cities} systems tracked`}
          size='small'
          sx={{
            mb: 2,
            borderRadius: 999,
            fontWeight: 800,
            color: isDark ? '#bfdbfe' : '#1d4ed8',
            bgcolor: isDark ? 'rgba(59, 130, 246, 0.14)' : 'rgba(37, 99, 235, 0.08)',
          }}
        />
        <Typography
          variant='h1'
          sx={{ fontSize: { xs: '2rem', sm: '2.7rem', md: '3.35rem' }, maxWidth: 820, fontWeight: 850, lineHeight: 1.05, letterSpacing: 0 }}
        >
          India metro network dashboard
        </Typography>
        <Typography variant='body1' sx={{ mt: 1.5, maxWidth: 720, color: 'text.secondary', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
          A clean view of operational lines, active construction, planned expansion, and city-level network scale.
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap', mt: 3 }}>
          <Button variant='contained' endIcon={<ArrowForwardRounded />} onClick={() => onNavigate('#analytics')} sx={{ borderRadius: 999, px: 2.5 }}>
            View analytics
          </Button>
          <Button variant='outlined' onClick={() => onNavigate('#network-map')} sx={{ borderRadius: 999, px: 2.5 }}>
            Open map
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gap: 1.25, alignContent: 'center', minWidth: 0 }}>
        {[
          ['Total network', `${totals.total.toFixed(0)} km`, 'primary.main'],
          ['Operational share', `${operationalShare}%`, 'success.main'],
          ['Expansion pipeline', `${buildShare}%`, 'warning.main'],
        ].map(([label, value, color]) => (
          <Box
            key={label}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: isDark ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 23, 42, 0.1)',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.64)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant='body2' sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {label}
            </Typography>
            <Typography sx={{ color, fontWeight: 850, fontSize: '1.35rem', whiteSpace: 'nowrap' }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

