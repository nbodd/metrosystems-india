import {
  CheckCircleRounded,
  ConstructionRounded,
  DirectionsRailwayRounded,
  TimelineRounded,
  WarningRounded,
} from '@mui/icons-material';

export const METRO_STATUS = {
  operational: {
    label: 'Operational',
    color: '#0f766e',
    borderColor: '#065f46',
    icon: CheckCircleRounded,
  },
  underConstruction: {
    label: 'Under Construction',
    color: '#b45309',
    borderColor: '#92400e',
    icon: WarningRounded,
  },
  planned: {
    label: 'Planned',
    color: '#0369a1',
    borderColor: '#075985',
    icon: ConstructionRounded,
  },
};

export const DEFAULT_STATUS = {
  label: 'Metro',
  color: '#64748b',
  borderColor: '#475569',
  icon: DirectionsRailwayRounded,
};

export const STATUS_ORDER = ['operational', 'underConstruction', 'planned'];

export const STATUS_FIELDS = {
  operational: 'operational_kms',
  underConstruction: 'under_construction_kms',
  planned: 'planned_kms',
};

export const FALLBACK_STATUS_ICON = TimelineRounded;

