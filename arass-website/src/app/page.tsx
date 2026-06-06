'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store/useAppStore';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navigation from '@/components/ui/Navigation';
import CustomCursor from '@/components/ui/CustomCursor';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';

import TrustSection from '@/components/sections/TrustSection';
import BookingSection from '@/components/sections/BookingSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';

const GlobalScene = dynamic(() => import('@/components/3d/GlobalScene'), { ssr: false });
const AIAssistant = dynamic(() => import('@/components/modules/AIAssistant'), { ssr: false });

export default function HomePage() {
  const { mode, isLoading, toggleDevMode, setActiveSection } = useAppStore();
  useSmoothScroll();

  // Secret dev mode: Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        toggleDevMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDevMode]);

  // Intersection Observer for active section tracking
    useEffect(() => {
      const sections = ['hero', 'about', 'services', 'contact', 'booking'];
      const observers: IntersectionObserver[] = [];
  
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setActiveSection(id as any);
            }
          },
          { threshold: 0.3 }
        );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isLoading, setActiveSection]);

  return (
    <div data-mode={mode} className="relative w-full overflow-hidden">
      {/* 3D Background / ARASS Model */}
      <GlobalScene />

      <LoadingScreen />
      <CustomCursor />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />

        <TrustSection />
        <ContactSection />
        <BookingSection />
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
