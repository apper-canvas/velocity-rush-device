import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import CarCard from '@/components/molecules/CarCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import { carService } from '@/services';

const CarSelectionModal = ({ onSelect, onClose, loading }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loadingCars, setLoadingCars] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    setLoadingCars(true);
    setError(null);
    try {
      const result = await carService.getAll();
      setCars(result);
      if (result.length > 0) {
        setSelectedCar(result[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load cars');
      toast.error('Failed to load cars');
    } finally {
      setLoadingCars(false);
    }
  };

  const handleSelect = () => {
    if (selectedCar && onSelect) {
      onSelect(selectedCar);
    }
  };

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

  const staggerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
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
        <div className="bg-surface-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-surface-700">
            <div>
              <h2 className="text-2xl font-display font-bold text-white neon-glow">
                Select Your Car
              </h2>
              <p className="text-surface-400 mt-1">Choose your racing machine</p>
            </div>
            <button
              onClick={onClose}
              className="text-surface-400 hover:text-white transition-colors"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {loadingCars ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <SkeletonLoader key={i} height="200px" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
                <p className="text-white mb-4">{error}</p>
                <Button onClick={loadCars} variant="secondary">
                  Try Again
                </Button>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-12">
                <ApperIcon name="Car" size={48} className="text-surface-400 mx-auto mb-4" />
                <p className="text-white">No cars available</p>
              </div>
            ) : (
              <motion.div
                variants={staggerVariants}
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
              >
                {cars.map((car) => (
                  <motion.div key={car.Id} variants={itemVariants}>
                    <CarCard
                      car={car}
                      selected={selectedCar?.Id === car.Id}
                      onClick={() => setSelectedCar(car)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Selected Car Details */}
            {selectedCar && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-700 rounded-xl p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {selectedCar.name}
                </h3>
                <p className="text-surface-300 mb-4">{selectedCar.description}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {selectedCar.maxSpeed}
                    </div>
                    <div className="text-sm text-surface-400">Max Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">
                      {selectedCar.acceleration}
                    </div>
                    <div className="text-sm text-surface-400">Acceleration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">
                      {selectedCar.handling}
                    </div>
                    <div className="text-sm text-surface-400">Handling</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-surface-700">
            <Button
              onClick={onClose}
              variant="secondary"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSelect}
              disabled={!selectedCar || loading}
              loading={loading}
            >
              <ApperIcon name="Play" size={16} className="mr-2" />
              Start Racing
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CarSelectionModal;