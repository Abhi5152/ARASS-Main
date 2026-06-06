'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CustomCursor from '@/components/ui/CustomCursor';
import Link from 'next/link';

interface Template {
  title: string;
  live_preview_url: string;
  category: string;
}

export default function TemplatePreview() {
  const params = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    // In dev, point to local Django server
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${API_URL}/api/v1/templates/${params.slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Template not found');
        return res.json();
      })
      .then((data) => {
        setTemplate(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col bg-[#050505] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#00C6FF]/30 border-t-[#00C6FF] rounded-full animate-spin"></div>
          <span style={{ fontSize: '.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#8E8E93' }}>Loading preview...</span>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="h-screen w-full flex flex-col bg-[#050505] items-center justify-center">
        <div style={{ borderRadius: '20px', border: '2px dashed rgba(192,192,192,.08)', background: 'rgba(42,42,45,.4)', padding: '60px 40px', textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(0,123,255,.08), rgba(0,198,255,.04))', border: '1px solid rgba(0,198,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#00C6FF', fontSize: '1.4rem' }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h1 className="text-xl font-bold mb-3 text-[#EAEAEC]">Template Not Found</h1>
          <p className="text-[#8E8E93] text-sm mb-6">The template you are looking for does not exist or has been removed.</p>
          <button 
            onClick={() => router.push('/templates')} 
            style={{ padding: '10px 24px', borderRadius: '10px', background: 'linear-gradient(135deg, #007BFF, #00C6FF)', color: '#fff', fontSize: '.7rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}
          >
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  const getWidth = () => {
    if (device === 'mobile') return 'max-w-[375px]';
    if (device === 'tablet') return 'max-w-[768px]';
    return 'w-full';
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0a0a] overflow-hidden">
      <CustomCursor />
      
      {/* Top Navigation Bar */}
      <div className="h-16 bg-[#1a1a1a] border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/templates')}
            className="text-sm font-semibold text-white/70 hover:text-white flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Back
          </button>
          <div className="h-6 w-px bg-white/20 hidden md:block"></div>
          <span className="text-white font-bold hidden md:block">ARASS Tech Preview</span>
          <span className="text-white/50 text-sm hidden lg:block">- {template.title}</span>
        </div>

        {/* Device Toggles */}
        <div className="hidden md:flex bg-black/50 rounded-lg p-1 border border-white/5">
          <button 
            onClick={() => setDevice('desktop')}
            className={`p-2 rounded md:w-10 flex justify-center transition-colors ${device === 'desktop' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <i className="fa-solid fa-desktop"></i>
          </button>
          <button 
            onClick={() => setDevice('tablet')}
            className={`p-2 rounded md:w-10 flex justify-center transition-colors ${device === 'tablet' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <i className="fa-solid fa-tablet-screen-button"></i>
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={`p-2 rounded md:w-10 flex justify-center transition-colors ${device === 'mobile' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <i className="fa-solid fa-mobile-screen-button"></i>
          </button>
        </div>

        <div>
          <Link href="/#booking" className="filter-btn active tracking-widest !font-bold" style={{ padding: '8px 24px' }}>
            Purchase Template
          </Link>
        </div>
      </div>

      {/* Iframe Viewer */}
      <div className="flex-1 w-full bg-[#050505] flex items-center justify-center p-0 md:p-6 lg:p-8 overflow-hidden relative min-h-0">
        <div className={`relative flex flex-col transition-all duration-500 ease-in-out ${getWidth()} h-full shadow-[0_0_50px_rgba(0,0,0,0.5)] md:rounded-xl border border-white/5 overflow-hidden bg-white ring-1 ring-white/10`}>
          {/* Optional browser-like top bar for desktop mode */}
          {device === 'desktop' && (
            <div className="h-8 bg-[#f1f1f1] border-b border-gray-200 hidden md:flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
          )}
          <iframe 
            src={template.live_preview_url} 
            className="w-full h-full border-none flex-1 bg-white"
            title={`${template.title} Live Preview`}
          />
        </div>
      </div>
    </div>
  );
}
