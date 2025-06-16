import React, { useRef, useEffect } from 'react';

const RacingCanvas = ({ gameState, className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw track
    drawTrack(ctx, canvas.width, canvas.height);

    // Draw car if selected
    if (gameState.currentCar && gameState.position) {
      drawCar(ctx, gameState);
    }

    // Draw speed lines if racing
    if (gameState.raceInProgress && gameState.speed > 30) {
      drawSpeedLines(ctx, gameState, canvas.width, canvas.height);
    }

  }, [gameState]);

  const drawTrack = (ctx, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radiusOuter = Math.min(width, height) * 0.4;
    const radiusInner = radiusOuter * 0.6;

    // Outer track boundary
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radiusOuter, 0, 2 * Math.PI);
    ctx.stroke();

    // Inner track boundary
    ctx.beginPath();
    ctx.arc(centerX, centerY, radiusInner, 0, 2 * Math.PI);
    ctx.stroke();

    // Track surface
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, (radiusOuter + radiusInner) / 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);

    // Start/Finish line
    ctx.strokeStyle = '#FFEB3B';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radiusOuter - 10);
    ctx.lineTo(centerX, centerY - radiusInner + 10);
    ctx.stroke();

    // Checkpoints
    const checkpoints = [
      { angle: Math.PI / 2, color: '#FF1744' },
      { angle: Math.PI, color: '#1E88E5' },
      { angle: 3 * Math.PI / 2, color: '#4CAF50' }
    ];

    checkpoints.forEach(checkpoint => {
      const x1 = centerX + Math.cos(checkpoint.angle) * (radiusInner - 10);
      const y1 = centerY + Math.sin(checkpoint.angle) * (radiusInner - 10);
      const x2 = centerX + Math.cos(checkpoint.angle) * (radiusOuter + 10);
      const y2 = centerY + Math.sin(checkpoint.angle) * (radiusOuter + 10);

      ctx.strokeStyle = checkpoint.color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
  };

  const drawCar = (ctx, gameState) => {
    const { position, currentCar, speed } = gameState;
    
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate((position.angle * Math.PI) / 180);

    // Car body
    ctx.fillStyle = currentCar.color;
    ctx.fillRect(-8, -15, 16, 30);

    // Car details
    ctx.fillStyle = '#000';
    ctx.fillRect(-6, -12, 12, 6); // Front windshield
    ctx.fillRect(-6, 6, 12, 6);   // Rear windshield

    // Speed effect
    if (speed > 50) {
      ctx.fillStyle = currentCar.color + '40'; // Semi-transparent
      ctx.fillRect(-10, -18, 20, 36);
    }

    // Car outline
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(-8, -15, 16, 30);

    ctx.restore();
  };

  const drawSpeedLines = (ctx, gameState, width, height) => {
    const { position, speed } = gameState;
    const lineCount = Math.floor(speed / 10);
    
    ctx.strokeStyle = '#ffffff20';
    ctx.lineWidth = 2;

    for (let i = 0; i < lineCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = 20 + Math.random() * 30;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - length, y);
      ctx.stroke();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default RacingCanvas;