import React from 'react';

const SkeletonLoader = ({ height = '100px', className = '', count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gradient-to-r from-surface-700 via-surface-600 to-surface-700 rounded-lg ${className}`}
          style={{ height }}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;