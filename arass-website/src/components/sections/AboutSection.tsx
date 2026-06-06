'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const NeuralScene = dynamic(() => import('@/components/3d/NeuralScene'), { ssr: false });

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '99%', label: 'Client Satisfaction' },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--color-accent-cyan)] mb-4 block">
            {`// About Us`}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            The <span className="gradient-text">Neural Core</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg">
            ARASS Tech is an AI-first technology company building the infrastructure of tomorrow.
            We merge artificial intelligence with creative engineering.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Neural Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden neon-border">
              <NeuralScene />
            </div>
            <div className="absolute -bottom-3 -right-3 w-24 h-24 gradient-bg rounded-2xl opacity-10 blur-2xl" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 neon-border">
                <h3 className="text-xl font-bold mb-3 text-[var(--color-accent-cyan)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Our Mission
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  To democratize AI technology and make it accessible to every business.
                  We don&apos;t just build software — we architect intelligent systems that
                  learn, adapt, and evolve alongside your business.
                </p>
              </div>

              <div className="glass rounded-2xl p-6 neon-border">
                <h3 className="text-xl font-bold mb-3 text-[var(--color-accent-cyan)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Our Approach
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  We combine cutting-edge AI research with production-grade engineering.
                  Every project starts with understanding the problem space, then
                  designing solutions that push the boundaries of what&apos;s possible.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1 text-[var(--color-text-secondary)]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
