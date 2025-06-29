import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TeamIcon, KnowledgeIcon, CheckIcon, InfoIcon, ArrowDownIcon } from './Icons';
import { SupportFlowUI } from './SupportFlow/index';
import DesignDrafts from './SupportFlow/DesignDrafts';
import { AdminPage } from './Admin';

const SupportFlow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'flow' | 'design' | 'admin'>('design');

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-4">
      {/* Header with Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-gray-200">
        <motion.button
            whileHover={{ backgroundColor: activeTab === 'design' ? 'rgb(243, 244, 246)' : 'rgb(249, 250, 251)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('design')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'design'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Design Draft
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: activeTab === 'flow' ? 'rgb(243, 244, 246)' : 'rgb(249, 250, 251)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('flow')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'flow'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            L2 Support Flow
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: activeTab === 'search' ? 'rgb(243, 244, 246)' : 'rgb(249, 250, 251)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'search'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Search & Similar Issues
          </motion.button>
          
          <motion.button
            whileHover={{ backgroundColor: activeTab === 'admin' ? 'rgb(243, 244, 246)' : 'rgb(249, 250, 251)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'admin'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Admin
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
      >
        {activeTab === 'search' ? (
          <div className="flex">
            <SupportFlowUI />
          </div>
        ) : activeTab === 'design' ? (
          <div className="w-full  mx-auto bg-gray-50 rounded-lg overflow-hidden p-6">
            <DesignDrafts />
          </div>
        ) : activeTab === 'admin' ? (
          <AdminPage />
        ) : (
          <div className="relative">
            {/* Top Red Dashed Line */}
            <div className="absolute top-0 left-0 right-0 border-t-2 border-dashed border-red-300"></div>

            {/* Flow Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* L1/Customer Ticket Logging */}
              <div className="col-span-1">
                <div className="bg-green-100 border border-green-200 p-4 rounded-md  mb-6">
                  <h2 className="font-semibold text-green-800">L2 Support flow</h2>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md  flex flex-col">
                  <h2 className="font-semibold text-blue-800 mb-2">L1/customer Ticket logging in Salesforce</h2>
                </div>

                {/* Benefits Box */}
                <div className="mt-8 border-2 border-dashed border-yellow-400 p-4 rounded-lg bg-yellow-50">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span className="text-sm">Quicker resolution time for common issues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span className="text-sm">Backlog ticket reduction with history analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span className="text-sm">Removal of duplicate issues and rapid closure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span className="text-sm">Ticket trend analysis</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Middle Flow */}
              <div className="col-span-1 flex flex-col space-y-6">
                {/* AI Agent Box */}
                <div className="bg-indigo-800 text-white p-4 rounded-md ">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <h3 className="font-semibold">AI Agent Acknowledges and Route the ticket</h3>
                  </div>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Online similarity search on past history data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Link and closure of Duplicate issues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Identify the possible solution from history</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Identify the non code solutions (Config/Settings) - Suggestions to L2 org</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex justify-center">
                    <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">AI Agents</div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <ArrowDownIcon className="w-8 h-8 text-gray-400" />
                </div>

                {/* Automated Jira Ticket Creation */}
                <div className="bg-indigo-800 text-white p-4 rounded-md ">
                  <h3 className="font-semibold mb-2">Automated Jira ticket creation with AI And assign to E3 team</h3>
                  <div className="flex justify-center mt-2">
                    <TeamIcon className="w-10 h-10 text-blue-600" />
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <ArrowDownIcon className="w-8 h-8 text-gray-400" />
                </div>

                {/* Update the client */}
                <div className="bg-gray-100 border border-gray-200 p-4 rounded-md flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full p-2 mb-2">
                    <InfoIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Update the client</h3>
                </div>
              </div>

              {/* Right Flow */}
              <div className="col-span-1 flex flex-col space-y-6">
                {/* Issue Resolution Box */}
                <div className="bg-gray-100 border border-gray-200 p-4 rounded-md ">
                  <h3 className="font-semibold text-gray-800 mb-2">Issue resolution with AI provided knowledge</h3>
                  <div className="flex justify-center mt-4">
                    <KnowledgeIcon className="w-10 h-10 text-blue-600" />
                  </div>
                </div>

                {/* Not Fixed Label */}
                <div className="flex justify-center">
                  <div className="bg-red-100 text-red-800 px-4 py-1 rounded-md">Not fixed</div>
                </div>

                {/* Generate Summary Box */}
                <div className="bg-indigo-800 text-white p-4 rounded-md mt-auto">
                  <h3 className="font-semibold mb-2">Generate Summary with AI and Update SF with resolution</h3>
                  <div className="flex justify-center mt-2">
                    <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Fixed</div>
                  </div>
                </div>

                {/* Arrow Left */}
                <div className="flex justify-start">
                  <ArrowDownIcon className="w-8 h-8 text-gray-400 transform -rotate-90" />
                </div>

                {/* Close the ticket */}
                <div className="bg-gray-100 border border-gray-200 p-4 rounded-md ">
                  <div className="bg-blue-100 rounded-full p-2 mb-2 mx-auto w-fit">
                    <CheckIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-center">Close the ticket</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SupportFlow;
