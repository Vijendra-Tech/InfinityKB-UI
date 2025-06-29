import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiDatabase, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface IngestionSource {
  id: string;
  name: string;
  type: 'file' | 'api' | 'database';
  status: 'ready' | 'processing' | 'completed' | 'error';
  lastIngested?: string;
  recordCount?: number;
}

const IngestionPanel: React.FC = () => {
  const [sources, setSources] = useState<IngestionSource[]>([
    { 
      id: '1', 
      name: 'Customer Support Tickets', 
      type: 'api', 
      status: 'completed',
      lastIngested: '2025-06-28T15:30:00',
      recordCount: 1254
    },
    { 
      id: '2', 
      name: 'Knowledge Base Articles', 
      type: 'database', 
      status: 'ready',
      lastIngested: '2025-06-25T09:15:00',
      recordCount: 342
    },
    { 
      id: '3', 
      name: 'Internal Documentation', 
      type: 'file', 
      status: 'processing'
    }
  ]);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ingestionName, setIngestionName] = useState('');
  const [ingestionType, setIngestionType] = useState<'file' | 'api' | 'database'>('file');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [dbConnection, setDbConnection] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddSource = () => {
    if (!ingestionName) return;
    
    const newSource: IngestionSource = {
      id: Date.now().toString(),
      name: ingestionName,
      type: ingestionType,
      status: 'ready'
    };
    
    setSources([...sources, newSource]);
    setIngestionName('');
    setApiEndpoint('');
    setDbConnection('');
    setSelectedFile(null);
    setShowAddForm(false);
  };

  const handleStartIngestion = (id: string) => {
    setSources(sources.map(source => 
      source.id === id ? { ...source, status: 'processing' } : source
    ));
    
    // Simulate ingestion completion after 2 seconds
    setTimeout(() => {
      setSources(sources.map(source => 
        source.id === id ? { 
          ...source, 
          status: 'completed',
          lastIngested: new Date().toISOString(),
          recordCount: Math.floor(Math.random() * 1000) + 100
        } : source
      ));
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'ready':
        return <FiDatabase className="text-blue-500" />;
      case 'processing':
        return <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>;
      case 'completed':
        return <FiCheck className="text-green-500" />;
      case 'error':
        return <FiAlertCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Data Ingestion</h2>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
        >
          <FiUpload className="mr-2" />
          {showAddForm ? 'Cancel' : 'Add New Source'}
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200"
        >
          <h3 className="text-lg font-medium mb-4">Add New Ingestion Source</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Source Name</label>
            <input
              type="text"
              value={ingestionName}
              onChange={(e) => setIngestionName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Customer Support Data"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
            <select
              value={ingestionType}
              onChange={(e) => setIngestionType(e.target.value as 'file' | 'api' | 'database')}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="file">File Upload</option>
              <option value="api">API Endpoint</option>
              <option value="database">Database Connection</option>
            </select>
          </div>
          
          {ingestionType === 'file' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">Selected: {selectedFile.name}</p>
              )}
            </div>
          )}
          
          {ingestionType === 'api' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">API Endpoint</label>
              <input
                type="text"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://api.example.com/data"
              />
            </div>
          )}
          
          {ingestionType === 'database' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Connection String</label>
              <input
                type="text"
                value={dbConnection}
                onChange={(e) => setDbConnection(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="postgresql://user:password@localhost:5432/db"
              />
            </div>
          )}
          
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddSource}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Source
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Ingested</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Count</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sources.map((source) => (
              <tr key={source.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{source.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {source.type === 'file' ? 'File Upload' : 
                     source.type === 'api' ? 'API Endpoint' : 'Database'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">{getStatusIcon(source.status)}</span>
                    <span className="text-sm text-gray-500">
                      {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {source.lastIngested ? new Date(source.lastIngested).toLocaleString() : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {source.recordCount || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {source.status === 'ready' && (
                    <button
                      onClick={() => handleStartIngestion(source.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Start Ingestion
                    </button>
                  )}
                  {source.status === 'completed' && (
                    <button
                      onClick={() => handleStartIngestion(source.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Re-ingest
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngestionPanel;
