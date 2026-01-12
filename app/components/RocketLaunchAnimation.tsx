"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  growth: number;
  life: number;
  maxLife: number;
  colorStart: { r: number, g: number, b: number, a: number };
  colorEnd: { r: number, g: number, b: number, a: number };
}

type MotionParams = {
  initialVelocity: number;
  baseAcceleration: number;
  accelerationGrowthRate: number;
  timeStep: number;
};

interface RocketLaunchAnimationProps {
  launchTriggered?: boolean;
  onLaunchComplete?: () => void;
  buildProgress?: number; // 0 to 1, controls how much of the rocket is built
  width?: string;
  height?: string;
}

const RocketLaunchAnimation: React.FC<RocketLaunchAnimationProps> = ({ 
  launchTriggered = false, 
  onLaunchComplete = () => {},
  buildProgress = 1,
  width = "100%",
  height = "100vh",
}) => {
  const [mounted, setMounted] = useState(false);
  const [launchInitiated, setLaunchInitiated] = useState(false);
  const [showFlame, setShowFlame] = useState(false);
  
  // responsive rocket base transform and start position
  const [rocketBaseScale, setRocketBaseScale] = useState(0.7);
  const [rocketStartBottomPct, setRocketStartBottomPct] = useState(-100); // Start off-screen
  const [rocketStartRightPct, setRocketStartRightPct] = useState(5);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [motionParams, setMotionParams] = useState<MotionParams>({
    initialVelocity: 0,
    baseAcceleration: 0.0007,
    accelerationGrowthRate: 0.0055,
    timeStep: 0.016,
  });

  // horizontal factor for trajectory; smaller on mobile to stay on screen
  const horizontalFactor = isSmallScreen ? 0.35 : 0.35;
  
  const animationRef = useRef<number | null>(null);
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const rocketInnerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mainNozzleRef = useRef<HTMLDivElement | null>(null);
  
  // Particles system
  const particles = useRef<Particle[]>([]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && launchTriggered && !launchInitiated) {
      setLaunchInitiated(true);
      setTimeout(() => {
        startLaunchSequence();
      }, 500);
    }
  }, [mounted, launchTriggered, launchInitiated]);

  // Update rocket base scale and starting position based on viewport width
  useEffect(() => {
    if (!mounted) return;
    
    const applyResponsiveRocket = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsSmallScreen(width <= 480);

      // Resize canvas
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }

      if (width <= 480) {
        setRocketBaseScale(0.4);
        setRocketStartBottomPct(-16);
        setRocketStartRightPct(4);
        setMotionParams({
          initialVelocity: 0,
          baseAcceleration: 0.02,
          accelerationGrowthRate: 0.0052,
          timeStep: 0.016,
        });
      } else if (width <= 768) {
        setRocketBaseScale(0.6);
        setRocketStartBottomPct(-16);
        setRocketStartRightPct(4);
        setMotionParams({
          initialVelocity: 0,
          baseAcceleration: 0.02,
          accelerationGrowthRate: 0.0052,
          timeStep: 0.016,
        });
      } else {
        setRocketBaseScale(0.7);
        setRocketStartBottomPct(-11.5);
        setRocketStartRightPct(5);
        setMotionParams({
          initialVelocity: 0,
          baseAcceleration: 0.0007,
          accelerationGrowthRate: 0.0055,
          timeStep: 0.016,
        });
      }
    };
    applyResponsiveRocket();
    window.addEventListener('resize', applyResponsiveRocket);
    return () => window.removeEventListener('resize', applyResponsiveRocket);
  }, [mounted]);

  const startLaunchSequence = () => {
    setShowFlame(true);
    // Wait 1 second with flames on before rocket starts moving
    setTimeout(() => {
      animateRocket();
    }, 1000);
  };

  const animateRocket = () => {
    let position = 0;
    let velocity = motionParams.initialVelocity;
    let time = 0;
    
    const plumeInterval = window.innerWidth > 768 ? 60 : 150; // ms between puffs
    let lastPlumeTime = 0;

    const animate = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !canvasRef.current) return;

      time += motionParams.timeStep;
      
      const acceleration = motionParams.baseAcceleration + (time * motionParams.accelerationGrowthRate);
      velocity += acceleration;
      position += velocity;

      // --- Rocket Physics & Trajectory ---
      const rotationStart = isSmallScreen ? 20 : 150;
      const rotationRamp = isSmallScreen ? 2500 : 2000;
      const turnEnd = rotationStart + rotationRamp;
      
      let xPos = 0;
      if (position <= rotationStart) {
        xPos = 0;
      } else if (position <= turnEnd) {
        const rawTilt = (position - rotationStart) / rotationRamp;
        const smoothTurn = rawTilt * rawTilt * (3 - 2 * rawTilt);
        xPos = -position * horizontalFactor * smoothTurn;
      } else {
        const turnEndXPos = -turnEnd * horizontalFactor * 1;
        const distanceAfterTurn = position - turnEnd;
        xPos = turnEndXPos - distanceAfterTurn * horizontalFactor;
      }
      
      const futurePosition = position + 30;
      let futureXPos = 0;
      if (futurePosition <= rotationStart) {
        futureXPos = 0;
      } else if (futurePosition <= turnEnd) {
        const rawFutureTilt = (futurePosition - rotationStart) / rotationRamp;
        const futureSmoothTurn = rawFutureTilt * rawFutureTilt * (3 - 2 * rawFutureTilt);
        futureXPos = -futurePosition * horizontalFactor * futureSmoothTurn;
      } else {
        const turnEndXPos = -turnEnd * horizontalFactor * 1;
        const distanceAfterTurn = futurePosition - turnEnd;
        futureXPos = turnEndXPos - distanceAfterTurn * horizontalFactor;
      }
      
      const deltaX = futureXPos - xPos;
      const deltaY = -30;
      const dynamicAngle = Math.atan2(deltaX, -deltaY) * 180 / Math.PI;
      
      // Update DOM
      if (rocketRef.current) {
        rocketRef.current.style.transform = `translateX(-50%) translateX(${xPos}px) translateY(-${position}px)`;
      }
      if (rocketInnerRef.current) {
        rocketInnerRef.current.style.transform = `rotate(${dynamicAngle}deg) scale(${rocketBaseScale})`;
      }

      // --- Canvas Smoke Rendering ---
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Spawn new particles
      const currentTime = performance.now();
      if (currentTime - lastPlumeTime > plumeInterval) {
        const rocketRect = rocketRef.current?.getBoundingClientRect();
        const nozzleRect = mainNozzleRef.current?.getBoundingClientRect();
        
        // Prefer exact nozzle position if available, fallback to rocket center
        if (nozzleRect) {
             const nozzleCenterX = nozzleRect.left + nozzleRect.width / 2;
             const nozzleCenterY = nozzleRect.top + nozzleRect.height / 2;

             // Ejection velocity vector (opposite to rocket heading)
             const rad = dynamicAngle * (Math.PI / 180);
             const ejectionSpeed = 2 + Math.random() * 2;
             const vx = -ejectionSpeed * Math.sin(rad);
             const vy = ejectionSpeed * Math.cos(rad);

             // Offset spawn point relative to rocket rotation
             const spawnOffset = 20; // px distance "down" from nozzle center
             const sideOffset = isSmallScreen ? 0 : 12; // px distance "sideways"
             
             // Rotate the local offset vector (sideOffset, spawnOffset) by dynamicAngle
             const offsetX = (sideOffset * Math.cos(rad)) - (spawnOffset * Math.sin(rad));
             const offsetY = (sideOffset * Math.sin(rad)) + (spawnOffset * Math.cos(rad));

             const spread = isSmallScreen ? 10 : 20;

             particles.current.push({
               x: nozzleCenterX + offsetX + (Math.random() - 0.5) * spread,
               y: nozzleCenterY + offsetY + (Math.random() - 0.5) * spread,
               vx: vx + (Math.random() - 0.5) * 1,
               vy: vy + (Math.random() - 0.5) * 1,
               size: isSmallScreen ? 20 : 30,
               growth: isSmallScreen ? 0.8 : 1.2,
               life: 0,
               maxLife: isSmallScreen ? 150 : 200, 
               colorStart: { r: 124, g: 58, b: 237, a: 0.6 },
               colorEnd: { r: 187, g: 155, b: 227, a: 0 },
             });
        }
        else if (rocketRect) {
          // Fallback if nozzle ref is missing (should not happen)
          const centerX = rocketRect.left + rocketRect.width / 2;
          const centerY = rocketRect.bottom - (rocketRect.height * 0.1); 
          
          const spread = isSmallScreen ? 10 : 20;
          particles.current.push({
            x: centerX + (Math.random() - 0.5) * spread,
            y: centerY,
            vx: (Math.random() - 0.5) * 2,
            vy: 2 + Math.random() * 2,
            size: isSmallScreen ? 20 : 30,
            growth: isSmallScreen ? 0.8 : 1.2,
            life: 0,
            maxLife: isSmallScreen ? 150 : 200,
            colorStart: { r: 124, g: 58, b: 237, a: 0.6 },
            colorEnd: { r: 187, g: 155, b: 227, a: 0 },
          });
        }
        lastPlumeTime = currentTime;
      }

      // Update and Draw Particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life++;
        
        if (p.life >= p.maxLife) {
          particles.current.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.size += p.growth;
        p.vy *= 0.98; // Friction

        // Calculate current alpha/color
        const progress = p.life / p.maxLife;
        const alpha = p.colorStart.a * (1 - progress);
        
        // Draw
        ctx.beginPath();
        // Create radial gradient for soft smoke look
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(${p.colorStart.r}, ${p.colorStart.g}, ${p.colorStart.b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${p.colorEnd.r}, ${p.colorEnd.g}, ${p.colorEnd.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (position < window.innerHeight + 300) { // Keep animating a bit longer to let smoke dissipate
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Continue animation just for smoke dissipation if particles exist
        if (particles.current.length > 0) {
             animationRef.current = requestAnimationFrame(animate); 
        } else {
             onLaunchComplete();
        }
      }
    };

    animate();
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        width, 
        height, 
        position: 'relative',
        background: 'transparent',
        fontFamily: 'Courier New, monospace',
        overflow: 'hidden', // Contain canvas
      }}
    >
      <canvas 
        ref={canvasRef}
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 140
        }}
      />
      
      {mounted && (
        <>
          {/* Rocket */}
          <div
            ref={rocketRef}
            style={{
              position: 'absolute',
              bottom: `${rocketStartBottomPct}%`,
              left: undefined,
              right: `${rocketStartRightPct}%`,
              transform: `translateX(-50%) translateX(0px) translateY(0px)`,
              width: '60px',
              height: '350px',
              willChange: 'transform',
              zIndex: 150
            }}
          >
        <div
          ref={rocketInnerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: `rotate(0deg) scale(${rocketBaseScale})`,
            transformOrigin: 'center center',
            willChange: 'transform'
          }}
        >
        {/* Main Rocket Body */}
        <div style={{
          position: 'absolute',
          bottom: '95px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30px',
          height: '180px',
          background: 'linear-gradient(to right, #909090, #b0b0b0, #808080)',
          borderRadius: '15px 15px 6px 6px',
          boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.1)',
          opacity: 1
        }} />
        
        {/* Upper Stage */}
        <div style={{
          position: 'absolute',
          bottom: '265px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          height: '45px',
          background: 'linear-gradient(to right, #a0a0a0, #b8b8b8, #989898)',
          borderRadius: '12px 12px 4px 4px',
          boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.1)',
          opacity: 1
        }} />
        
        {/* Command Module Window */}
        <div style={{
          position: 'absolute',
          bottom: '280px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '10px',
          background: 'radial-gradient(circle,rgb(183, 112, 255),rgb(74, 28, 138))',
          borderRadius: '50%',
          border: '1px solid #2f3542',
          boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.5)',
          opacity: 1
        }} />
        
        {/* Service Module Details */}
        <div style={{
          position: 'absolute',
          bottom: '165px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28px',
          height: '4px',
          background: '#57606f',
          borderRadius: '2px',
          opacity: 1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28px',
          height: '4px',
          background: '#57606f',
          borderRadius: '2px',
          opacity: 1
        }} />
        
        {/* Side Boosters */}
        <div style={{
          position: 'absolute',
          bottom: '95px',
          left: '1px',
          width: '12px',
          height: '140px',
          background: 'linear-gradient(to right, #888888, #a0a0a0, #787878)',
          borderRadius: '6px 6px 3px 3px',
          boxShadow: 'inset -1px 0 4px rgba(0,0,0,0.1)',
          opacity: 1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '95px',
          right: '1px',
          width: '12px',
          height: '140px',
          background: 'linear-gradient(to right, #888888, #a0a0a0, #787878)',
          borderRadius: '6px 6px 3px 3px',
          boxShadow: 'inset -1px 0 4px rgba(0,0,0,0.1)',
          opacity: 1
        }} />
        
        {/* Engine Nozzles */}
        <div ref={mainNozzleRef} style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '14px',
          height: '12px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '9px 9px 3px 3px',
          opacity: 1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '85px',
          left: '3px',
          width: '6px',
          height: '8px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '4px 4px 2px 2px',
          opacity: 1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '85px',
          right: '3px',
          width: '6px',
          height: '8px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '4px 4px 2px 2px',
          opacity: 1
        }} />
        
        {/* Main Engine Flame */}
        {showFlame && (
          <div style={{
            position: 'absolute',
            bottom: '68px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '16px',
            height: '25px',
            background: 'linear-gradient(to bottom,rgb(136, 66, 174),rgb(164, 105, 196),rgb(198, 171, 215))',
            borderRadius: '0 0 50% 50%',
            animation: 'flicker 0.08s infinite alternate',
            filter: 'blur(0.5px)'
          }} />
        )}
        
        {/* Side Engine Flames */}
        {showFlame && (
          <>
            <div style={{
              position: 'absolute',
              bottom: '73px',
              left: '6px',
              width: '8px',
              height: '15px',
              background: 'linear-gradient(to bottom,rgb(136, 66, 174),rgb(164, 105, 196),rgb(198, 171, 215))',
              borderRadius: '0 0 50% 50%',
              animation: 'flicker 0.1s infinite alternate',
              filter: 'blur(0.3px)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '73px',
              right: '-2px',
              width: '8px',
              height: '15px',
              background: 'linear-gradient(to bottom,rgb(136, 66, 174),rgb(164, 105, 196),rgb(198, 171, 215))',
              borderRadius: '0 0 50% 50%',
              animation: 'flicker 0.09s infinite alternate',
              filter: 'blur(0.3px)'
            }} />
          </>
        )}
        </div>
      </div>
      </>
    )}

      <style jsx>{`
        @keyframes flicker {
          0% { transform: translateX(-50%) scaleY(1); }
          100% { transform: translateX(-50%) scaleY(1.2); }
        }
      `}</style>
      
    </div>
  );
};

export default RocketLaunchAnimation;
