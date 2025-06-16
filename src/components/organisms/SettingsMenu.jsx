import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Toggle from '@/components/atoms/Toggle';

const SettingsMenu = ({ settings, onUpdate, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  const handleToggle = (key) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    onUpdate(localSettings);
    onClose();
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
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-surface-800 rounded-2xl shadow-2xl max-w-md w-full border border-surface-700">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-surface-700">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                Settings
              </h2>
              <p className="text-surface-400 mt-1">Game preferences</p>
            </div>
            <button
              onClick={onClose}
              className="text-surface-400 hover:text-white transition-colors"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Audio Settings */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Audio</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Volume2" size={20} className="text-surface-400" />
                    <div>
                      <div className="text-white font-medium">Sound Effects</div>
                      <div className="text-sm text-surface-400">Engine sounds and effects</div>
                    </div>
                  </div>
                  <Toggle
                    checked={localSettings.audioEnabled}
                    onChange={() => handleToggle('audioEnabled')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Music" size={20} className="text-surface-400" />
                    <div>
                      <div className="text-white font-medium">Background Music</div>
                      <div className="text-sm text-surface-400">Racing soundtrack</div>
                    </div>
                  </div>
                  <Toggle
                    checked={localSettings.musicEnabled}
                    onChange={() => handleToggle('musicEnabled')}
                  />
                </div>
              </div>
            </div>

            {/* Controls Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Controls</h3>
              <div className="bg-surface-700 rounded-xl p-4 border border-surface-600">
                <div className="space-y-2 text-sm">
                  <div className="text-surface-300">
                    <span className="font-medium">Desktop:</span> Arrow keys or WASD
                  </div>
                  <div className="text-surface-300">
                    <span className="font-medium">Mobile:</span> Touch controls
                  </div>
                  <div className="text-surface-300">
                    <span className="font-medium">Accelerate:</span> ↑ or W
                  </div>
                  <div className="text-surface-300">
                    <span className="font-medium">Brake:</span> ↓ or S
                  </div>
                  <div className="text-surface-300">
                    <span className="font-medium">Steer:</span> ← → or A D
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-surface-700">
            <Button
              onClick={onClose}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SettingsMenu;