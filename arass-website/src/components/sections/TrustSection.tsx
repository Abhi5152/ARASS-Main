'use client';

import { useEffect, useRef } from 'react';

const stats = [
  { label: 'Projects Delivered', value: '150+', icon: 'fas fa-rocket' },
  { label: 'Global Clients', value: '45+', icon: 'fas fa-globe' },
  { label: 'Technologies', value: '25+', icon: 'fas fa-code-branch' },
  { label: 'Client Retention', value: '98%', icon: 'fas fa-handshake' },
];

const testimonials = [
  { name: 'Sarah J.', role: 'CEO, TechStart', text: 'ARASS Tech completely transformed our SaaS platform. The UI is breathtaking and conversions are up 40%.' },
  { name: 'Michael R.', role: 'Founder, AI Solutions', text: 'Their understanding of modern AI integration and 3D web experiences is unmatched. True professionals.' },
  { name: 'Elena K.', role: 'Product Lead, FinTech', text: 'Fast delivery, crystal clear communication, and an end product that feels straight out of the future.' }
];

export default function TrustSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animations removed
    }, []);

    const handleMouseEnter = () => document.getElementById('cursorDot')?.classList.add('mo');
    const handleMouseLeave = () => document.getElementById('cursorDot')?.classList.remove('mo');

    return (
        <>
            {/* Using the same CSS from the Services section for consistency */}
            <style dangerouslySetInnerHTML={{ __html: `
                .trust-wrapper { --deep: #1C1C1E; --dark: #2A2A2D; --silver: #C0C0C0; --bs: #007BFF; --be: #00C6FF; --neon: #00C6FF; --tp: #EAEAEC; --ts: #8E8E93; }
                .sec-label { font-size: .6rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--neon); }
                .sec-title { font-weight: 700; line-height: 1.15; background: linear-gradient(135deg, #fff 25%, var(--silver)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

                .svc-card { border-radius: 20px; padding: 36px; border: 1px solid rgba(192,192,192,.06); background: #2A2A2D; transition: all .4s cubic-bezier(.22,1,.36,1); position: relative; overflow: hidden; }
                .svc-card:hover { border-color: rgba(0,198,255,.2); box-shadow: 0 8px 40px rgba(0,198,255,.1), 0 0 1px 0 rgba(0,198,255,.15); transform: translateY(-6px); }
                .svc-card::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--neon), transparent); opacity: 0; transition: opacity .4s; z-index: 0; }
                .svc-card:hover::before { opacity: 1; }
            `}} />

            <section className="trust-wrapper" style={{ padding: '140px 24px' }} id="trustSection" ref={containerRef}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="text-center flex flex-col items-center" style={{ marginBottom: '80px' }}>
                        <p className="sec-label" style={{ marginBottom: '24px' }}>Trust & Impact</p>
                        <h2 className="sec-title text-3xl sm:text-4xl md:text-5xl" style={{ marginBottom: '32px' }}>Built on Excellence</h2>
                        <p style={{ fontSize: '.95rem', color: 'var(--ts)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.8' }}>
                            Don&apos;t just take our word for it. Here&apos;s what we&apos;ve achieved together.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '24px' }}>
                            {stats.map((stat, i) => (
                                <div 
                                    key={stat.label} 
                                    className="svc-card flex flex-col items-center justify-center text-center"
                                    style={{ transitionDelay: `${i * 0.08}s`, padding: '36px 20px' }}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <h3 className="text-3xl md:text-4xl font-bold" style={{ position: 'relative', zIndex: 1, color: '#EAEAEC', marginBottom: '12px' }}>
                                        {stat.value}
                                    </h3>
                                    <p style={{ fontSize: '.65rem', color: 'var(--neon)', letterSpacing: '1px', textTransform: 'uppercase', position: 'relative', zIndex: 1, fontWeight: 600 }}>
                                        <i className={`${stat.icon} mr-2`}></i>{stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Testimonials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
                            {testimonials.map((test, i) => (
                                <div 
                                    key={test.name} 
                                    className="svc-card flex flex-col justify-between" 
                                    style={{ transitionDelay: `${0.2 + i * 0.08}s` }}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div style={{ position: 'relative', zIndex: 1, marginBottom: '24px' }}>
                                        <i className="fas fa-quote-left mb-4" style={{ fontSize: '1.4rem', color: 'rgba(0,198,255,.3)' }}></i>
                                        <p style={{ fontSize: '.85rem', color: 'rgba(192,192,192,.6)', lineHeight: '1.7', fontStyle: 'italic' }}>
                                            &quot;{test.text}&quot;
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 pt-5 border-t border-[rgba(192,192,192,0.06)]" style={{ position: 'relative', zIndex: 1 }}>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: 'linear-gradient(135deg, rgba(0,123,255,.2), rgba(0,198,255,.1))', border: '1px solid rgba(0,198,255,.15)', color: 'var(--neon)' }}>
                                            {test.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs" style={{ color: '#EAEAEC' }}>{test.name}</h4>
                                            <p style={{ fontSize: '.65rem', color: 'var(--ts)', marginTop: '2px' }}>{test.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
