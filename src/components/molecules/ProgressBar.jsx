import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, className = '' }) => {
  return (
    <div className={`bg-surface-600 rounded-full h-2 overflow-hidden ${className}`}>
      <motion.div
        className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(progress, 100)}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default ProgressBar;