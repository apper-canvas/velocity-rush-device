import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const SpeedMeter = ({ speed, maxSpeed }) => {
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  const angle = (percentage / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <div className="bg-surface-800/90 backdrop-blur-sm rounded-xl p-4 border border-surface-700">
      <div className="w-24 h-12 relative mb-2">
        {/* Speed meter arc */}
        <svg className="w-full h-full" viewBox="0 0 100 50">
          {/* Background arc */}
          <path
            d="M 10 40 A 30 30 0 0 1 90 40"
            fill="none"
            stroke="#4a5568"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Speed arc */}
          <motion.path
            d="M 10 40 A 30 30 0 0 1 90 40"
            fill="none"
            stroke="#FF1744"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="94.2" // Circumference of semicircle
            strokeDashoffset={94.2 - (94.2 * percentage / 100)}
            className="neon-glow"
            initial={{ strokeDashoffset: 94.2 }}
            animate={{ strokeDashoffset: 94.2 - (94.2 * percentage / 100) }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Needle */}
          <motion.line
            x1="50"
            y1="40"
            x2="50"
            y2="15"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ rotate: -90 }}
            animate={{ rotate: angle }}
            style={{ transformOrigin: '50px 40px' }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Center dot */}
          <circle cx="50" cy="40" r="3" fill="white" />
        </svg>
      </div>
      
      <div className="text-center">
        <div className="text-xl font-bold text-white">
          {Math.round(speed)}
        </div>
        <div className="text-xs text-surface-400 flex items-center justify-center gap-1">
          <ApperIcon name="Gauge" size={10} />
          MPH
        </div>
      </div>
    </div>
  );
};

export default SpeedMeter;