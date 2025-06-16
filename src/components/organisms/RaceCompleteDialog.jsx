import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const RaceCompleteDialog = ({ finalTime, onRestart, onChangeCar, onClose }) => {
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return `${mins}:${secs.padStart(5, '0')}`;
  };

  const celebrationVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <>
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-black/80 z-40"
        onClick={onClose}
      />
      
      <motion.div
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-surface-800 rounded-2xl shadow-2xl max-w-md w-full border border-surface-700">
          {/* Header */}
          <div className="text-center p-8 border-b border-surface-700">
            <motion.div variants={celebrationVariants} className="mb-4">
              <ApperIcon name="Trophy" size={64} className="text-yellow-400 mx-auto neon-glow" />
            </motion.div>
            
            <h2 className="text-3xl font-display font-bold text-white mb-2 neon-glow">
              Race Complete!
            </h2>
            <p className="text-surface-400">Congratulations on finishing the race</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-primary mb-2 neon-glow">
                {formatTime(finalTime)}
              </div>
              <div className="text-surface-400">Final Time</div>
            </div>

            {/* Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface-700 rounded-xl p-4 mb-6 text-center border border-surface-600"
            >
              <ApperIcon name="Zap" size={24} className="text-accent mx-auto mb-2" />
              <div className="text-white font-medium">Race Completed!</div>
              <div className="text-sm text-surface-400">Time saved to leaderboard</div>
            </motion.div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={onRestart}
                className="w-full"
                size="lg"
              >
                <ApperIcon name="RotateCcw" size={16} className="mr-2" />
                Race Again
              </Button>
              
              <Button
                onClick={onChangeCar}
                variant="secondary"
                className="w-full"
              >
                <ApperIcon name="Car" size={16} className="mr-2" />
                Choose Different Car
              </Button>
              
              <Button
                onClick={onClose}
                variant="ghost"
                className="w-full"
              >
                View Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RaceCompleteDialog;