import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CarCard = ({ car, selected, onClick }) => {
  const cardVariants = {
    hover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`relative bg-surface-700 rounded-xl p-4 cursor-pointer transition-all border-2 ${
        selected 
          ? 'border-primary shadow-lg shadow-primary/20 neon-glow' 
          : 'border-surface-600 hover:border-surface-500'
      }`}
    >
      {/* Selected Badge */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-primary rounded-full p-2 border-2 border-surface-800"
        >
          <ApperIcon name="Check" size={16} className="text-white" />
        </motion.div>
      )}

      {/* Car Preview */}
      <div className="h-20 flex items-center justify-center mb-4 bg-surface-800 rounded-lg">
        <div 
          className="w-16 h-10 rounded-lg border-2 border-white/20"
          style={{ backgroundColor: car.color }}
        />
      </div>

      {/* Car Info */}
      <div className="text-center mb-4">
        <h3 className="font-bold text-white mb-1">{car.name}</h3>
        <p className="text-sm text-surface-400">{car.description}</p>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-surface-400">Speed</span>
          <div className="flex-1 mx-2 bg-surface-600 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${car.maxSpeed}%` }}
            />
          </div>
          <span className="text-xs text-white font-medium">{car.maxSpeed}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-surface-400">Accel</span>
          <div className="flex-1 mx-2 bg-surface-600 rounded-full h-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all"
              style={{ width: `${car.acceleration}%` }}
            />
          </div>
          <span className="text-xs text-white font-medium">{car.acceleration}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-surface-400">Handle</span>
          <div className="flex-1 mx-2 bg-surface-600 rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all"
              style={{ width: `${car.handling}%` }}
            />
          </div>
          <span className="text-xs text-white font-medium">{car.handling}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;