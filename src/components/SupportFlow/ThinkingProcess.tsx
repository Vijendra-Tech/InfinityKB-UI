import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

interface ThinkingProcessProps {
  steps: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}

const ThinkingProcess: React.FC<ThinkingProcessProps> = ({ steps }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <h2 className="text-lg font-medium text-gray-700 mb-4">Thinking...</h2>
      <motion.ul 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {steps.map((step) => (
          <motion.li 
            key={step.id}
            variants={item}
            className="flex items-start"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: step.completed ? 1 : 0.8 }}
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                step.completed ? 'bg-black text-white' : 'border border-gray-300'
              }`}
            >
              {step.completed && <FiCheck size={14} />}
            </motion.div>
            <span className="text-sm text-gray-700">{step.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default ThinkingProcess;
