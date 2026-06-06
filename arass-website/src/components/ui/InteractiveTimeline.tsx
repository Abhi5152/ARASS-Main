'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const steps = [
  {
    id: 'discovery',
    title: '1. Discovery & Strategy',
    description: 'We dive deep into your business goals, target audience, and technical requirements to formulate a comprehensive roadmap.',
    icon: 'search',
  },
  {
    id: 'design',
    title: '2. UI/UX Design',
    description: 'Our design team crafts visually stunning, conversion-optimized interfaces tailored to your brand identity.',
    icon: 'palette',
  },
  {
    id: 'development',
    title: '3. Development',
    description: 'We bring designs to life using cutting-edge technologies like Next.js, React Three Fiber, and robust backend architectures.',
    icon: 'code',
  },
  {
    id: 'deployment',
    title: '4. Deployment & Growth',
    description: 'Rigorous testing followed by a seamless launch. We continue to monitor, optimize, and scale your application.',
    icon: 'rocket_launch',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StepItem({ step, index, totalSteps, scrollYProgress }: { step: any, index: number, totalSteps: number, scrollYProgress: MotionValue<number> }) {
  const isEven = index % 2 === 0;
  
  // Calculate individual step progress based on its position in the array
  const stepStart = index * (1 / totalSteps);
  const stepEnd = stepStart + (1 / totalSteps);
  
  const stepGlow = useTransform(scrollYProgress, [stepStart, stepEnd], [0.2, 1]);
  const stepScale = useTransform(scrollYProgress, [stepStart, stepEnd], [0.8, 1]);
  const stepY = useTransform(scrollYProgress, [stepStart, stepEnd], [30, 0]);
  const stepBoxShadow = useTransform(scrollYProgress, [stepStart, stepEnd], ['none', '0 0 20px rgba(0, 198, 255, 0.4)']);
  
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Content Area */}
      <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right'}`}>
        <motion.div
          style={{ opacity: stepGlow, y: stepY }}
          className="p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(10,14,26,0.6)] backdrop-blur-md transition-all duration-500 hover:border-[rgba(0,198,255,0.3)] hover:shadow-[0_0_30px_rgba(0,198,255,0.1)] relative group"
        >
          <div className={`absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isEven ? 'left-0' : 'right-0'}`} />
          <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {step.title}
          </h3>
          <p className="text-[var(--ts)] leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      </div>

      {/* Node */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--dark)] border-2 border-[rgba(255,255,255,0.1)] z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <motion.div 
          className="w-full h-full flex items-center justify-center rounded-full bg-[rgba(0,198,255,0.1)] border border-[var(--neon)] text-[var(--neon)]"
          style={{ scale: stepScale, opacity: stepGlow, boxShadow: stepBoxShadow }}
        >
          <span className="material-symbols-outlined text-2xl">{step.icon}</span>
        </motion.div>
      </div>

      {/* Empty Spacer for Layout */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
}

export default function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="container-custom max-w-5xl mx-auto relative z-10 px-6">
        
        <div className="text-center mb-24">
          <p className="text-[var(--neon)] font-bold tracking-widest uppercase text-xs mb-4">Our Process</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-[var(--ts)] max-w-2xl mx-auto text-lg leading-relaxed">
            A systematic approach to delivering high-performance digital experiences, from concept to deployment.
          </p>
        </div>

        <div className="relative">
          {/* SVG Line Background */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.05)] transform md:-translate-x-1/2" />
          
          {/* SVG Line Animated */}
          <motion.div 
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] transform md:-translate-x-1/2 origin-top"
            style={{ 
              background: 'linear-gradient(to bottom, var(--neon), #007bff)',
              scaleY: pathLength,
              opacity: opacity
            }}
          />

          <div className="flex flex-col gap-24 relative z-10">
            {steps.map((step, index) => (
              <StepItem 
                key={step.id} 
                step={step} 
                index={index} 
                totalSteps={steps.length} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
