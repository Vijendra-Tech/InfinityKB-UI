import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

interface TicketInputProps {
  onSubmit: (ticketId: string) => void;
}

const TicketInput: React.FC<TicketInputProps> = ({ onSubmit }) => {
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketId.trim()) {
      onSubmit(ticketId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="Enter your Ticket URL/TicketNumber"
          className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 rounded-full p-1 text-gray-500 hover:text-blue-500 hover:bg-gray-200"
        >
          <FiArrowRight size={18} />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TicketInput;
