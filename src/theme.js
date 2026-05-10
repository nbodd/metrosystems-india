import { createTheme } from '@mui/material/styles';

// Premium color palette for transit operations dashboard
const premiumColors = {
  // Primary brand colors - Metro Blue
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    A100: '#80c8ff',
    A200: '#4dabf7',
    A400: '#1e90ff',
    A700: '#1976d2',
  },
  // Secondary - Metro Teal (Operational status)
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    A100: '#88fca3',
    A200: '#55f69f',
    A400: '#22d3ee',
    A700: '#0891b2',
  },
  // Success - On-time status
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  // Warning - Delays, construction
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  // Error - Disruptions, incidents
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  // Info - General information
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  // Status colors for metro operations
  status: {
    operational: '#0f766e',
    underConstruction: '#b45309',
    planned: '#0369a1',
    onTime: '#22c55e',
    delayed: '#f59e0b',
    disrupted: '#ef4444',
    maintenance: '#8b5cf6',
  },
};

// Enhanced typography system
const typography = {
  fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
  htmlFontSize: 16,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '2.25rem',
    fontWeight: 700,
    lineHeight: 1.22,
    letterSpacing: '-0.015em',
    color: 'text.primary',
  },
  h2: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1.33,
    letterSpacing: '-0.00833em',
    color: 'text.primary',
  },
  h3: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: 0,
    color: 'text.primary',
  },
  h4: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.44,
    letterSpacing: '0.0075em',
    color: 'text.primary',
  },
  h5: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: 0,
    color: 'text.primary',
  },
  h6: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '0.9375rem',
    fontWeight: 600,
    lineHeight: 1.57,
    letterSpacing: '0.0075em',
    color: 'text.primary',
  },
  subtitle1: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '0.00938em',
    color: 'text.primary',
  },
  subtitle2: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
    color: 'text.primary',
  },
  body1: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: 0,
    color: 'text.primary',
  },
  body2: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: 0,
    color: 'text.secondary',
  },
  button: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'none',
  },
  caption: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
    color: 'text.secondary',
    textTransform: 'uppercase',
  },
  overline: {
    fontFamily: ['Inter', 'SF Pro Display', 'Manrope', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
    color: 'text.secondary',
    textTransform: 'uppercase',
  },
};

// Enhanced shape and spacing
const shape = {
  borderRadius: 16,
  borderRadiusSm: 12,
  borderRadiusXs: 8,
  borderRadiusLg: 20,
  borderRadiusXl: 24,
};

// Shadows for depth and elevation
const shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
  '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
  '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
  '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
  '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
  '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
  '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
  '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
  '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
  '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
  '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 30px 4px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 32px 4px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
  '0px 10px 14px -6px rgba(0,0,0,0.2),0px 21px 34px 4px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
  '0px 11px 14px -7px rgba(0,0,0,0.2),0px 22px 36px 4px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
  '0px 11px 15px -7px rgba(0,0,0,0.2),0px 23px 38px 4px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
];

// Custom shadow utilities for glassmorphism and depth
const customShadows = {
  glass: '0 4px 30px rgba(0, 0, 0, 0.08)',
  glassSm: '0 2px 20px rgba(0, 0, 0, 0.06)',
  glassLg: '0 8px 40px rgba(0, 0, 0, 0.12)',
  glassXl: '0 12px 60px rgba(0, 0, 0, 0.16)',
  glassDark: '0 4px 30px rgba(0, 0, 0, 0.3)',
  glassDarkLg: '0 8px 40px rgba(0, 0, 0, 0.4)',
  card: '0 2px 8px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04)',
  cardHover: '0 4px 16px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)',
  elevated: '0 8px 16px rgba(0, 0, 0, 0.08), 0 12px 32px rgba(0, 0, 0, 0.06)',
  elevatedHover: '0 12px 24px rgba(0, 0, 0, 0.1), 0 16px 40px rgba(0, 0, 0, 0.08)',
};

// Shared theme configuration
const sharedThemeOptions = {
  typography,
  shape,
  shadows,
  customShadows,
  spacing: 8, // Material UI default spacing factor
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        },
        body: {
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          color: 'text.primary',
          backgroundColor: 'background.default',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: shape.borderRadius,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: customShadows.cardHover,
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
        title: {
          fontSize: '1.125rem',
          fontWeight: 600,
          lineHeight: 1.44,
          letterSpacing: '0.0075em',
        },
        subheader: {
          fontSize: '0.875rem',
          color: 'text.secondary',
          marginTop: '4px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          letterSpacing: 0.25,
          fontSize: '0.75rem',
          height: 28,
          padding: '0 12px',
        },
        sizeSmall: {
          height: 24,
          fontSize: '0.6875rem',
          padding: '0 8px',
        },
        label: {
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: shape.borderRadiusSm,
          padding: '10px 24px',
          minHeight: 42,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          boxShadow: customShadows.card,
          '&:hover': {
            boxShadow: customShadows.cardHover,
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
        sizeSmall: {
          padding: '8px 16px',
          minHeight: 36,
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '12px 32px',
          minHeight: 48,
          fontSize: '0.9375rem',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '3px solid',
            outlineOffset: 2,
            outlineColor: 'primary.300',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadiusSm,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        },
        sizeSmall: {
          width: 32,
          height: 32,
          padding: 6,
        },
        sizeLarge: {
          width: 48,
          height: 48,
          padding: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 72,
          padding: '8px 24px',
          '@media (min-width: 600px)': {
            minHeight: 72,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'text.primary',
        },
        gutterBottom: {
          marginBottom: '1em',
        },
        paragraph: {
          marginBottom: '1.5em',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          height: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.12)',
          '&.MuiLinearProgress-colorPrimary': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          },
        },
        bar: {
          borderRadius: 999,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: '0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid',
          borderColor: 'divider',
          padding: '12px 16px',
          '&:first-of-type': {
            paddingLeft: 24,
          },
          '&:last-of-type': {
            paddingRight: 24,
          },
        },
        head: {
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.08333em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          backgroundColor: 'background.paper',
        },
        body: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation0: {
          boxShadow: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: shape.borderRadiusLg,
          border: '1px solid',
          borderColor: 'divider',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '24px 32px 16px',
          fontSize: '1.25rem',
          fontWeight: 600,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '0 32px 16px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 32px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: shape.borderRadiusSm,
          fontSize: '0.75rem',
          padding: '8px 12px',
          fontWeight: 500,
        },
        arrow: {
          fontSize: '0.75rem',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadiusSm,
          fontWeight: 500,
        },
        standard: {
          border: '1px solid',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 700,
          fontSize: '0.6875rem',
          minWidth: 18,
          height: 18,
          padding: '0 6px',
        },
        dot: {
          width: 8,
          height: 8,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: shape.borderRadiusSm,
          },
        },
        popper: {
          borderRadius: shape.borderRadius,
          boxShadow: customShadows.elevated,
        },
        paper: {
          borderRadius: shape.borderRadius,
          border: '1px solid',
          borderColor: 'divider',
        },
        option: {
          fontSize: '0.875rem',
          padding: '10px 16px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadiusSm,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadiusSm,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1.5px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
          },
        },
        notchedOutline: {
          borderWidth: '1.5px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: shape.borderRadiusSm,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.8125rem',
          fontWeight: 600,
          letterSpacing: '0.00714em',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          fontWeight: 600,
          letterSpacing: '0.00714em',
          minHeight: 40,
          padding: '8px 16px',
          '&.Mui-selected': {
            fontWeight: 700,
          },
        },
      },
    },
  },
};

// Light theme
const lightTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: premiumColors.primary[600],
      light: premiumColors.primary[400],
      dark: premiumColors.primary[800],
      contrastText: '#ffffff',
      ...premiumColors.primary,
    },
    secondary: {
      main: premiumColors.secondary[600],
      light: premiumColors.secondary[400],
      dark: premiumColors.secondary[800],
      contrastText: '#ffffff',
      ...premiumColors.secondary,
    },
    success: {
      main: premiumColors.success[600],
      light: premiumColors.success[400],
      dark: premiumColors.success[800],
      contrastText: '#ffffff',
    },
    warning: {
      main: premiumColors.warning[600],
      light: premiumColors.warning[400],
      dark: premiumColors.warning[800],
      contrastText: '#ffffff',
    },
    error: {
      main: premiumColors.error[600],
      light: premiumColors.error[400],
      dark: premiumColors.error[800],
      contrastText: '#ffffff',
    },
    info: {
      main: premiumColors.info[600],
      light: premiumColors.info[400],
      dark: premiumColors.info[800],
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      disabled: '#94a3b8',
    },
    divider: 'rgba(30, 41, 59, 0.15)',
    action: {
      active: 'rgba(30, 41, 59, 0.54)',
      hover: 'rgba(30, 41, 59, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(30, 41, 59, 0.12)',
      disabled: 'rgba(30, 41, 59, 0.3)',
      disabledBackground: 'rgba(30, 41, 59, 0.12)',
      focus: 'rgba(30, 41, 59, 0.12)',
      activatedOpacity: 0.24,
    },
    status: premiumColors.status,
  },
});

// Dark theme
const darkTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: premiumColors.primary[500],
      light: premiumColors.primary[400],
      dark: premiumColors.primary[700],
      contrastText: '#ffffff',
      ...premiumColors.primary,
    },
    secondary: {
      main: premiumColors.secondary[500],
      light: premiumColors.secondary[400],
      dark: premiumColors.secondary[700],
      contrastText: '#ffffff',
      ...premiumColors.secondary,
    },
    success: {
      main: premiumColors.success[500],
      light: premiumColors.success[400],
      dark: premiumColors.success[700],
      contrastText: '#ffffff',
    },
    warning: {
      main: premiumColors.warning[500],
      light: premiumColors.warning[400],
      dark: premiumColors.warning[700],
      contrastText: '#1e293b',
    },
    error: {
      main: premiumColors.error[500],
      light: premiumColors.error[400],
      dark: premiumColors.error[700],
      contrastText: '#ffffff',
    },
    info: {
      main: premiumColors.info[500],
      light: premiumColors.info[400],
      dark: premiumColors.info[700],
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
      disabled: '#64748b',
    },
    divider: 'rgba(148, 163, 184, 0.25)',
    action: {
      active: 'rgba(241, 245, 249, 0.54)',
      hover: 'rgba(241, 245, 249, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(241, 245, 249, 0.12)',
      disabled: 'rgba(241, 245, 249, 0.3)',
      disabledBackground: 'rgba(241, 245, 249, 0.12)',
      focus: 'rgba(241, 245, 249, 0.12)',
      activatedOpacity: 0.24,
    },
    status: premiumColors.status,
  },
});

// Export themes with status colors for easy access
export { lightTheme, darkTheme, premiumColors };
