'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto translate-y-[5vh] md:translate-y-[20vh]"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 shadow-sm backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 123, 255, 0.08), rgba(0, 198, 255, 0.08))',
            border: '1px solid rgba(0, 198, 255, 0.2)',
          }}
        >
          <div className="w-2 h-2 rounded-full gradient-bg animate-pulse" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-[#EAEAEC] uppercase">
            Available for new projects
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="mb-8"
          style={{ fontFamily: 'var(--font-heading)' }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight gradient-text leading-tight drop-shadow-sm">
            Building Modern AI &amp;<br className="hidden md:block" /> Web Experiences
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light text-gray-300"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.6 }}
        >
          We design and build premium web applications and AI-driven solutions
          that elevate your brand and drive conversions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto mt-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.6 }}
        >
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary w-full sm:w-auto"
          >
            Book a Project
          </button>
          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary w-full sm:w-auto"
          >
            View Portfolio
          </button>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 5, duration: 1 }}
      >
        <motion.div
          className="w-5 h-9 rounded-full flex justify-center pt-2"
          style={{ border: '1px solid rgba(255,255,255,0.12)' }}
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-0.5 h-2 rounded-full gradient-bg"
            animate={{ opacity: [0.8, 0], y: [0, 6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
