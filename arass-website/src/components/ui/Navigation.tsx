'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
  { label: 'Home', section: 'hero' as const },
  { label: 'Services', section: 'services' as const },
  { label: 'Contact', section: 'contact' as const },
];

export default function Navigation({ isStatic = false }: { isStatic?: boolean }) {
  const { activeSection, toggleAssistant } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (section: string) => {
    if (pathname !== '/') {
      router.push(`/#${section}`);
      setIsMobileOpen(false);
      return;
    }
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`${isStatic ? 'relative z-[100] bg-transparent pt-6 pb-2' : 'fixed top-0 left-0 right-0 z-[100]'} transition-all duration-300 ${!isStatic && isScrolled ? 'glass-strong' : ''}`}
        style={{ paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}
        initial={isStatic ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        transition={isStatic ? { duration: 0 } : { delay: 3.2, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="container-custom flex items-center justify-between h-16 px-6 lg:px-8">
          
          {/* Logo */}
          <motion.a
            href="/"
            onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
            className="flex items-center group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-black tracking-widest uppercase gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
              ARASS
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollTo(item.section)}
                className={`filter-btn uppercase tracking-widest !font-bold ${isHomePage && activeSection === item.section ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <a 
              href="/works" 
              className={`filter-btn uppercase tracking-widest !font-bold ${pathname === '/works' ? 'active' : ''}`}
            >
              Portfolio
            </a>
            <a 
              href="/templates" 
              className={`filter-btn uppercase tracking-widest !font-bold ${pathname === '/templates' ? 'active' : ''}`}
            >
              Templates
            </a>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Book Button */}
            <button 
              className={`filter-btn tracking-widest !font-bold ${isHomePage && activeSection === 'booking' ? 'active' : ''}`}
              onClick={() => scrollTo('booking')}
            >
              Book
            </button>


          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-3 rounded-xl -mr-1"
            style={{ minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              className="w-6 h-0.5 rounded-full bg-white origin-left"
              animate={{ rotate: isMobileOpen ? 45 : 0 }}
            />
            <motion.div
              className="w-6 h-0.5 rounded-full bg-white"
              animate={{ opacity: isMobileOpen ? 0 : 1 }}
            />
            <motion.div
              className="w-6 h-0.5 rounded-full bg-white origin-left"
              animate={{ rotate: isMobileOpen ? -45 : 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-[var(--color-bg-primary)]/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)', paddingTop: 'env(safe-area-inset-top)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.section}
                onClick={() => scrollTo(item.section)}
                className={`text-3xl font-bold tracking-widest uppercase ${isHomePage && activeSection === item.section ? 'gradient-text' : ''}`}
                style={{ fontFamily: 'var(--font-heading)', color: isHomePage && activeSection === item.section ? undefined : 'var(--color-text-primary)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              href="/works"
              className="text-3xl font-bold tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
            >
              Portfolio
            </motion.a>
            <motion.a
              href="/templates"
              className="text-3xl font-bold tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navItems.length + 1) * 0.05 }}
            >
              Templates
            </motion.a>
            <motion.button
              onClick={() => { toggleAssistant(); setIsMobileOpen(false); }}
              className="mt-8 btn-primary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              AI Assistant
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
