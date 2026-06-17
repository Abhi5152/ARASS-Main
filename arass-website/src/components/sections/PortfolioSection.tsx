'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface PortfolioProject {
  id: number | string;
  title: string;
  slug: string;
  category: string;
  sub: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  thumbnail: string;
  project_url: string;
}

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
  const [selected, setSelected] = useState<number | string | null>(null);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : 'https://api.arass.tech';

  const resolveImgUrl = (thumb: string) => {
    if (!thumb) return '';
    if (thumb.startsWith('http')) return thumb;
    if (thumb.startsWith('/images/')) return thumb;
    return `${API_URL}${thumb.startsWith('/') ? '' : '/'}${thumb}`;
  };

  useEffect(() => {
    fetch(`${API_URL}/api/v1/portfolio/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching portfolio:', err);
        setLoading(false);
      });
  }, [API_URL]);

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

        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-[#00C6FF]/30 border-t-[#00C6FF] rounded-full animate-spin"></div>
              <span style={{ fontSize: '.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#8E8E93' }}>Loading projects...</span>
            </div>
          </div>
        ) : (
          /* Grid */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ marginTop: '100px' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => {
                const imgUrl = resolveImgUrl(project.thumbnail);
                  
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }} 
                    transition={{ delay: i * 0.05, duration: 0.4 }} 
                    key={project.id}
                    layoutId={`project-${project.id}`}
                    className="proj-card"
                    onClick={() => setSelected(project.id)}
                  >
                    <div 
                      className="proj-img"
                      style={{ backgroundImage: `url(${imgUrl})` }}
                    />

                    <div className="proj-overlay">
                      <span className="proj-sub">{project.sub}</span>
                      <h4 className="proj-title">{project.title}</h4>
                      <p className="proj-desc">{project.problem}</p>
                      <div className="proj-tags">
                        {project.stack && project.stack.slice(0, 3).map((t) => (
                          <span key={t} className="proj-tag">{t}</span>
                        ))}
                      </div>
                      <div className="proj-cta">
                        <span className="proj-cta-text">View Details</span>
                        <i className="fas fa-arrow-right proj-cta-icon"></i>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

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
              layoutId={`project-${selectedProject.id}`}
            >
              <div 
                className="modal-img" 
                style={{ 
                  backgroundImage: `url(${resolveImgUrl(selectedProject.thumbnail)})` 
                }} 
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
                  {selectedProject.stack && selectedProject.stack.map((t) => (
                    <span key={t} className="stack-tag">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="modal-actions">
                  {selectedProject.project_url && (
                    <button 
                      className="btn-live"
                      onClick={() => {
                        if (selectedProject.project_url && selectedProject.project_url.startsWith('http')) {
                          window.open(selectedProject.project_url, '_blank');
                        }
                      }}
                    >
                      <i className="fas fa-external-link-alt"></i>
                      <span>Live Demo</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
