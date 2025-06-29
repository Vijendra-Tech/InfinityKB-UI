import React from 'react';

// Mock data for L2 Support Flow table
const l2SupportData = [
  {
    id: 'L2-001',
    issue: 'Database connection timeout',
    assignedTo: 'John Doe',
    priority: 'Critical',
    status: 'In Progress',
    escalatedFrom: 'L1-234'
  },
  {
    id: 'L2-002',
    issue: 'API authentication failure',
    assignedTo: 'Jane Smith',
    priority: 'High',
    status: 'Open',
    escalatedFrom: 'L1-187'
  },
  {
    id: 'L2-003',
    issue: 'Data synchronization error',
    assignedTo: 'Mike Johnson',
    priority: 'Medium',
    status: 'Resolved',
    escalatedFrom: 'L1-156'
  },
  {
    id: 'L2-004',
    issue: 'Performance degradation in query execution',
    assignedTo: 'Sarah Williams',
    priority: 'High',
    status: 'In Progress',
    escalatedFrom: 'L1-201'
  },
  {
    id: 'L2-005',
    issue: 'Backup restoration failure',
    assignedTo: 'Alex Turner',
    priority: 'Critical',
    status: 'Open',
    escalatedFrom: 'L1-245'
  }
];

const L2SupportFlow: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200">
      <h3 className="text-lg font-medium mb-4">L2 Support Flow</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Escalated From
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {l2SupportData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.issue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${item.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                      item.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {item.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${item.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                      item.status === 'In Progress' ? 'bg-purple-100 text-purple-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.escalatedFrom}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default L2SupportFlow;
