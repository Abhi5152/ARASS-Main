'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const projects = [
  {
      id: '1',
      title: 'Jesper AI',
      category: 'ai',
      sub: 'AI-Powered Software Engineering',
      img: '/images/jesper.png',
      problem: 'Modern businesses struggle with disconnected systems, inefficient workflows, and slow digital transformation, leading to reduced productivity and limited scalability.',
      solution: 'Built intelligent full-stack applications powered by AI automation, scalable cloud infrastructure, and modern web technologies with seamless user experiences and real-time data processing.',
      impact: 'Accelerated digital transformation and increased team development velocity by 65% across integrated systems.',
      stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS'],
      link: 'https://app-pink-six-f0tg33611i.vercel.app/'
  },
  {
      id: '2',
      title: 'Pro Sports',
      category: 'web',
      sub: 'Modern Sports E-Commerce Platform',
      img: '/images/prosports.png',
      problem: 'Sports enthusiasts often face outdated online shopping experiences with poor navigation, limited product discovery, and lack of engaging digital interaction across sports retail platforms.',
      solution: 'Developed a high-performance sports e-commerce website featuring dynamic animations, responsive design, interactive product showcases, smart filtering systems, and seamless shopping experiences optimized for all devices.',
      impact: 'Enhanced customer engagement through immersive UI/UX design, improved product accessibility and navigation efficiency, and created a scalable digital shopping platform tailored for athletes, fitness enthusiasts, and sports communities.',
      stack: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'Stripe'],
      link: 'https://prosport-gsmohit3i-sudevkrishna25-gmailcoms-projects.vercel.app/'
  },
  {
      id: '3',
      title: 'Flow',
      category: 'web',
      sub: 'Futuristic Digital Experience Platform',
      img: '/images/flow.png',
      problem: 'Traditional digital platforms often suffer from static interfaces, poor user engagement, and lack of immersive experiences, making modern brands struggle to capture user attention and deliver memorable interactions.',
      solution: 'Designed and developed a futuristic web experience featuring fluid animations, interactive UI elements, orbital-inspired visual effects, and high-performance responsive architecture powered by modern frontend technologies.',
      impact: 'Created an engaging next-generation digital platform that enhanced user interaction, improved visual storytelling, and delivered a seamless cross-device experience with modern aesthetics and smooth performance.',
      stack: ['React', 'Three.js', 'Framer Motion', 'GSAP', 'WebGL'],
      link: 'https://flow-orbital.vercel.app/'
  },
  {
      id: '4',
      title: 'Novaire',
      category: 'startup',
      sub: 'Luxury Restaurant & Fine Dining Experience',
      img: '/images/novaire.png',
      problem: 'Many restaurant websites fail to capture the elegance and atmosphere of fine dining experiences due to outdated interfaces, poor visual presentation, and lack of engaging digital interaction for customers.',
      solution: 'Designed and developed a modern restaurant platform featuring immersive food visuals, smooth animations, elegant UI design, responsive layouts, interactive menu experiences, and seamless reservation-focused navigation optimized for all devices.',
      impact: 'Created a premium digital dining experience that enhanced customer engagement, strengthened brand identity, improved online visibility, and delivered a visually sophisticated platform reflecting luxury hospitality standards.',
      stack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'GSAP', 'Vite'],
      link: 'https://novaire-restaurant-2rler6cnq-abhi-s-projects5152.vercel.app/'
  },
  {
      id: '5',
      title: 'Ethere',
      category: 'web',
      sub: 'Luxury Fashion & Editorial Experience',
      img: '/images/ethere.png',
      problem: 'Modern fashion websites often fail to capture the elegance, exclusivity, and emotional storytelling of luxury brands, resulting in generic shopping experiences with limited visual identity and user engagement.',
      solution: 'Designed and developed a premium fashion experience featuring minimalist white aesthetics, cinematic layouts, fluid animations, interactive transitions, editorial-style product showcases, and immersive storytelling inspired by modern luxury fashion houses.',
      impact: 'Created a visually sophisticated digital brand presence that enhanced customer engagement, elevated luxury perception, and delivered a seamless high-end browsing experience across desktop and mobile platforms.',
      stack: ['PyTorch', 'MONAI', 'FastAPI', 'AWS', 'DICOM'],
      link: 'https://ethere-by-arass.vercel.app/'
  },
  {
      id: '6',
      title: 'Voyage',
      category: 'web',
      sub: 'Futuristic Luxury Digital Experience',
      img: '/images/aethera.png',
      problem: 'Modern digital brands often struggle to create emotionally engaging experiences due to generic website designs, static interfaces, and lack of immersive visual storytelling that captures user attention and brand identity.',
      solution: 'Designed and developed a futuristic luxury-inspired web experience featuring cinematic animations, fluid transitions, interactive visual effects, immersive UI elements, and high-performance responsive architecture with a modern premium aesthetic.',
      impact: 'Created a visually captivating digital platform that enhanced user engagement, strengthened luxury brand perception, and delivered a seamless next-generation browsing experience across desktop and mobile devices.',
      stack: ['React', 'Next.js', 'Framer Motion', 'WebGL', 'GSAP'],
      link: 'https://aethera-by-arass.vercel.app/'
  }
];

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI Projects' },
  { id: 'web', label: 'Web Apps' },
  { id: 'startup', label: 'Startups' },
  { id: 'research', label: 'Research' }
];

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const selectedProject = projects.find((p) => p.id === selected);

  return (
    <section id="portfolio" className="relative section-padding" ref={ref}>
      <div className="container-custom">
        
        <div className="text-center flex flex-col items-center" style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#00C6FF', marginBottom: '24px' }}>Deployed Systems</p>
          <h2 style={{ fontWeight: 700, lineHeight: 1.15, background: 'linear-gradient(135deg, #fff 25%, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px', fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>Project Archive</h2>
          <p style={{ fontSize: '.95rem', color: '#8E8E93', maxWidth: '540px', margin: '0 auto', lineHeight: '1.8' }}>Real-world projects with measurable outcomes across AI, web, and startup ecosystems.</p>
        </div>

        {/* Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-20 md:mb-32" 
          initial={{ opacity: 0, y: 16 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {filters.map((f) => (
            <button 
              key={f.id} 
              onClick={() => setFilter(f.id)} 
              className={`filter-btn ${filter === f.id ? 'active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ marginTop: '100px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              transition={{ delay: i * 0.05, duration: 0.4 }} 
              key={project.title}
              layoutId={`project-${project.title}`}
              className="proj-card"
              onClick={() => setSelected(project.id)}
            >
              <div 
                className="proj-img"
                style={{ backgroundImage: `url(${project.img})` }}
              />

              <div className="proj-overlay">
                <span className="proj-sub">{project.sub}</span>
                <h4 className="proj-title">{project.title}</h4>
                <p className="proj-desc">{project.problem}</p>
                <div className="proj-tags">
                  {project.stack.slice(0, 3).map((t) => (
                    <span key={t} className="proj-tag">{t}</span>
                  ))}
                </div>
                <div className="proj-cta">
                  <span className="proj-cta-text">View Details</span>
                  <i className="fas fa-arrow-right proj-cta-icon"></i>
                </div>
              </div>
            </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[8000] flex items-end sm:items-center justify-center sm:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
            
            <motion.div 
              className="modal-card w-full max-w-[680px] max-h-[80vh] overflow-y-auto sm:rounded-2xl rounded-t-2xl"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
              initial={{ scale: 0.97, y: 40 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.97, y: 40 }} 
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div 
                className="modal-img" 
                style={{ backgroundImage: `url(${selectedProject.img})` }} 
              >
                <button className="modal-close" onClick={() => setSelected(null)}>
                    <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-badge">{selectedProject.category}</div>
                
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-sub">{selectedProject.sub}</p>
                
                <div className="modal-cols">
                  <div>
                    <div className="modal-col-label">Problem</div>
                    <p className="modal-col-text">{selectedProject.problem}</p>
                  </div>
                  <div>
                    <div className="modal-col-label">Solution</div>
                    <p className="modal-col-text">{selectedProject.solution}</p>
                  </div>
                  <div>
                    <div className="modal-col-label">Impact</div>
                    <p className="modal-col-text">{selectedProject.impact}</p>
                  </div>
                </div>

                <div className="modal-stack">
                  {selectedProject.stack.map((t) => (
                    <span key={t} className="stack-tag">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="btn-live"
                    onClick={() => {
                      if (selectedProject.link && selectedProject.link.startsWith('http')) {
                        window.open(selectedProject.link, '_blank');
                      }
                    }}
                  >
                    <i className="fas fa-external-link-alt"></i>
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
