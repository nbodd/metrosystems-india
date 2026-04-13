import React, { Component } from 'react';

import MetricCard from './components/MetricCard.jsx';
import AnalyticsCharts from './components/AnalyticsCharts.jsx';

import MetroData from './data/metro.json';
import MetroCitiesData from './data/metro-cities.json';

class App extends Component {
  render() {
    const allData = [...MetroData, ...MetroCitiesData];
    const totalOperational = allData.reduce((sum, d) => sum + d.operational_kms, 0);
    const totalUnderConstruction = allData.reduce((sum, d) => sum + d.under_construction_kms, 0);
    const totalPlanned = allData.reduce((sum, d) => sum + d.planned_kms, 0);
    const totalNetwork = totalOperational + totalUnderConstruction + totalPlanned;
    const citiesCount = allData.length;

    return (
      <div className='min-h-screen bg-white'>
        {/* Header */}
        <div className='bg-white border-b border-slate-200 shadow-sm'>
          <div className='max-w-7xl mx-auto px-4 py-12 sm:py-16'>
            <div className='mb-4'>
              <div className='flex items-center gap-4 mb-3'>
                <div className='text-4xl'>🚇</div>
                <h1 className='text-4xl sm:text-5xl font-bold text-slate-900 leading-tight'>Metro Systems India</h1>
              </div>
              <p className='text-base text-slate-600 font-normal'>Comprehensive analytics dashboard for Indian metropolitan rail networks</p>
            </div>
            <p className='text-sm text-slate-500 font-normal'>📊 Last Updated: April 13, 2026</p>
          </div>
        </div>

        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-4 py-16'>
          {/* KPI Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
            <MetricCard
              label='Total Network Length'
              value={`${totalNetwork.toFixed(0)} km`}
              subtext='Across all Indian metros'
              color='blue'
              icon='📊'
            />
            <MetricCard
              label='Operational Network'
              value={`${totalOperational.toFixed(0)} km`}
              subtext={`${((totalOperational / totalNetwork) * 100).toFixed(1)}% of total`}
              color='green'
              icon='✓'
            />
            <MetricCard
              label='Under Construction'
              value={`${totalUnderConstruction.toFixed(0)} km`}
              subtext={`${((totalUnderConstruction / totalNetwork) * 100).toFixed(1)}% of total`}
              color='purple'
              icon='⚙'
            />
            <MetricCard
              label='Cities Analyzed'
              value={citiesCount}
              subtext={`${MetroData.length} Tier I, ${MetroCitiesData.length} Tier II`}
              color='slate'
              icon='🏙'
            />
          </div>

          {/* Charts Section */}
          <AnalyticsCharts tierOneData={MetroData} tierTwoData={MetroCitiesData} />

          {/* Data Source Footer */}
          <div className='mt-16 p-8 bg-slate-50 rounded-xl shadow-sm border border-slate-200'>
            <p className='text-base text-slate-700 leading-relaxed'>
              <span className='font-semibold text-slate-900'>📚 Data Source:</span> <span className='text-slate-600'>Information compiled from Wikipedia and official metro authority sources. This dashboard provides a comprehensive view of India's rapid metro rail expansion across Tier I and Tier II cities.</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
