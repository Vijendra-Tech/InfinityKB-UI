import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThinkingProcess from './ThinkingProcess';
import SearchHistory from './SearchHistory';
import SimilarIssues from './SimilarIssues';
import type { Issue } from './SimilarIssues';
import ActionButtons from './ActionButtons';
import TicketInput from './TicketInput';

// Mock data for the UI
const thinkingSteps = [
  { id: '1', text: 'Searching on past history data', completed: true },
  { id: '2', text: 'Link and closure of Duplicate issues', completed: true },
  { id: '3', text: 'Identify the possible solution from history', completed: true },
  { id: '4', text: 'Identify the non code solutions (Config/Settings) - Suggestions to L2 org', completed: true },
];

const mockIssues = [
  {
    id: '1',
    title: 'Authentication fails after password reset',
    reportedBy: '1234',
    daysAgo: 3,
    priority: 'High' as const,
    status: 'In Progress' as const,
    similarity: 92,
  },
  {
    id: '2',
    title: 'Login screen crashes on mobile devices',
    reportedBy: '5678',
    daysAgo: 7,
    priority: 'Medium' as const,
    status: 'Open' as const,
    similarity: 78,
  },
  {
    id: '3',
    title: 'Password reset email not being sent',
    reportedBy: '9012',
    daysAgo: 14,
    priority: 'High' as const,
    status: 'Resolved' as const,
    similarity: 65,
  },
];

const SupportFlowUI: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleFilterSearch = (filters: any) => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleSelectIssue = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleCreateTicket = () => {
    console.log('Create ticket clicked');
  };

  const handleSolveIssue = () => {
    console.log('Solve issue clicked');
  };

  const handleMoreOptions = () => {
    console.log('More options clicked');
  };

  const handleTicketSubmit = (ticketId: string) => {
    console.log('Ticket submitted:', ticketId);
  };

  const handleSelectSimilarIssue = () => {
    console.log('Select similar issue clicked');
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left Column */}
        <div className="col-span-1">
          <div className="mb-6">
             AI Agents
          </div>
          
          <div className="mb-6">
            <ThinkingProcess steps={thinkingSteps} />
          </div>
          
          <div className="mb-6">
            <ActionButtons 
              onCreateTicket={handleCreateTicket}
              onSolveIssue={handleSolveIssue}
              onMoreOptions={handleMoreOptions}
            />
          </div>
          
          <div>
            <TicketInput onSubmit={handleTicketSubmit} />
          </div>
        </div>
        
        {/* Middle Column */}
        <div className="col-span-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SearchHistory onSearch={handleFilterSearch} />
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Result:</h3>
              <AnimatePresence>
                {isSearching ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center items-center h-40"
                  >
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                      {selectedIssue ? (
                        <div>
                          <h3 className="font-medium text-gray-800">{selectedIssue.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Reported {selectedIssue.daysAgo} days ago by user{selectedIssue.reportedBy}
                          </p>
                          <div className="mt-4">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={handleSelectSimilarIssue}
                              className="w-full py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors text-black"
                            >
                              Select Similar Issue
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-black py-8">
                          Select an issue to view details
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        {/* Right Column */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <SimilarIssues 
              issues={mockIssues} 
              onSelectIssue={handleSelectIssue}
              selectedIssue={selectedIssue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportFlowUI;
