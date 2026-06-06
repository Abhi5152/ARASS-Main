'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const services = [
    {
        icon: 'fas fa-brain',
        title: 'AI & Machine Learning',
        desc: 'Custom AI models, NLP pipelines, computer vision systems, and intelligent automation that learn and adapt to your business needs.',
        features: [
            'Deep Learning & Neural Networks',
            'Natural Language Processing',
            'Computer Vision Solutions',
            'MLOps & Model Deployment',
            'Predictive Analytics Engines'
        ]
    },
    {
        icon: 'fas fa-code',
        title: 'Web & App Development',
        desc: 'High-performance web and mobile applications built with modern frameworks, optimized for speed, scalability, and user delight.',
        features: [
            'React / Next.js Applications',
            'Progressive Web Apps',
            'Native Mobile Development',
            'API Design & Microservices',
            'Performance Optimization'
        ]
    },
    {
        icon: 'fas fa-chart-bar',
        title: 'Data Intelligence',
        desc: 'Transform raw data into actionable intelligence with real-time dashboards, ETL pipelines, and advanced analytics architectures.',
        features: [
            'Real-Time Data Pipelines',
            'Business Intelligence Dashboards',
            'Data Lake Architecture',
            'ETL Processing & Engineering',
            'Data Governance & Quality'
        ]
    },
    {
        icon: 'fas fa-cogs',
        title: 'Automation & SaaS',
        desc: 'End-to-end SaaS product development and workflow automation that eliminates manual processes and scales effortlessly.',
        features: [
            'SaaS Product Development',
            'Workflow Engine Design',
            'CI/CD Pipeline Automation',
            'Infrastructure as Code',
            'Multi-Tenant Architecture'
        ]
    }
];

export default function ServicesSection() {
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        return () => {};
    }, []);

    // For Esc key handling
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedService(null);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    // Lock body scroll when modal open
    useEffect(() => {
        if (selectedService !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [selectedService]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .services-wrapper { --deep: #1C1C1E; --dark: #2A2A2D; --silver: #C0C0C0; --bs: #007BFF; --be: #00C6FF; --neon: #00C6FF; --tp: #EAEAEC; --ts: #8E8E93; }
                .sec-label { font-size: .6rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--neon); }
                .sec-title { font-weight: 700; line-height: 1.15; background: linear-gradient(135deg, #fff 25%, var(--silver)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

                .glass2 { background: rgba(28,28,30,.88); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(192,192,192,.1); }

                .svc-card { border-radius: 20px; padding: 28px; border: 1px solid rgba(192,192,192,.06); background: #2A2A2D; transition: all .4s cubic-bezier(.22,1,.36,1); position: relative; overflow: hidden; }
                .svc-card:hover { border-color: rgba(0,198,255,.2); box-shadow: 0 8px 40px rgba(0,198,255,.1), 0 0 1px 0 rgba(0,198,255,.15); transform: translateY(-6px); }
                .svc-ico { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(0,123,255,.1), rgba(0,198,255,.05)); border: 1px solid rgba(0,198,255,.15); font-size: 1.3rem; color: var(--neon); transition: all .35s; position: relative; z-index: 1; }
                .svc-card:hover .svc-ico { box-shadow: 0 0 20px rgba(0,198,255,.25); border-color: rgba(0,198,255,.3); }
                .svc-explore { font-size: .6rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--neon); position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 6px; transition: all .3s; padding: 4px 0; margin-top: 4px; }
                .svc-explore i { font-size: .5rem; transition: transform .3s; }
                .svc-card:hover .svc-explore i { transform: translateX(4px); }
                .svc-card::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--neon), transparent); opacity: 0; transition: opacity .4s; z-index: 0; }
                .svc-card:hover::before { opacity: 1; }
                .modal-bg { position: fixed; inset: 0; z-index: 8000; background: rgba(0,0,0,.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); opacity: 0; visibility: hidden; transition: all .4s ease; display: flex; align-items: flex-end; justify-content: center; padding: 0; }
                @media (min-width: 640px) { .modal-bg { align-items: center; padding: 20px; } }
                .modal-bg.on { opacity: 1; visibility: visible; }
                .modal-in { width: 100%; max-width: 640px; max-height: 92vh; transform: translateY(25px) scale(.97); transition: transform .4s cubic-bezier(.22,1,.36,1); border-radius: 20px 20px 0 0; }
                @media (min-width: 640px) { .modal-in { border-radius: 20px; } }
                .modal-bg.on .modal-in { transform: translateY(0) scale(1); }
                .modal-content-scroll { overflow-y: auto; max-height: calc(90vh - 40px); }
                .feat-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(192,192,192,.06); }
                .feat-item:last-child { border-bottom: none; }
                .feat-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, var(--bs), var(--neon)); flex-shrink: 0; margin-top: 4px; box-shadow: 0 0 8px rgba(0,198,255,.2); }


            `}} />



            <section className="services-wrapper" style={{ padding: '80px 0' }} id="services" ref={containerRef}>
                <div className="container-custom" style={{ maxWidth: '1100px' }}>
                    <div className="text-center flex flex-col items-center" style={{ marginBottom: '80px' }}>
                        <p className="sec-label" style={{ marginBottom: '24px' }}>Core Systems</p>
                        <h2 className="sec-title text-3xl sm:text-4xl md:text-5xl" style={{ marginBottom: '32px' }}>Capabilities</h2>
                        <p style={{ fontSize: '.95rem', color: 'var(--ts)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.8' }}>
                            End-to-end technology services designed for scale, performance, and real-world impact.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" id="svcGrid">
                        {services.map((svc, i) => (
                            <div 
                                key={i} 
                                className="svc-card" 
                                style={{ transitionDelay: `${i * 0.08}s` }}
                                onMouseEnter={() => document.getElementById('cursorDot')?.classList.add('mo')}
                                onMouseLeave={() => document.getElementById('cursorDot')?.classList.remove('mo')}
                                onClick={() => setSelectedService(i)}
                            >
                                <div className="svc-ico" style={{ marginBottom: '24px' }}>
                                    <i className={svc.icon}></i>
                                </div>
                                <h3 className="text-sm font-semibold mb-3" style={{ position: 'relative', zIndex: 1, lineHeight: '1.3' }}>
                                    {svc.title}
                                </h3>
                                <p style={{ fontSize: '.78rem', color: 'rgba(192,192,192,.45)', lineHeight: '1.75', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                                    {svc.desc}
                                </p>
                                <div className="svc-explore">
                                    EXPLORE <i className="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div 
                className={`modal-bg ${selectedService !== null ? 'on' : ''}`} 
                id="svcModal"
                onClick={(e) => {
                    if (e.target === e.currentTarget) setSelectedService(null);
                }}
            >
                <div className="modal-in">
                    <div className="glass2 modal-content-scroll" style={{ borderRadius: '20px', padding: '36px', position: 'relative', overflowX: 'hidden', overflowY: 'auto' }}>

                        <button 
                            onClick={() => setSelectedService(null)} 
                            style={{ 
                                position: 'relative', zIndex: 1, float: 'right', width: '36px', height: '36px', 
                                borderRadius: '50%', background: 'rgba(0,0,0,.3)', backdropFilter: 'blur(8px)', 
                                border: '1px solid rgba(192,192,192,.1)', color: 'rgba(255,255,255,.5)', 
                                fontSize: '.75rem', display: 'flex', alignItems: 'center', 
                                justifyContent: 'center', transition: 'all .25s' 
                            }} 
                            aria-label="Close" 
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,198,255,.15)'; e.currentTarget.style.color = '#fff'; document.getElementById('cursorDot')?.classList.add('mo'); }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,.3)'; e.currentTarget.style.color = 'rgba(255,255,255,.5)'; document.getElementById('cursorDot')?.classList.remove('mo'); }}
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        {selectedService !== null && (
                            <>
                                <div className="svc-ico mb-5" style={{ position: 'relative', zIndex: 1 }}>
                                    <i className={services[selectedService].icon} style={{ fontSize: '1.4rem' }}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-orbitron)' }}>
                                    {services[selectedService].title}
                                </h3>
                                <p style={{ fontSize: '.85rem', color: 'rgba(192,192,192,.5)', lineHeight: '1.7', margin: '0 0 24px', position: 'relative', zIndex: 1 }}>
                                    {services[selectedService].desc}
                                </p>
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    {services[selectedService].features.map((f, idx) => (
                                        <div key={idx} className="feat-item">
                                            <div className="feat-dot"></div>
                                            <span style={{ fontSize: '.8rem', color: 'rgba(192,192,192,.5)', lineHeight: '1.5' }}>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

