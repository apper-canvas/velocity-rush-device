import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const LeaderboardPanel = ({ leaderboard, onClose }) => {
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const panelVariants = {
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 300 }
  };

  const itemVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return `${mins}:${secs.padStart(5, '0')}`;
  };

  const getRankIcon = (position) => {
    switch (position) {
      case 1: return { icon: 'Trophy', color: 'text-yellow-400' };
      case 2: return { icon: 'Award', color: 'text-gray-400' };
      case 3: return { icon: 'Medal', color: 'text-orange-400' };
      default: return { icon: 'Hash', color: 'text-surface-400' };
    }
  };

  return (
    <>
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      <motion.div
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-800 shadow-2xl z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-700">
          <div>
            <h2 className="text-2xl font-display font-bold text-white neon-glow">
              Leaderboard
            </h2>
            <p className="text-surface-400 mt-1">Best Race Times</p>
          </div>
          <button
            onClick={onClose}
            className="text-surface-400 hover:text-white transition-colors"
          >
            <ApperIcon name="X" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-full pb-20">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <ApperIcon name="Trophy" size={48} className="text-surface-400 mx-auto mb-4" />
              <p className="text-white mb-2">No times recorded yet</p>
              <p className="text-surface-400 text-sm">Complete a race to appear on the leaderboard!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((result, index) => {
                const position = index + 1;
                const rankInfo = getRankIcon(position);
                
                return (
                  <motion.div
                    key={result.Id}
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.1 }}
                    className="bg-surface-700 rounded-xl p-4 border border-surface-600 hover:border-surface-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`${rankInfo.color}`}>
                          <ApperIcon name={rankInfo.icon} size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {result.playerName}
                          </div>
                          <div className="text-xs text-surface-400">
                            {format(new Date(result.date), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">
                          {formatTime(result.time)}
                        </div>
                        <div className="text-xs text-surface-400">
                          #{position}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-surface-800 border-t border-surface-700">
          <Button
            onClick={onClose}
            variant="secondary"
            className="w-full"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default LeaderboardPanel;