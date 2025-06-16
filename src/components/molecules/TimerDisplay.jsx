import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const TimerDisplay = ({ time }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return `${mins}:${secs.padStart(5, '0')}`;
  };

  return (
    <div className="flex items-center gap-2">
      <ApperIcon name="Timer" size={16} className="text-accent" />
      <motion.div
        key={Math.floor(time)}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        className="text-xl font-mono font-bold text-white"
      >
        {formatTime(time)}
      </motion.div>
    </div>
  );
};

export default TimerDisplay;