'use client';

import { useRef, useState } from 'react';

export default function ContactSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .contact-wrapper { --deep: #1C1C1E; --dark: #2A2A2D; --silver: #C0C0C0; --bs: #007BFF; --be: #00C6FF; --neon: #00C6FF; --tp: #EAEAEC; --ts: #8E8E93; }
                .sec-label { font-size: .6rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--neon); }
                .sec-title { font-weight: 700; line-height: 1.15; background: linear-gradient(135deg, #fff 25%, var(--silver)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }


                .svc-card { border-radius: 20px; padding: 36px; border: 1px solid rgba(192,192,192,.06); background: #2A2A2D; transition: all .4s cubic-bezier(.22,1,.36,1); position: relative; overflow: hidden; }
                .svc-card:hover { border-color: rgba(0,198,255,.2); box-shadow: 0 8px 40px rgba(0,198,255,.1), 0 0 1px 0 rgba(0,198,255,.15); transform: translateY(-6px); }
                .svc-card::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--neon), transparent); opacity: 0; transition: opacity .4s; z-index: 0; }
                .svc-card:hover::before { opacity: 1; }

                .contact-input { width: 100%; background: rgba(0,0,0,.2); border: 1px solid rgba(192,192,192,.1); border-radius: 12px; padding: 14px 16px; color: #fff; font-size: .85rem; transition: all .3s; position: relative; z-index: 1; outline: none; }
                .contact-input:focus { border-color: rgba(0,198,255,.4); box-shadow: 0 0 15px rgba(0,198,255,.1); background: rgba(0,0,0,.4); }
                .contact-input::placeholder { color: rgba(192,192,192,.3); }
                
                .svc-ico { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(0,123,255,.1), rgba(0,198,255,.05)); border: 1px solid rgba(0,198,255,.15); font-size: 1.3rem; color: var(--neon); transition: all .35s; position: relative; z-index: 1; }
                .svc-card:hover .svc-ico { box-shadow: 0 0 20px rgba(0,198,255,.25); border-color: rgba(0,198,255,.3); }

                .social-btn { background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.05); border-radius: 12px; padding: 10px; text-align: center; color: var(--ts); font-size: .75rem; font-weight: 600; transition: all .3s; position: relative; z-index: 1; text-transform: uppercase; letter-spacing: 1px; }
                .social-btn:hover { background: rgba(0,198,255,.1); border-color: rgba(0,198,255,.3); color: var(--neon); box-shadow: 0 0 15px rgba(0,198,255,.15); }
            `}} />

            <section className="contact-wrapper w-full flex justify-center" style={{ padding: '140px 24px' }} id="contact" ref={containerRef}>
                <div className="w-full" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="text-center flex flex-col items-center w-full" style={{ marginBottom: '80px' }}>
                        <p className="sec-label" style={{ marginBottom: '24px' }}>Contact</p>
                        <h2 className="sec-title text-3xl sm:text-4xl md:text-5xl" style={{ marginBottom: '32px' }}>Let&apos;s Connect</h2>
                        <p style={{ fontSize: '.95rem', color: 'var(--ts)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.8' }}>
                            Ready to build something extraordinary? Reach out to us.
                        </p>
                    </div>

                    <div className="flex justify-center w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full" style={{ maxWidth: '850px', gap: '32px' }}>
                        
                        {/* Contact Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="svc-card" data-cursor="CONNECT" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                {[
                                    { icon: 'fas fa-envelope', label: 'Email', value: 'official.arass@gmail.com', href: 'mailto:official.arass@gmail.com' },
                                    { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Global — Remote First', href: '#' },
                                    { icon: 'fas fa-rocket', label: 'Availability', value: 'Open for projects', href: '#' },
                                ].map((item) => (
                                    <a key={item.label} href={item.href} className="group text-center" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                                        <div className="svc-ico">
                                            <i className={item.icon}></i>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium mb-1 uppercase tracking-wider" style={{ color: 'var(--ts)' }}>{item.label}</p>
                                            <p className="text-sm font-semibold transition-colors" style={{ color: '#EAEAEC' }}>{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Social & Direct Contact */}
                            <div className="svc-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <a
                                    href="https://wa.me/91XXXXXXXXXX"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-white font-bold transition-all duration-300"
                                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 8px 24px rgba(37,211,102,0.2)', position: 'relative', zIndex: 1 }}
                                    data-cursor="WHATSAPP"
                                >
                                    <i className="fab fa-whatsapp text-xl"></i> Chat on WhatsApp
                                </a>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {['Facebook', 'Twitter', 'LinkedIn', 'Discord'].map((social) => (
                                        <a key={social} href="#" className="social-btn" data-cursor={social.toUpperCase()}>
                                            {social}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form 
                            onSubmit={handleSubmit} 
                            className="svc-card flex flex-col"
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
                                {[
                                    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Alex Carter' },
                                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'alex.c@example.com' },
                                ].map((field) => (
                                    <div key={field.name} style={{ position: 'relative', zIndex: 1 }}>
                                        <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--ts)' }}>{field.label}</label>
                                        <input 
                                            type={field.type} 
                                            placeholder={field.placeholder} 
                                            value={formData[field.name as keyof typeof formData]} 
                                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })} 
                                            className="contact-input" 
                                            required 
                                        />
                                    </div>
                                ))}
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--ts)' }}>Message</label>
                                    <textarea 
                                        placeholder="Tell us about your project..." 
                                        rows={5} 
                                        value={formData.message} 
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                                        className="contact-input resize-none" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <button type="submit" className="w-full mt-8 py-4 rounded-xl font-bold tracking-widest uppercase transition-all" style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(135deg, #007BFF, #00C6FF)', color: '#fff', border: 'none', boxShadow: '0 8px 24px rgba(0,198,255,.2)' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,198,255,.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,198,255,.2)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                                {submitted ? '✓ Message Sent!' : 'Send Message'}
                            </button>
                        </form>

                    </div>
                    </div>
                </div>
            </section>
        </>
    );
}
