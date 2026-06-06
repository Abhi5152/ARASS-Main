'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { useAppStore } from '@/store/useAppStore';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import dynamic from 'next/dynamic';
import PortfolioSection from '@/components/sections/PortfolioSection';

// Dynamically import the 3D scene with no SSR to avoid hydration issues with Three.js
const WorksScene = dynamic(() => import('@/components/3d/WorksScene'), { ssr: false });
const AIAssistant = dynamic(() => import('@/components/modules/AIAssistant'), { ssr: false });

export default function WorksPage() {
  const { mode } = useAppStore();
  useSmoothScroll();

  return (
    <div data-mode={mode} className="relative w-full overflow-hidden min-h-screen flex flex-col">
      <CustomCursor />
      
      {/* Navigation is absolute to float over the 3D scene initially */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navigation isStatic />
      </div>
      
      <main className="flex-grow flex flex-col">
        {/* 
          3D Showcase Section
          We give it a fixed height equivalent to the ScrollControls pages.
          WorksScene is inside a sticky container so it stays in view while we scroll through the 4 pages.
        */}
        <section className="relative h-[100vh]">
          <div className="w-full h-full">
            <WorksScene />
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50">
              <span className="text-xs tracking-widest uppercase font-bold text-white">Scroll to Explore</span>
              <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <PortfolioSection />



      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
}
