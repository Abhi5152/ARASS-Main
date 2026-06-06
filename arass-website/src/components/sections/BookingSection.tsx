'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitBooking } from '@/app/actions/booking';

const services = ['Web Development', 'AI Solutions', 'SaaS Development', 'UI/UX Design'];
const packages = [
  { name: 'Basic', desc: 'Essential features to get started quickly.' },
  { name: 'Standard', desc: 'Advanced features and custom integrations.' },
  { name: 'Premium', desc: 'Full-scale enterprise solutions.' }
];

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', date: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDevMode, setIsDevMode] = useState(false);

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Client-side validation to ensure all fields are completely filled out
    if (!selectedService || !selectedPackage) {
      setError('Please select a service and booking tier first.');
      return;
    }
    if (!formData.name.trim() || !formData.email.trim() || !formData.date || !formData.details.trim()) {
      setError('Please fill out all fields (Name, Email, Target Date, and Project Specifics) before completing.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitBooking({
        name: formData.name,
        email: formData.email,
        service: selectedService,
        packageTier: selectedPackage,
        date: formData.date,
        details: formData.details
      });

      if (res.success) {
        setIsDevMode(!!res.devMode);
        setIsSuccess(true);
      } else {
        setError(res.error || 'Failed to complete booking. Please try again.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative" style={{ padding: '80px 0' }}>
        <style dangerouslySetInnerHTML={{ __html: `
            .booking-card { border-radius: 20px; padding: 28px; border: 1px solid rgba(192,192,192,.06); background: #2A2A2D; position: relative; overflow: hidden; }
            @media (min-width: 640px) { .booking-card { padding: 36px; } }
            .booking-step-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.1); transition: all 0.3s; }
            .booking-step-dot.active { background: #00C6FF; box-shadow: 0 0 10px #00C6FF; }
            .opt-btn { width: 100%; padding: 16px; min-height: 56px; border-radius: 12px; border: 1px solid rgba(192,192,192,0.06); background: rgba(255,255,255,0.02); text-align: left; transition: all 0.3s; color: #8E8E93; }
            .opt-btn.active { border-color: #00C6FF; background: rgba(0,198,255,0.05); color: #fff; }
            .booking-input { width: 100%; padding: 14px; min-height: 52px; border-radius: 10px; border: 1px solid rgba(192,192,192,0.1); background: rgba(0,0,0,0.2); color: #fff; outline: none; transition: border-color 0.3s; font-size: 16px; }
            .booking-input:focus { border-color: #00C6FF; }
        `}} />

      <div className="w-full flex justify-center px-6 md:px-8">
        <div className="w-full" style={{ maxWidth: '800px' }}>
          {/* Header */}
          <div className="text-center flex flex-col items-center" style={{ marginBottom: '64px' }}>
            <p className="sec-label" style={{ color: '#00C6FF', marginBottom: '24px' }}>Secure Your Spot</p>
            <h2 className="sec-title" style={{ background: 'linear-gradient(135deg, #fff 25%, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Book a Project</h2>
            <p style={{ fontSize: '.95rem', color: '#8E8E93', maxWidth: '540px', margin: '0 auto', lineHeight: '1.8' }}>Ready to transform your vision into reality? Follow our streamlined booking process to get started.</p>
          </div>

        <div className="booking-card">
          {!isSuccess ? (
            <>
              {/* Progress */}
              <div className="flex items-center justify-center gap-4 mb-10">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`booking-step-dot ${step >= s ? 'active' : ''}`} />
                ))}
              </div>

              <div style={{ minHeight: '340px' }}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px' }}>Select Core Service</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map(s => (
                          <button key={s} onClick={() => setSelectedService(s)} className={`opt-btn ${selectedService === s ? 'active' : ''}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px' }}>Choose Tier</h3>
                      <div className="space-y-3">
                        {packages.map(p => (
                          <button key={p.name} onClick={() => setSelectedPackage(p.name)} className={`opt-btn ${selectedPackage === p.name ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 700, color: selectedPackage === p.name ? '#fff' : '#EAEAEC' }}>{p.name}</div>
                                <div style={{ fontSize: '.75rem', marginTop: '2px' }}>{p.desc}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.form key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6" onSubmit={handleSubmit}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px' }}>Confirm Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required type="text" placeholder="Your Name" className="booking-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        <input required type="email" placeholder="Email Address" className="booking-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <input required type="date" className="booking-input" style={{ colorScheme: 'dark' }} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                      <textarea required placeholder="Project specifics..." rows={4} className="booking-input resize-none" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} />
                      {error && (
                        <div style={{ color: '#FF453A', background: 'rgba(255, 69, 58, 0.05)', border: '1px solid rgba(255, 69, 58, 0.15)', padding: '12px 16px', borderRadius: '8px', fontSize: '.85rem', marginTop: '16px' }}>
                          {error}
                        </div>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(192,192,192,0.06)' }}>
                <button onClick={handlePrev} style={{ visibility: step === 1 ? 'hidden' : 'visible', padding: '14px 24px', minHeight: '52px', borderRadius: '10px', color: '#8E8E93', fontWeight: 600 }}>Back</button>
                {step < 3 ? (
                  <button onClick={handleNext} disabled={(step === 1 && !selectedService) || (step === 2 && !selectedPackage)} style={{ padding: '14px 32px', minHeight: '52px', borderRadius: '10px', background: 'linear-gradient(135deg, #007BFF, #00C6FF)', color: '#fff', fontWeight: 700, opacity: ((step === 1 && !selectedService) || (step === 2 && !selectedPackage)) ? 0.5 : 1, flex: '1', maxWidth: '200px' }}>Next Step</button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} style={{ padding: '14px 32px', minHeight: '52px', borderRadius: '10px', background: 'linear-gradient(135deg, #007BFF, #00C6FF)', color: '#fff', fontWeight: 700, flex: '1', maxWidth: '240px' }}>{isSubmitting ? 'Confirming...' : 'Complete Booking'}</button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
               <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,198,255,0.1)', border: '1px solid rgba(0,198,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.5rem', color: '#00C6FF' }}>✓</div>
               <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Request Received</h3>
               <p style={{ color: '#8E8E93' }}>We&apos;ve received your project details. Our team will review and contact you via {formData.email} within 24 hours.</p>
               {isDevMode && (
                 <p style={{ color: '#FFD60A', fontSize: '.8rem', marginTop: '12px' }}>
                   ℹ️ Running in local development mode. Simulated request logged to terminal console.
                 </p>
               )}
               <button onClick={() => { setIsSuccess(false); setStep(1); }} style={{ marginTop: '32px', color: '#00C6FF', fontWeight: 600 }}>Book Another Project</button>
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
