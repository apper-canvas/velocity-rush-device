import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SpeedMeter from "@/components/molecules/SpeedMeter";
import TimerDisplay from "@/components/molecules/TimerDisplay";
import ProgressBar from "@/components/molecules/ProgressBar";

const HUDOverlay = ({ 
  gameState, 
  onStartRace, 
  onToggleLeaderboard, 
  onToggleSettings,
  onCarSelect,
  loading 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return `${mins}:${secs.padStart(5, '0')}`;
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        {/* Left Panel - Race Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-surface-800/90 backdrop-blur-sm rounded-xl p-4 border border-surface-700"
        >
          <div className="space-y-2">
            <TimerDisplay time={gameState.currentTime} />
            
            <div className="flex items-center gap-4 text-sm">
              <div className="text-surface-300">
                Lap: <span className="text-white font-bold">{gameState.lap}/{gameState.totalLaps}</span>
              </div>
              <div className="text-surface-300">
                Speed: <span className="text-accent font-bold">{Math.round(gameState.speed)}</span>
              </div>
            </div>

            {gameState.raceInProgress && (
              <ProgressBar 
                progress={gameState.lapProgress} 
                className="w-32"
              />
            )}
          </div>
        </motion.div>

        {/* Right Panel - Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <Button
            onClick={onToggleLeaderboard}
            variant="secondary"
            size="sm"
            className="bg-surface-800/90 backdrop-blur-sm"
          >
            <ApperIcon name="Trophy" size={16} />
          </Button>
          
          <Button
            onClick={onToggleSettings}
            variant="secondary"
            size="sm"
            className="bg-surface-800/90 backdrop-blur-sm"
          >
            <ApperIcon name="Settings" size={16} />
          </Button>
        </motion.div>
      </div>

      {/* Bottom Left - Speed Meter */}
      {gameState.currentCar && (
        <div className="absolute bottom-4 left-4 pointer-events-auto">
          <SpeedMeter 
            speed={gameState.speed}
            maxSpeed={gameState.currentCar.maxSpeed}
          />
        </div>
      )}

      {/* Center - Game State Messages */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!gameState.currentCar ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center pointer-events-auto"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 neon-glow">
              Velocity Rush
            </h1>
            <p className="text-surface-300 mb-8 text-lg">Select your car to start racing!</p>
            <Button onClick={onCarSelect} size="lg" loading={loading}>
              <ApperIcon name="Car" size={20} className="mr-2" />
              Choose Car
            </Button>
          </motion.div>
        ) : !gameState.raceInProgress ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pointer-events-auto"
          >
            <div className="bg-surface-800/90 backdrop-blur-sm rounded-2xl p-8 border border-surface-700">
              <h2 className="text-2xl font-bold text-white mb-2">
                {gameState.currentCar.name} Ready
              </h2>
              <p className="text-surface-300 mb-6">Press start to begin racing!</p>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={onCarSelect} variant="secondary">
                  <ApperIcon name="RotateCcw" size={16} className="mr-2" />
                  Change Car
                </Button>
                <Button onClick={onStartRace} size="lg" loading={loading}>
                  <ApperIcon name="Play" size={16} className="mr-2" />
                  Start Race
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>

      {/* Desktop Controls Hint */}
      {gameState.raceInProgress && (
        <div className="absolute bottom-4 right-4 hidden md:block pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-800/90 backdrop-blur-sm rounded-xl p-4 border border-surface-700"
          >
<div className="text-xs text-surface-300 space-y-1">
              <div>↑/W: Accelerate</div>
              <div>↓/S: Brake</div>
              <div>←→/AD: Steer</div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HUDOverlay;