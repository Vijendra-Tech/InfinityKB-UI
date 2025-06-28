import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiCheckCircle, FiMoreHorizontal } from 'react-icons/fi';

interface ActionButtonsProps {
  onCreateTicket: () => void;
  onSolveIssue: () => void;
  onMoreOptions: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onCreateTicket, 
  onSolveIssue, 
  onMoreOptions 
}) => {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCreateTicket}
        className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <FiPlus className="mr-2" />
        <span>Create Ticket</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onSolveIssue}
        className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <FiCheckCircle className="mr-2" />
        <span>Solve Issue</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onMoreOptions}
        className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <span className="mr-2">Some more options</span>
        <FiMoreHorizontal />
      </motion.button>
    </div>
  );
};

export default ActionButtons;
