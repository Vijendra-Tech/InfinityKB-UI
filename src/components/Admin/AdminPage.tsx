import React, { useState } from 'react';
import { motion } from 'framer-motion';
import IngestionPanel from './IngestionPanel';
import PeriodicIngestionPanel from './PeriodicIngestionPanel';
import MetricsDashboard from './MetricsDashboard';
import AnnotationsPanel from './AnnotationsPanel';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ingestion' | 'periodic' | 'metrics' | 'annotations'>('ingestion');

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-4">
      {/* Header with Tabs */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
        <div className="flex flex-wrap border-b border-gray-200">
          <motion.button
            whileHover={{ backgroundColor: activeTab === 'ingestion' ? 'rgb(243, 244, 246)' : 'rgb(249, 250, 251)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('ingestion')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'ingestion'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Data Ingestion
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: activeTab === 'periodic' ? 'rgb(243, 244, 246)' : 'rgb(249, 250, 251)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('periodic')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'periodic'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Periodic Ingestion
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: activeTab === 'metrics' ? 'rgb(243, 244, 246)' : 'rgb(249, 250, 251)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'metrics'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Metrics Dashboard
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: activeTab === 'annotations' ? 'rgb(243, 244, 246)' : 'rgb(249, 250, 251)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('annotations')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'annotations'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Annotations
          </motion.button>
        </div>
      </div>

      {/* Content based on active tab */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        {activeTab === 'ingestion' && <IngestionPanel />}
        {activeTab === 'periodic' && <PeriodicIngestionPanel />}
        {activeTab === 'metrics' && <MetricsDashboard />}
        {activeTab === 'annotations' && <AnnotationsPanel />}
      </motion.div>
    </div>
  );
};

export default AdminPage;
