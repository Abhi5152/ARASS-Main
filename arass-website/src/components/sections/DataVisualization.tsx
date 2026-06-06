'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const pipeline = [
  { step: '01', label: 'Data Ingestion', desc: 'Raw data streams in', color: '#007bff', width: '100%' },
  { step: '02', label: 'Processing', desc: 'AI transforms data', color: '#00c6ff', width: '85%' },
  { step: '03', label: 'Training', desc: 'Models learn patterns', color: '#7b2ff7', width: '70%' },
  { step: '04', label: 'Inference', desc: 'Real-time predictions', color: '#00ff88', width: '90%' },
  { step: '05', label: 'Deployment', desc: 'Scale to production', color: '#ff2d95', width: '95%' },
];

export default function DataVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--color-accent-cyan)] mb-4 block">{`// AI Pipeline`}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>How We <span className="gradient-text">Process</span></h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg">Our AI pipeline turns raw data into production-grade intelligence.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {pipeline.map((item, i) => (
            <motion.div key={item.step} className="glass rounded-xl p-5" initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.6 }}>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.step}</span>
                <h3 className="font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{item.label}</h3>
                <span className="text-xs text-[var(--color-text-secondary)] ml-auto">{item.desc}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`, boxShadow: `0 0 15px ${item.color}40` }} initial={{ width: '0%' }} animate={isInView ? { width: item.width } : {}} transition={{ delay: 0.5 + i * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
