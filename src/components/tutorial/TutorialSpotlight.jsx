import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export const TutorialSpotlight = ({ 
  targetSelector, 
  active, 
  message, 
  position = 'bottom',
  onNext,
  onSkip,
  isLastStep = false 
}) => {
  const [targetRect, setTargetRect] = useState(null);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    if (!active || !targetSelector) return;

    const updatePosition = () => {
      const element = document.querySelector(targetSelector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      }
    };

    // Initial position
    setTimeout(updatePosition, 100);

    // Update on resize
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    // Pulsing glow effect
    const glowInterval = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 50);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      clearInterval(glowInterval);
    };
  }, [active, targetSelector]);

  if (!active || !targetRect) return null;

  const padding = 16;
  const spotlightStyle = {
    left: targetRect.left - padding,
    top: targetRect.top - padding,
    width: targetRect.width + padding * 2,
    height: targetRect.height + padding * 2,
  };

  // Calculate message position
  const getMessagePosition = () => {
    const base = { left: '50%', transform: 'translateX(-50%)' };
    
    switch (position) {
      case 'top':
        return { ...base, bottom: '100%', marginBottom: '20px' };
      case 'bottom':
        return { ...base, top: '100%', marginTop: '20px' };
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '20px' };
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '20px' };
      default:
        return { ...base, top: '100%', marginTop: '20px' };
    }
  };

  return (
    <AnimatePresence>
      {/* Dark overlay with cutout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at ${targetRect.left + targetRect.width / 2}px ${targetRect.top + targetRect.height / 2}px,
            transparent ${Math.max(targetRect.width, targetRect.height) / 2 + padding}px,
            rgba(0, 0, 0, 0.92) ${Math.max(targetRect.width, targetRect.height) / 2 + padding + 100}px
          )`,
        }}
      />

      {/* Spotlight glow */}
      <motion.div
        className="fixed z-[10000] pointer-events-none"
        style={spotlightStyle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Animated border glow */}
        <div 
          className="absolute inset-0 rounded-sm"
          style={{
            boxShadow: `
              0 0 ${20 + Math.sin(glowIntensity * 0.1) * 10}px rgba(252, 238, 10, 0.6),
              0 0 ${40 + Math.sin(glowIntensity * 0.1) * 20}px rgba(252, 238, 10, 0.3),
              inset 0 0 ${10 + Math.sin(glowIntensity * 0.1) * 5}px rgba(252, 238, 10, 0.2)
            `,
            border: '2px solid rgba(252, 238, 10, 0.8)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />

        {/* Corner markers */}
        {[
          { top: -2, left: -2 },
          { top: -2, right: -2 },
          { bottom: -2, left: -2 },
          { bottom: -2, right: -2 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 border-2 border-cyber-yellow"
            style={pos}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Message box */}
      <motion.div
        className="fixed z-[10001] max-w-md pointer-events-auto"
        style={{
          ...spotlightStyle,
          ...getMessagePosition(),
        }}
        initial={{ opacity: 0, y: position === 'top' ? 20 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="bg-cyber-bg-secondary border-2 border-cyber-yellow p-6 clip-corner-lg relative overflow-hidden">
          {/* Scanline effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(252, 238, 10, 0.1) 2px, rgba(252, 238, 10, 0.1) 4px)',
            }} />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-cyber-yellow font-mono text-sm leading-relaxed mb-4">
                {message}
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={onNext}
                className="flex-1 cyber-btn-primary text-xs py-2"
              >
                {isLastStep ? 'ENGAGE SYSTEMS' : 'CONTINUE >>'}
              </button>
              <button
                onClick={onSkip}
                className="cyber-btn text-xs py-2 px-4 opacity-60 hover:opacity-100"
              >
                SKIP
              </button>
            </motion.div>

            {/* Typing indicator */}
            <motion.div
              className="absolute -bottom-2 left-6 flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1 h-1 bg-cyber-yellow rounded-full" />
              <div className="w-1 h-1 bg-cyber-yellow rounded-full" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-cyber-yellow rounded-full" style={{ animationDelay: '0.4s' }} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

