import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

export default function AnalyticsCharts({ tierOneData, tierTwoData }) {
  const [chartType, setChartType] = useState('stacked');

  // Combine all data for top performers
  const allData = [...tierOneData, ...tierTwoData];
  const totalOperational = allData.reduce((sum, d) => sum + d.operational_kms, 0);
  const totalUnderConstruction = allData.reduce((sum, d) => sum + d.under_construction_kms, 0);
  const totalPlanned = allData.reduce((sum, d) => sum + d.planned_kms, 0);

  const statusData = [
    { name: 'Operational', value: totalOperational, fill: '#3b82f6', percentage: ((totalOperational / (totalOperational + totalUnderConstruction + totalPlanned)) * 100).toFixed(1) },
    { name: 'Under Construction', value: totalUnderConstruction, fill: '#f59e0b', percentage: ((totalUnderConstruction / (totalOperational + totalUnderConstruction + totalPlanned)) * 100).toFixed(1) },
    { name: 'Planned', value: totalPlanned, fill: '#8b5cf6', percentage: ((totalPlanned / (totalOperational + totalUnderConstruction + totalPlanned)) * 100).toFixed(1) },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-sm font-semibold text-gray-800">{payload[0].payload.city}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toFixed(1)} km
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-sm font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-gray-600">{payload[0].value.toFixed(0)} km</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Status Overview - Pie Chart */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Metro Network Status Distribution</h3>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-3">
            {statusData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-lg" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">{item.value.toFixed(0)}</p>
                  <p className="text-xs text-slate-500">km ({item.percentage}%)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tier I Cities - Stacked/Grouped Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Tier I Cities - Metro Network</h3>
            <p className="text-sm text-slate-500 mt-1">Largest metropolitan areas with comprehensive metro systems</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('stacked')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                chartType === 'stacked'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Stacked
            </button>
            <button
              onClick={() => setChartType('grouped')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                chartType === 'grouped'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Grouped
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={tierOneData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="city"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft', fill: '#64748b' }} tick={{ fill: '#64748b' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="operational_kms" stackId={chartType === 'stacked' ? 'a' : undefined} fill="#3b82f6" name="Operational" radius={[4, 4, 0, 0]} />
            <Bar dataKey="under_construction_kms" stackId={chartType === 'stacked' ? 'a' : undefined} fill="#f59e0b" name="Under Construction" radius={[4, 4, 0, 0]} />
            <Bar dataKey="planned_kms" stackId={chartType === 'stacked' ? 'a' : undefined} fill="#8b5cf6" name="Planned" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tier II Cities - Chart */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Tier II Cities - Metro Network</h3>
        <p className="text-sm text-slate-500 mb-6">Secondary metropolitan areas and emerging cities</p>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={tierTwoData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="city"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft', fill: '#64748b' }} tick={{ fill: '#64748b' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="operational_kms" fill="#3b82f6" name="Operational" radius={[4, 4, 0, 0]} />
            <Bar dataKey="under_construction_kms" fill="#f59e0b" name="Under Construction" radius={[4, 4, 0, 0]} />
            <Bar dataKey="planned_kms" fill="#8b5cf6" name="Planned" radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Total Distance by City */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Total Network Length by City</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allData
            .map(city => ({
              ...city,
              total: city.operational_kms + city.under_construction_kms + city.planned_kms,
            }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 8)
            .map((city, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-900">{city.city}</h4>
                    {city.wikipedia_link && (
                      <a
                        href={city.wikipedia_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                        title="View on Wikipedia"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <span className="text-lg font-bold text-slate-900">{city.total.toFixed(1)} km</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 bg-white rounded border border-slate-200">
                    <span className="flex items-center gap-2"><span className="text-lg">✓</span><span className="text-slate-700 font-medium">Operational</span></span>
                    <span className="font-bold text-blue-600">{city.operational_kms.toFixed(1)} km</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-white rounded border border-slate-200">
                    <span className="flex items-center gap-2"><span className="text-lg">⚙</span><span className="text-slate-700 font-medium">Under Construction</span></span>
                    <span className="font-bold text-amber-600">{city.under_construction_kms.toFixed(1)} km</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-white rounded border border-slate-200">
                    <span className="flex items-center gap-2"><span className="text-lg">📋</span><span className="text-slate-700 font-medium">Planned</span></span>
                    <span className="font-bold text-purple-600">{city.planned_kms.toFixed(1)} km</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
