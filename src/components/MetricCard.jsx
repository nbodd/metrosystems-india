import React from 'react';

export default function MetricCard({ label, value, subtext, icon: Icon, color = 'slate' }) {
  const colorClasses = {
    slate: 'bg-slate-50 border-slate-200 text-slate-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
  };

  const accentClasses = {
    slate: 'text-slate-900',
    blue: 'text-blue-900',
    green: 'text-green-900',
    purple: 'text-purple-900',
  };

  const iconBgClasses = {
    slate: 'bg-slate-100',
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg p-6 relative overflow-hidden shadow-sm border hover:shadow-md transition-shadow duration-300`}>
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-slate-600 text-xs font-semibold mb-3 uppercase tracking-wide">{label}</p>
          <p className={`text-3xl font-bold ${accentClasses[color]} mb-1`}>{value}</p>
          {subtext && <p className="text-slate-500 text-xs">{subtext}</p>}
        </div>
        {Icon && (
          <div className={`${iconBgClasses[color]} w-12 h-12 flex items-center justify-center rounded-lg text-lg`}>
            {Icon}
          </div>
        )}
      </div>
    </div>
  );
}
