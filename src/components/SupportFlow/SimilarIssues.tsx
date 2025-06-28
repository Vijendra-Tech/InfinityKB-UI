import React from 'react';
import { motion } from 'framer-motion';

export interface Issue {
  id: string;
  title: string;
  reportedBy: string;
  daysAgo: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Open' | 'Resolved';
  similarity: number;
}

interface SimilarIssuesProps {
  issues: Issue[];
  onSelectIssue: (issue: Issue) => void;
  selectedIssue?: Issue;
}

const SimilarIssues: React.FC<SimilarIssuesProps> = ({ issues, onSelectIssue, selectedIssue }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-gray-100 text-gray-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Similar Issues</h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {issues.map((issue) => (
          <motion.div
            key={issue.id}
            variants={item}
            onClick={() => onSelectIssue(issue)}
            className={`p-4 border rounded-md cursor-pointer transition-all ${
              selectedIssue?.id === issue.id ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <h3 className="font-medium text-gray-800">{issue.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Reported {issue.daysAgo} days ago by user{issue.reportedBy}
            </p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(issue.priority)}`}>
                  {issue.priority} Priority
                </span>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(issue.status)}`}>
                  {issue.status}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                Similarity: {issue.similarity}%
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SimilarIssues;
