import { createTheme } from '@mui/material/styles';

const sharedThemeOptions = {
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: ['Inter', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    h1: { fontSize: '2.15rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '1.25rem', fontWeight: 650, lineHeight: 1.35 },
    h3: { fontSize: '1rem', fontWeight: 650, lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.6, letterSpacing: 0 },
    body2: { fontSize: '0.9rem', lineHeight: 1.55, letterSpacing: 0 },
    caption: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: 0.24 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: '1px solid',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: '1px solid',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 600, letterSpacing: 0 },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '2px solid #0284c7',
            outlineOffset: 2,
          },
        },
      },
    },
  },
};

const lightTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'light',
    primary: { main: '#0ea5e9' },
    secondary: { main: '#14b8a6' },
    warning: { main: '#f59e0b' },
    success: { main: '#0d9488' },
    background: {
      default: '#eff6ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#12233f',
      secondary: '#4b607d',
    },
    divider: 'rgba(18, 35, 63, 0.14)',
  },
});

const darkTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'dark',
    primary: { main: '#22d3ee' },
    secondary: { main: '#2dd4bf' },
    warning: { main: '#fbbf24' },
    success: { main: '#34d399' },
    background: {
      default: '#060f20',
      paper: '#0b1d35',
    },
    text: {
      primary: '#e5f3ff',
      secondary: '#9cb2cd',
    },
    divider: 'rgba(162, 190, 220, 0.25)',
  },
});

export { lightTheme, darkTheme };
