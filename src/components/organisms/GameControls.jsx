import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const GameControls = ({ 
  onAccelerate, 
  onBrake, 
  onTurnLeft, 
  onTurnRight, 
  onRelease 
}) => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex justify-between items-end">
      {/* Left Controls - Steering */}
      <div className="flex gap-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onTouchStart={onTurnLeft}
          onTouchEnd={() => onRelease('left')}
          onMouseDown={onTurnLeft}
          onMouseUp={() => onRelease('left')}
          onMouseLeave={() => onRelease('left')}
          className="w-16 h-16 bg-surface-700 hover:bg-surface-600 rounded-full flex items-center justify-center border-2 border-surface-600 shadow-lg"
        >
          <ApperIcon name="ChevronLeft" size={24} className="text-white" />
        </motion.button>
        
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onTouchStart={onTurnRight}
          onTouchEnd={() => onRelease('right')}
          onMouseDown={onTurnRight}
          onMouseUp={() => onRelease('right')}
          onMouseLeave={() => onRelease('right')}
          className="w-16 h-16 bg-surface-700 hover:bg-surface-600 rounded-full flex items-center justify-center border-2 border-surface-600 shadow-lg"
        >
          <ApperIcon name="ChevronRight" size={24} className="text-white" />
        </motion.button>
      </div>

      {/* Right Controls - Accelerate/Brake */}
      <div className="flex flex-col gap-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onTouchStart={onAccelerate}
          onTouchEnd={() => onRelease('accelerate')}
          onMouseDown={onAccelerate}
          onMouseUp={() => onRelease('accelerate')}
          onMouseLeave={() => onRelease('accelerate')}
          className="w-16 h-16 bg-primary hover:bg-primary/80 rounded-full flex items-center justify-center border-2 border-primary/60 shadow-lg neon-glow"
        >
          <ApperIcon name="ChevronUp" size={24} className="text-white" />
        </motion.button>
        
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onTouchStart={onBrake}
          onTouchEnd={() => onRelease('brake')}
          onMouseDown={onBrake}
          onMouseUp={() => onRelease('brake')}
          onMouseLeave={() => onRelease('brake')}
          className="w-16 h-16 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center border-2 border-red-500 shadow-lg"
        >
          <ApperIcon name="ChevronDown" size={24} className="text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default GameControls;