import { STATUS_FIELDS } from '../constants/metroStatus.js';

export const getCityTotalKms = (city) =>
  city.operational_kms + city.under_construction_kms + city.planned_kms;

export const getMetroTotals = (cities) => {
  const totals = cities.reduce(
    (acc, city) => ({
      operational: acc.operational + city.operational_kms,
      underConstruction: acc.underConstruction + city.under_construction_kms,
      planned: acc.planned + city.planned_kms,
    }),
    { operational: 0, underConstruction: 0, planned: 0 }
  );

  return {
    ...totals,
    total: totals.operational + totals.underConstruction + totals.planned,
    cities: cities.length,
  };
};

export const getStatusCounts = (cities) => ({
  operational: cities.filter((city) => city.operational_kms > 0).length,
  underConstruction: cities.filter((city) => city.under_construction_kms > 0).length,
  planned: cities.filter((city) => city.planned_kms > 0).length,
  total: cities.length,
});

export const hasStatusKms = (city, status) => {
  const field = STATUS_FIELDS[status];
  return field ? city[field] > 0 : false;
};

export const getCityPrimaryStatus = (city) => {
  if (city.operational_kms > 0 && city.under_construction_kms === 0 && city.planned_kms === 0) {
    return 'operational';
  }
  if (city.under_construction_kms > 0) {
    return 'underConstruction';
  }
  if (city.planned_kms > 0) {
    return 'planned';
  }
  return null;
};

export const withCityTotals = (cities) =>
  cities.map((city) => ({
    ...city,
    total: getCityTotalKms(city),
  }));

