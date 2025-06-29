import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiDownload } from 'react-icons/fi';

// Mock data for charts
const mockMetrics = {
  ingestionVolume: [
    { date: '2025-06-23', count: 1240 },
    { date: '2025-06-24', count: 980 },
    { date: '2025-06-25', count: 1350 },
    { date: '2025-06-26', count: 890 },
    { date: '2025-06-27', count: 1100 },
    { date: '2025-06-28', count: 750 },
    { date: '2025-06-29', count: 1420 },
  ],
  queryPerformance: [
    { date: '2025-06-23', avgTime: 120 },
    { date: '2025-06-24', avgTime: 115 },
    { date: '2025-06-25', avgTime: 125 },
    { date: '2025-06-26', avgTime: 110 },
    { date: '2025-06-27', avgTime: 105 },
    { date: '2025-06-28', avgTime: 95 },
    { date: '2025-06-29', avgTime: 90 },
  ],
  storageUsage: {
    total: 500, // GB
    used: 342,  // GB
    available: 158 // GB
  },
  systemHealth: {
    cpu: 42, // percentage
    memory: 68, // percentage
    disk: 72, // percentage
    status: 'healthy' // 'healthy', 'warning', 'critical'
  }
};

const MetricsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    alert('Metrics data would be exported here');
  };

  // Helper function to calculate the max value for chart scaling
  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map(item => item[key])) * 1.2; // Add 20% padding
  };

  // Calculate percentages for storage usage
  const storagePercentage = (mockMetrics.storageUsage.used / mockMetrics.storageUsage.total) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Metrics Dashboard</h2>
        
        <div className="flex space-x-2">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setTimeRange('day')}
              className={`px-3 py-1 text-sm ${timeRange === 'day' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              Day
            </button>
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-sm ${timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 text-sm ${timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1 text-sm ${timeRange === 'year' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              Year
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRefresh}
            className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            disabled={isRefreshing}
          >
            <FiRefreshCw className={`${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleExport}
            className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <FiDownload />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ingestion Volume Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Ingestion Volume</h3>
            <div className="text-sm text-gray-500">Records per day</div>
          </div>
          
          <div className="h-64 relative">
            {/* Simple bar chart visualization */}
            <div className="flex h-48 items-end space-x-2">
              {mockMetrics.ingestionVolume.map((day, index) => {
                const height = (day.count / getMaxValue(mockMetrics.ingestionVolume, 'count')) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-blue-500 hover:bg-blue-600 rounded-t-sm"
                        style={{ width: '60%', marginLeft: '20%' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 text-center">
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500">
              <div>1500</div>
              <div>1000</div>
              <div>500</div>
              <div>0</div>
            </div>
          </div>
        </div>
        
        {/* Query Performance Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Query Performance</h3>
            <div className="text-sm text-gray-500">Average response time (ms)</div>
          </div>
          
          <div className="h-64 relative">
            {/* Simple line chart visualization */}
            <div className="h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d={`M0,${200 - (mockMetrics.queryPerformance[0].avgTime / 150) * 200} ${mockMetrics.queryPerformance.map((point, i) => {
                    const x = (i / (mockMetrics.queryPerformance.length - 1)) * 700;
                    const y = 200 - (point.avgTime / 150) * 200;
                    return `L${x},${y}`;
                  }).join(' ')}`}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {mockMetrics.queryPerformance.map((point, i) => {
                  const x = (i / (mockMetrics.queryPerformance.length - 1)) * 700;
                  const y = 200 - (point.avgTime / 150) * 200;
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#3B82F6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
                    />
                  );
                })}
              </svg>
              
              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {mockMetrics.queryPerformance.map((point, i) => (
                  <div key={i}>
                    {new Date(point.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500">
              <div>150ms</div>
              <div>100ms</div>
              <div>50ms</div>
              <div>0ms</div>
            </div>
          </div>
        </div>
        
        {/* Storage Usage */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Storage Usage</h3>
            <div className="text-sm text-gray-500">
              {mockMetrics.storageUsage.used} / {mockMetrics.storageUsage.total} GB
            </div>
          </div>
          
          <div className="mb-2">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${storagePercentage}%` }}
                transition={{ duration: 1 }}
                className={`h-full ${storagePercentage > 80 ? 'bg-red-500' : storagePercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
              ></motion.div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="text-gray-500">Used: {mockMetrics.storageUsage.used} GB</div>
            <div className="text-gray-500">Available: {mockMetrics.storageUsage.available} GB</div>
          </div>
        </div>
        
        {/* System Health */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">System Health</h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              mockMetrics.systemHealth.status === 'healthy' ? 'bg-green-100 text-green-800' :
              mockMetrics.systemHealth.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {mockMetrics.systemHealth.status.toUpperCase()}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm text-gray-600">CPU</div>
                <div className="text-sm font-medium">{mockMetrics.systemHealth.cpu}%</div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mockMetrics.systemHealth.cpu}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${mockMetrics.systemHealth.cpu > 80 ? 'bg-red-500' : mockMetrics.systemHealth.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                ></motion.div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm text-gray-600">Memory</div>
                <div className="text-sm font-medium">{mockMetrics.systemHealth.memory}%</div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mockMetrics.systemHealth.memory}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`h-full ${mockMetrics.systemHealth.memory > 80 ? 'bg-red-500' : mockMetrics.systemHealth.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                ></motion.div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm text-gray-600">Disk I/O</div>
                <div className="text-sm font-medium">{mockMetrics.systemHealth.disk}%</div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mockMetrics.systemHealth.disk}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`h-full ${mockMetrics.systemHealth.disk > 80 ? 'bg-red-500' : mockMetrics.systemHealth.disk > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
