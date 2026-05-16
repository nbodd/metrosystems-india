import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FmdGoodRounded } from '@mui/icons-material';
import {
  APP_BAR_HEIGHT,
  bottomNavigationItems,
  DRAWER_WIDTH,
  navigationItems,
} from '../../constants/navigation.js';

function DrawerSection({ label, items, onClose, onNavigate }) {
  return (
    <List component='nav' disablePadding>
      <Typography variant='overline' sx={{ px: 3, py: 1.5, color: 'text.secondary', fontSize: '0.6875rem' }}>
        {label}
      </Typography>
      {items.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            onClick={() => {
              onNavigate(item.href);
              onClose();
            }}
            sx={{
              height: label === 'Navigation' ? 48 : 44,
              px: 3,
              borderRadius: 2,
              mx: 1.5,
              my: 0.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'translateX(4px)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
              <item.icon fontSize='medium' />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: label === 'Navigation' ? 600 : 500,
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default function NavigationDrawer({ open, onClose, onNavigate }) {
  const theme = useTheme();

  return (
    <Drawer
      variant='temporary'
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 250, 252, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <Toolbar sx={{ height: APP_BAR_HEIGHT, px: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'primary.main', display: 'grid', placeItems: 'center' }}>
          <FmdGoodRounded sx={{ fontSize: 24, color: 'primary.contrastText' }} />
        </Box>
        <Typography variant='h6' sx={{ fontWeight: 700, color: 'text.primary' }}>
          Metro Systems
        </Typography>
      </Toolbar>

      <Divider sx={{ my: 1, borderColor: 'divider' }} />
      <DrawerSection label='Navigation' items={navigationItems} onClose={onClose} onNavigate={onNavigate} />
      <Divider sx={{ my: 2, borderColor: 'divider' }} />
      <DrawerSection label='More' items={bottomNavigationItems} onClose={onClose} onNavigate={onNavigate} />
      <Divider sx={{ my: 2, borderColor: 'divider' }} />

      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block' }}>
          v2.0.0
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.tertiary', fontSize: '0.75rem' }}>
          Transit Operations
        </Typography>
      </Box>
    </Drawer>
  );
}

