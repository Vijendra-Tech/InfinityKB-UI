import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiEdit2, FiTrash2, FiPlay, FiPause } from 'react-icons/fi';

interface ScheduledIngestion {
  id: string;
  name: string;
  sourceType: 'api' | 'database';
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  lastRun?: string;
  nextRun?: string;
  status: 'active' | 'paused' | 'error';
  recordsProcessed?: number;
}

const PeriodicIngestionPanel: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduledIngestion[]>([
    {
      id: '1',
      name: 'Salesforce Tickets Sync',
      sourceType: 'api',
      frequency: 'hourly',
      lastRun: '2025-06-29T10:00:00',
      nextRun: '2025-06-29T11:00:00',
      status: 'active',
      recordsProcessed: 124
    },
    {
      id: '2',
      name: 'Knowledge Base Update',
      sourceType: 'database',
      frequency: 'daily',
      lastRun: '2025-06-28T00:00:00',
      nextRun: '2025-06-29T00:00:00',
      status: 'active',
      recordsProcessed: 45
    },
    {
      id: '3',
      name: 'Customer Feedback Import',
      sourceType: 'api',
      frequency: 'weekly',
      lastRun: '2025-06-22T12:00:00',
      nextRun: '2025-06-29T12:00:00',
      status: 'paused',
      recordsProcessed: 230
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [scheduleName, setScheduleName] = useState('');
  const [sourceType, setSourceType] = useState<'api' | 'database'>('api');
  const [frequency, setFrequency] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('daily');
  const [sourceDetails, setSourceDetails] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddSchedule = () => {
    if (!scheduleName) return;
    
    if (editingId) {
      // Update existing schedule
      setSchedules(schedules.map(schedule => 
        schedule.id === editingId ? {
          ...schedule,
          name: scheduleName,
          sourceType,
          frequency
        } : schedule
      ));
      setEditingId(null);
    } else {
      // Add new schedule
      const now = new Date();
      let nextRun = new Date();
      
      switch (frequency) {
        case 'hourly':
          nextRun.setHours(nextRun.getHours() + 1);
          break;
        case 'daily':
          nextRun.setDate(nextRun.getDate() + 1);
          break;
        case 'weekly':
          nextRun.setDate(nextRun.getDate() + 7);
          break;
        case 'monthly':
          nextRun.setMonth(nextRun.getMonth() + 1);
          break;
      }
      
      const newSchedule: ScheduledIngestion = {
        id: Date.now().toString(),
        name: scheduleName,
        sourceType,
        frequency,
        nextRun: nextRun.toISOString(),
        status: 'active'
      };
      
      setSchedules([...schedules, newSchedule]);
    }
    
    // Reset form
    setScheduleName('');
    setSourceType('api');
    setFrequency('daily');
    setSourceDetails('');
    setShowAddForm(false);
  };

  const handleEditSchedule = (schedule: ScheduledIngestion) => {
    setScheduleName(schedule.name);
    setSourceType(schedule.sourceType);
    setFrequency(schedule.frequency);
    setEditingId(schedule.id);
    setShowAddForm(true);
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id ? {
        ...schedule,
        status: schedule.status === 'active' ? 'paused' : 'active'
      } : schedule
    ));
  };

  const formatNextRun = (nextRun?: string) => {
    if (!nextRun) return 'Not scheduled';
    
    const date = new Date(nextRun);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `In ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
    } else if (diffMins < 1440) { // less than a day
      const hours = Math.floor(diffMins / 60);
      return `In ${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      return date.toLocaleString();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Periodic Ingestion</h2>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
        >
          <FiClock className="mr-2" />
          {showAddForm ? 'Cancel' : editingId ? 'Edit Schedule' : 'Add Schedule'}
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200"
        >
          <h3 className="text-lg font-medium mb-4">
            {editingId ? 'Edit Scheduled Ingestion' : 'Add New Scheduled Ingestion'}
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Name</label>
            <input
              type="text"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Daily Ticket Sync"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as 'api' | 'database')}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="api">API Endpoint</option>
              <option value="database">Database Connection</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {sourceType === 'api' ? 'API Endpoint' : 'Connection String'}
            </label>
            <input
              type="text"
              value={sourceDetails}
              onChange={(e) => setSourceDetails(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={sourceType === 'api' ? 'https://api.example.com/data' : 'postgresql://user:password@localhost:5432/db'}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'hourly' | 'daily' | 'weekly' | 'monthly')}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddSchedule}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingId ? 'Update Schedule' : 'Add Schedule'}
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{schedule.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {schedule.sourceType === 'api' ? 'API Endpoint' : 'Database'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {schedule.lastRun ? new Date(schedule.lastRun).toLocaleString() : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatNextRun(schedule.nextRun)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${schedule.status === 'active' ? 'bg-green-100 text-green-800' : 
                      schedule.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleToggleStatus(schedule.id)}
                      className="text-gray-600 hover:text-gray-900"
                      title={schedule.status === 'active' ? 'Pause' : 'Activate'}
                    >
                      {schedule.status === 'active' ? <FiPause /> : <FiPlay />}
                    </button>
                    <button
                      onClick={() => handleEditSchedule(schedule)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PeriodicIngestionPanel;
