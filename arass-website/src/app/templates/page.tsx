'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import TemplateGallery from '@/components/sections/TemplateGallery';
import { useAppStore } from '@/store/useAppStore';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import dynamic from 'next/dynamic';

const GlobalScene = dynamic(() => import('@/components/3d/GlobalScene'), { ssr: false });

const AIAssistant = dynamic(() => import('@/components/modules/AIAssistant'), { ssr: false });

export default function TemplatesPage() {
  const { mode } = useAppStore();
  useSmoothScroll();

  return (
    <div data-mode={mode} className="relative w-full overflow-hidden min-h-screen flex flex-col">
      <GlobalScene hideLogo />
      
      <CustomCursor />
      <Navigation isStatic />
      
      <main className="pt-14 md:pt-20 flex-grow relative z-10">
        <TemplateGallery />
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
}
