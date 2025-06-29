import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTag, FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

interface Annotation {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  createdBy: string;
  usageCount: number;
}

const AnnotationsPanel: React.FC = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([
    {
      id: '1',
      name: 'Authentication Error',
      description: 'Issues related to user login and authentication failures',
      category: 'Error',
      createdAt: '2025-06-15T10:30:00',
      createdBy: 'Admin',
      usageCount: 24
    },
    {
      id: '2',
      name: 'Database Connection',
      description: 'Problems with connecting to the database',
      category: 'System',
      createdAt: '2025-06-18T14:45:00',
      createdBy: 'Admin',
      usageCount: 18
    },
    {
      id: '3',
      name: 'UI Rendering',
      description: 'Issues with frontend components rendering',
      category: 'Frontend',
      createdAt: '2025-06-20T09:15:00',
      createdBy: 'Developer',
      usageCount: 12
    },
    {
      id: '4',
      name: 'API Timeout',
      description: 'API requests taking too long or timing out',
      category: 'API',
      createdAt: '2025-06-22T16:20:00',
      createdBy: 'Support',
      usageCount: 31
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [annotationName, setAnnotationName] = useState('');
  const [annotationDescription, setAnnotationDescription] = useState('');
  const [annotationCategory, setAnnotationCategory] = useState('Error');

  const handleAddAnnotation = () => {
    if (!annotationName || !annotationDescription) return;
    
    if (editingId) {
      // Update existing annotation
      setAnnotations(annotations.map(annotation => 
        annotation.id === editingId ? {
          ...annotation,
          name: annotationName,
          description: annotationDescription,
          category: annotationCategory
        } : annotation
      ));
      setEditingId(null);
    } else {
      // Add new annotation
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        name: annotationName,
        description: annotationDescription,
        category: annotationCategory,
        createdAt: new Date().toISOString(),
        createdBy: 'Current User',
        usageCount: 0
      };
      
      setAnnotations([...annotations, newAnnotation]);
    }
    
    // Reset form
    setAnnotationName('');
    setAnnotationDescription('');
    setAnnotationCategory('Error');
    setShowForm(false);
  };

  const handleEditAnnotation = (annotation: Annotation) => {
    setAnnotationName(annotation.name);
    setAnnotationDescription(annotation.description);
    setAnnotationCategory(annotation.category);
    setEditingId(annotation.id);
    setShowForm(true);
  };

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(annotation => annotation.id !== id));
  };

  const filteredAnnotations = annotations.filter(annotation => 
    annotation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    annotation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    annotation.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Annotations</h2>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
        >
          <FiPlus className="mr-2" />
          {showForm ? 'Cancel' : 'Add Annotation'}
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200"
        >
          <h3 className="text-lg font-medium mb-4">
            {editingId ? 'Edit Annotation' : 'Add New Annotation'}
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={annotationName}
              onChange={(e) => setAnnotationName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Authentication Error"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={annotationDescription}
              onChange={(e) => setAnnotationDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe the purpose of this annotation"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={annotationCategory}
              onChange={(e) => setAnnotationCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Error">Error</option>
              <option value="System">System</option>
              <option value="Frontend">Frontend</option>
              <option value="API">API</option>
              <option value="Database">Database</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddAnnotation}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingId ? 'Update Annotation' : 'Add Annotation'}
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search annotations..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAnnotations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No annotations found matching your search
                </td>
              </tr>
            ) : (
              filteredAnnotations.map((annotation) => (
                <tr key={annotation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiTag className="text-blue-500 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{annotation.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {annotation.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${annotation.category === 'Error' ? 'bg-red-100 text-red-800' : 
                        annotation.category === 'System' ? 'bg-purple-100 text-purple-800' : 
                        annotation.category === 'Frontend' ? 'bg-blue-100 text-blue-800' : 
                        annotation.category === 'API' ? 'bg-green-100 text-green-800' : 
                        annotation.category === 'Database' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {annotation.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{new Date(annotation.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">by {annotation.createdBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {annotation.usageCount} times
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditAnnotation(annotation)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteAnnotation(annotation.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnnotationsPanel;
