'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export default function LoadingScreen() {
  const { isLoading, setLoading } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const statuses = [
      'Initializing neural core...',
      'Loading 3D environment...',
      'Calibrating AI systems...',
      'Syncing data modules...',
      'Rendering interface...',
      'System ready.',
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / 5) * 100, 100);
      setProgress(newProgress);
      setStatus(statuses[Math.min(currentStep, statuses.length - 1)]);

      if (currentStep >= 5) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 800);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [setLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-end pb-[25vh]"
          style={{ 
            background: 'rgba(5, 5, 10, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Scanning lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 w-full h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0,198,255,0.4), transparent)',
                }}
                animate={{
                  top: ['-5%', '105%'],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <motion.div
            className="w-64 md:w-80 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.p
              className="text-center text-sm tracking-[0.5em] mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              TECH
            </motion.p>
            
            <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
              <motion.div
                className="h-full rounded-full gradient-bg"
                style={{ boxShadow: '0 0 20px rgba(0,198,255,0.5)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Status text */}
            <div className="flex justify-between items-center mt-3">
              <motion.p
                className="text-xs font-mono"
                style={{ color: 'var(--color-accent-cyan)' }}
                key={status}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {status}
              </motion.p>
              <p className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                {Math.round(progress)}%
              </p>
            </div>
          </motion.div>

          {/* Corner brackets */}
          {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-8 h-8 pointer-events-none`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <div
                className="w-full h-full"
                style={{
                  borderColor: 'var(--color-accent-cyan)',
                  ...(i === 0 ? { borderTop: '1px solid', borderLeft: '1px solid' } :
                    i === 1 ? { borderTop: '1px solid', borderRight: '1px solid' } :
                      i === 2 ? { borderBottom: '1px solid', borderLeft: '1px solid' } :
                        { borderBottom: '1px solid', borderRight: '1px solid' }),
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
