import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

interface SearchHistoryProps {
  onSearch: (filters: any) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onSearch }) => {
  const [keywords, setKeywords] = useState('');
  const [timeRange, setTimeRange] = useState('last24hours');
  const [status, setStatus] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keywords, timeRange, status });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg p-5 shadow-sm border border-gray-200"
    >
      <h2 className="text-lg font-medium text-gray-800 mb-4">Search History</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
            Keywords:
          </label>
          <div className="relative">
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Search keywords"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
            Time Range:
          </label>
          <div className="relative">
            <select
              id="timeRange"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="last24hours">Last 24 hours</option>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last3months">Last 3 months</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FiChevronDown className="text-gray-500" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status:
          </label>
          <div className="relative">
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="inProgress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FiChevronDown className="text-gray-500" />
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <div className="flex items-center justify-center text-black">
            <FiSearch className="mr-2" />
            Search
          </div>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchHistory;
