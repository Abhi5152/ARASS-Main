'use client';

import { ReactNode, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store/useAppStore';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Navigation from '@/components/ui/Navigation';
import CustomCursor from '@/components/ui/CustomCursor';
import Footer from '@/components/ui/Footer';
import LoadingScreen from '@/components/ui/LoadingScreen';

const AIAssistant = dynamic(() => import('@/components/modules/AIAssistant'), { ssr: false });

interface SEOPageLayoutProps {
  children: ReactNode;
}

export default function SEOPageLayout({ children }: SEOPageLayoutProps) {
  const { mode, toggleDevMode } = useAppStore();
  useSmoothScroll();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        toggleDevMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDevMode]);

  return (
    <div data-mode={mode} className="relative w-full overflow-hidden min-h-screen flex flex-col bg-black text-white">
      <LoadingScreen />
      <CustomCursor />
      <Navigation />

      <main className="relative z-10 flex-grow pt-32 pb-20 px-6 md:px-12 lg:px-24">
        {children}
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
