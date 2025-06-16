import React from 'react';
import { motion } from 'framer-motion';

const Toggle = ({ checked, onChange, disabled = false }) => {
  const switchVariants = {
    checked: { x: 20 },
    unchecked: { x: 0 }
  };

  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-900 ${
        checked ? 'bg-primary' : 'bg-surface-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <motion.span
        variants={switchVariants}
        animate={checked ? 'checked' : 'unchecked'}
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
      />
    </button>
  );
};

export default Toggle;