import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TutorialSpotlight } from './TutorialSpotlight';
import { Terminal } from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    id: 'intro',
    selector: null,
    message: ">> SYSTEM INITIALIZING...\n>> WELCOME, OPERATOR.\n>> BEGINNING NEURAL INTERFACE TUTORIAL...",
    position: 'center',
    delay: 1000,
  },
  {
    id: 'header',
    selector: 'header',
    message: ">> THIS IS YOUR COMMAND CENTER.\n>> ALL SYSTEM DATA FLOWS THROUGH HERE.\n>> THE SEARCH MATRIX AWAITS YOUR QUERY...",
    position: 'bottom',
  },
  {
    id: 'sidebar',
    selector: 'aside',
    message: ">> NEURAL NAVIGATION INTERFACE DETECTED.\n>> FIVE CORE SYSTEMS AVAILABLE:\n>> DASHBOARD. GIGS. JOBS. ANALYTICS. SETTINGS.\n>> CHOOSE YOUR PATH...",
    position: 'right',
  },
  {
    id: 'dashboard',
    selector: '[href="/"]',
    message: ">> DASHBOARD: YOUR OPERATIONAL OVERVIEW.\n>> REAL-TIME METRICS. THREAT ALERTS. SYSTEM STATUS.\n>> KNOWLEDGE IS POWER...",
    position: 'right',
  },
  {
    id: 'gigs',
    selector: '[href="/gigs"]',
    message: ">> GIGS: MAJOR OPERATIONS.\n>> EACH GIG REPRESENTS A MISSION CONTAINER.\n>> ORGANIZE. PRIORITIZE. EXECUTE.",
    position: 'right',
  },
  {
    id: 'jobs',
    selector: '[href="/jobs"]',
    message: ">> JOBS: TACTICAL OBJECTIVES.\n>> BREAK DOWN OPERATIONS INTO EXECUTABLE TASKS.\n>> TRACK. TIME. COMPLETE.",
    position: 'right',
  },
  {
    id: 'analytics',
    selector: '[href="/analytics"]',
    message: ">> ANALYTICS: PATTERN RECOGNITION.\n>> VISUALIZE YOUR EFFICIENCY.\n>> DATA REVEALS ALL TRUTHS...",
    position: 'right',
  },
  {
    id: 'settings',
    selector: '[href="/settings"]',
    message: ">> SETTINGS: SYSTEM CONFIGURATION.\n>> BACKUP PROTOCOLS. SECURITY PARAMETERS.\n>> CUSTOMIZE YOUR INTERFACE.",
    position: 'right',
  },
  {
    id: 'avatar',
    selector: 'aside > div:last-child',
    message: ">> YOUR DIGITAL IDENTITY.\n>> CLICK TO ACCESS PROFILE MATRIX.\n>> CHANGE YOUR AVATAR. MANAGE YOUR PRESENCE.",
    position: 'right',
  },
  {
    id: 'complete',
    selector: null,
    message: ">> TUTORIAL COMPLETE.\n>> NEURAL LINK ESTABLISHED.\n>> SYSTEMS ONLINE.\n>> GOOD LUCK OUT THERE, OPERATOR...",
    position: 'center',
  },
];

export const CinematicTutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isActive, setIsActive] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if tutorial has been completed
    const completed = localStorage.getItem('cyberdeck-tutorial-completed');
    if (completed) {
      onComplete?.();
      return;
    }

    // Start tutorial after brief delay
    const timer = setTimeout(() => {
      setIsActive(true);
      setCurrentStep(0);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('cyberdeck-tutorial-completed', 'true');
    setIsActive(false);
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  const currentStepData = TUTORIAL_STEPS[currentStep];

  if (!isActive) return null;

  return (
    <>
      {/* Intro sequence */}
      <AnimatePresence>
        {showIntro && currentStep === 0 && (
          <motion.div
            className="fixed inset-0 z-[9998] bg-cyber-bg flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Terminal className="text-cyber-yellow mx-auto mb-6" size={64} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h1 className="text-4xl font-display font-bold uppercase text-cyber-yellow mb-4 tracking-wider">
                  CYBERDECK
                </h1>
                <div className="font-mono text-cyber-gray-400 text-sm space-y-2">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    &gt;&gt; INITIALIZING NEURAL INTERFACE...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    &gt;&gt; ESTABLISHING CONNECTION...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="text-cyber-yellow"
                  >
                    &gt;&gt; READY.
                  </motion.p>
                </div>
              </motion.div>

              <motion.button
                className="cyber-btn-primary mt-8 px-8 py-3"
                onClick={() => {
                  setShowIntro(false);
                  setTimeout(() => setCurrentStep(1), 500);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BEGIN TUTORIAL
              </motion.button>

              <motion.button
                className="block cyber-btn mx-auto mt-4 px-6 py-2 text-xs opacity-60"
                onClick={handleSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 3 }}
                whileHover={{ opacity: 1 }}
              >
                SKIP TRAINING
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotlight tutorial for specific elements */}
      {!showIntro && currentStepData && currentStepData.selector && (
        <TutorialSpotlight
          targetSelector={currentStepData.selector}
          active={isActive && !showIntro}
          message={currentStepData.message}
          position={currentStepData.position}
          onNext={handleNext}
          onSkip={handleSkip}
          isLastStep={currentStep === TUTORIAL_STEPS.length - 1}
        />
      )}

      {/* Center messages (intro and outro) */}
      <AnimatePresence>
        {!showIntro && currentStepData && !currentStepData.selector && currentStep > 0 && (
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-2xl text-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-6xl mb-8">
                  {currentStep === TUTORIAL_STEPS.length - 1 ? '✓' : '⚡'}
                </div>
                <div className="font-mono text-cyber-yellow text-lg leading-relaxed whitespace-pre-line mb-8">
                  {currentStepData.message}
                </div>
                
                <motion.button
                  className="cyber-btn-primary px-8 py-3"
                  onClick={handleNext}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep === TUTORIAL_STEPS.length - 1 ? 'ENGAGE SYSTEMS' : 'CONTINUE'}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      {!showIntro && currentStepData?.selector && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10002] flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {TUTORIAL_STEPS.filter(s => s.selector).map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index < currentStep ? "bg-cyber-yellow" :
                index === currentStep ? "bg-cyber-yellow w-6" :
                "bg-cyber-border"
              )}
            />
          ))}
        </motion.div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </>
  );
};

