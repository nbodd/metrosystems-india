import { AppBar, Box, Chip, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  CheckCircleRounded,
  DarkModeRounded,
  FmdGoodRounded,
  LightModeRounded,
  MenuRounded,
} from '@mui/icons-material';
import { APP_BAR_HEIGHT } from '../../constants/navigation.js';

export default function HeaderBar({ darkMode, onToggleMode, onOpenDrawer }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        height: APP_BAR_HEIGHT,
        bgcolor: isDark ? 'rgba(8, 13, 24, 0.78)' : 'rgba(255, 255, 255, 0.76)',
        color: 'text.primary',
        backdropFilter: 'blur(22px) saturate(160%)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: theme.zIndex.appBar,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Toolbar sx={{ height: APP_BAR_HEIGHT, px: { xs: 2, sm: 3, md: 4 }, gap: 1.5, minWidth: 0 }}>
        <Box sx={{ display: { md: 'none' } }}>
          <IconButton
            onClick={onOpenDrawer}
            aria-label='Open navigation'
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              color: 'text.primary',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <MenuRounded fontSize='large' />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              flex: '0 0 auto',
              color: 'primary.contrastText',
              background: 'linear-gradient(135deg, #2563eb 0%, #0f766e 100%)',
              boxShadow: isDark ? '0 12px 28px rgba(37, 99, 235, 0.24)' : '0 12px 24px rgba(37, 99, 235, 0.18)',
            }}
          >
            <FmdGoodRounded sx={{ fontSize: 22 }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: { xs: 180, sm: 320 },
              }}
            >
              Metro Systems India
            </Typography>
            <Typography
              variant='caption'
              sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.secondary', letterSpacing: 0, textTransform: 'none', lineHeight: 1.2 }}
            >
              Urban rail network intelligence
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          <Chip
            icon={<CheckCircleRounded sx={{ fontSize: 16 }} />}
            label='April 2026'
            size='small'
            variant='outlined'
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              height: 32,
              borderRadius: 999,
              fontWeight: 700,
              bgcolor: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(15, 118, 110, 0.08)',
              color: isDark ? '#86efac' : '#0f766e',
              borderColor: isDark ? 'rgba(134, 239, 172, 0.25)' : 'rgba(15, 118, 110, 0.18)',
            }}
          />
          <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={onToggleMode}
              aria-label='Toggle dark mode'
              sx={{ width: 44, height: 44, borderRadius: 2, color: 'text.primary', '&:hover': { backgroundColor: 'action.hover' } }}
            >
              {darkMode ? <LightModeRounded fontSize='large' /> : <DarkModeRounded fontSize='large' />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

