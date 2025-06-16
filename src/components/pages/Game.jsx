import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import CarSelectionModal from '@/components/organisms/CarSelectionModal';
import RacingCanvas from '@/components/organisms/RacingCanvas';
import HUDOverlay from '@/components/organisms/HUDOverlay';
import GameControls from '@/components/organisms/GameControls';
import LeaderboardPanel from '@/components/organisms/LeaderboardPanel';
import RaceCompleteDialog from '@/components/organisms/RaceCompleteDialog';
import SettingsMenu from '@/components/organisms/SettingsMenu';
import { carService, raceResultService, gameStateService } from '@/services';

const Game = () => {
  const [gameState, setGameState] = useState({
    currentCar: null,
    raceInProgress: false,
    currentTime: 0,
    lapProgress: 0,
    position: { x: 400, y: 500, angle: 0 },
    speed: 0,
    lap: 1,
    totalLaps: 3,
    checkpoints: [],
    audioEnabled: true,
    musicEnabled: true
  });

  const [showCarSelection, setShowCarSelection] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRaceComplete, setShowRaceComplete] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const gameLoopRef = useRef(null);
  const keysRef = useRef({});

  // Load leaderboard on mount
  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const results = await raceResultService.getLeaderboard(5);
      setLeaderboard(results);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
  };

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysRef.current[e.code] = true;
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameState.raceInProgress) return;

    const gameLoop = () => {
      updateGameLogic();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.raceInProgress]);

  const updateGameLogic = useCallback(() => {
    if (!gameState.currentCar || !gameState.raceInProgress) return;

    const keys = keysRef.current;
    let newPosition = { ...gameState.position };
    let newSpeed = gameState.speed;

    // Handle input
    const isAccelerating = keys['ArrowUp'] || keys['KeyW'];
    const isBraking = keys['ArrowDown'] || keys['KeyS'];
    const isTurningLeft = keys['ArrowLeft'] || keys['KeyA'];
    const isTurningRight = keys['ArrowRight'] || keys['KeyD'];

    // Update speed
    if (isAccelerating) {
      newSpeed = Math.min(newSpeed + gameState.currentCar.acceleration * 0.1, gameState.currentCar.maxSpeed);
    } else if (isBraking) {
      newSpeed = Math.max(newSpeed - 15, 0);
    } else {
      newSpeed = Math.max(newSpeed - 5, 0);
    }

    // Update angle (only when moving)
    if (newSpeed > 0) {
      const turnRate = (gameState.currentCar.handling / 100) * 3;
      if (isTurningLeft) {
        newPosition.angle -= turnRate;
      }
      if (isTurningRight) {
        newPosition.angle += turnRate;
      }
    }

    // Update position
    const angleRad = (newPosition.angle * Math.PI) / 180;
    newPosition.x += Math.sin(angleRad) * newSpeed * 0.2;
    newPosition.y -= Math.cos(angleRad) * newSpeed * 0.2;

    // Keep car on track (simple bounds)
    newPosition.x = Math.max(50, Math.min(750, newPosition.x));
    newPosition.y = Math.max(50, Math.min(550, newPosition.y));

    // Update lap progress (simplified)
    const trackCenter = { x: 400, y: 300 };
    const distance = Math.sqrt(
      Math.pow(newPosition.x - trackCenter.x, 2) + 
      Math.pow(newPosition.y - trackCenter.y, 2)
    );
    
    // Simple lap calculation based on position
    const angle = Math.atan2(newPosition.y - trackCenter.y, newPosition.x - trackCenter.x);
    const normalizedAngle = (angle + Math.PI) / (2 * Math.PI);
    let newLapProgress = normalizedAngle * 100;

    // Check for lap completion
    if (gameState.lapProgress > 80 && newLapProgress < 20) {
      const newLap = gameState.lap + 1;
      if (newLap > gameState.totalLaps) {
        // Race finished!
        finishRace();
        return;
      } else {
        setGameState(prev => ({ ...prev, lap: newLap }));
        toast.success(`Lap ${newLap}/${gameState.totalLaps}!`);
      }
    }

    // Update game state
    setGameState(prev => ({
      ...prev,
      position: newPosition,
      speed: newSpeed,
      lapProgress: newLapProgress,
      currentTime: prev.currentTime + (1/60) // 60 FPS
    }));
  }, [gameState]);

  const handleCarSelect = async (car) => {
    setLoading(true);
    try {
      await gameStateService.updateGameState({ currentCar: car });
      setGameState(prev => ({ ...prev, currentCar: car }));
      setShowCarSelection(false);
      toast.success(`${car.name} selected!`);
    } catch (error) {
      toast.error('Failed to select car');
    } finally {
      setLoading(false);
    }
  };

  const startRace = async () => {
    if (!gameState.currentCar) {
      setShowCarSelection(true);
      return;
    }

    setLoading(true);
    try {
      await gameStateService.startRace();
      setGameState(prev => ({
        ...prev,
        raceInProgress: true,
        currentTime: 0,
        lapProgress: 0,
        lap: 1,
        speed: 0,
        position: { x: 400, y: 500, angle: 0 }
      }));
      toast.success('Race started!');
    } catch (error) {
      toast.error('Failed to start race');
    } finally {
      setLoading(false);
    }
  };

  const finishRace = async () => {
    setLoading(true);
    try {
      await gameStateService.finishRace();
      
      // Save race result
      const raceResult = {
        carId: gameState.currentCar.Id,
        playerName: 'Player',
        time: gameState.currentTime,
        track: 'circuit-alpha'
      };
      
      await raceResultService.create(raceResult);
      
      setFinalTime(gameState.currentTime);
      setGameState(prev => ({ ...prev, raceInProgress: false }));
      setShowRaceComplete(true);
      
      // Reload leaderboard
      await loadLeaderboard();
      
      toast.success(`Race completed in ${gameState.currentTime.toFixed(2)}s!`);
    } catch (error) {
      toast.error('Failed to save race result');
    } finally {
      setLoading(false);
    }
  };

  const restartRace = () => {
    setShowRaceComplete(false);
    startRace();
  };

  const changeCarSelection = () => {
    setShowRaceComplete(false);
    setShowCarSelection(true);
  };

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleSettingsUpdate = async (settings) => {
    try {
      await gameStateService.updateGameState(settings);
      setGameState(prev => ({ ...prev, ...settings }));
      toast.success('Settings updated!');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  // Control handlers for mobile
  const handleAccelerate = () => {
    keysRef.current['ArrowUp'] = true;
  };

  const handleBrake = () => {
    keysRef.current['ArrowDown'] = true;
  };

  const handleTurnLeft = () => {
    keysRef.current['ArrowLeft'] = true;
  };

  const handleTurnRight = () => {
    keysRef.current['ArrowRight'] = true;
  };

  const handleControlRelease = (control) => {
    switch (control) {
      case 'accelerate':
        keysRef.current['ArrowUp'] = false;
        break;
      case 'brake':
        keysRef.current['ArrowDown'] = false;
        break;
      case 'left':
        keysRef.current['ArrowLeft'] = false;
        break;
      case 'right':
        keysRef.current['ArrowRight'] = false;
        break;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-900 relative">
      {/* Main Game Area */}
      <div className="flex-1 relative">
        {/* Racing Canvas */}
        <RacingCanvas 
          gameState={gameState}
          className="absolute inset-0"
        />

        {/* HUD Overlay */}
        <HUDOverlay 
          gameState={gameState}
          onStartRace={startRace}
          onToggleLeaderboard={toggleLeaderboard}
          onToggleSettings={toggleSettings}
          onCarSelect={() => setShowCarSelection(true)}
          loading={loading}
        />

        {/* Game Controls - Mobile */}
        <div className="absolute bottom-4 left-4 right-4 md:hidden">
          <GameControls
            onAccelerate={handleAccelerate}
            onBrake={handleBrake}
            onTurnLeft={handleTurnLeft}
            onTurnRight={handleTurnRight}
            onRelease={handleControlRelease}
          />
        </div>
      </div>

      {/* Modals and Panels */}
      <AnimatePresence>
        {showCarSelection && (
          <CarSelectionModal
            onSelect={handleCarSelect}
            onClose={() => setShowCarSelection(false)}
            loading={loading}
          />
        )}

        {showLeaderboard && (
          <LeaderboardPanel
            leaderboard={leaderboard}
            onClose={() => setShowLeaderboard(false)}
          />
        )}

        {showRaceComplete && (
          <RaceCompleteDialog
            finalTime={finalTime}
            onRestart={restartRace}
            onChangeCar={changeCarSelection}
            onClose={() => setShowRaceComplete(false)}
          />
        )}

        {showSettings && (
          <SettingsMenu
            settings={{
              audioEnabled: gameState.audioEnabled,
              musicEnabled: gameState.musicEnabled
            }}
            onUpdate={handleSettingsUpdate}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game;