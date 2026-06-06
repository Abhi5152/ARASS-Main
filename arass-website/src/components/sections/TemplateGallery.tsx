/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';

interface Template {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail_image: string;
  features: string[];
}

export default function TemplateGallery() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${API_URL}/api/v1/templates/`)
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching templates:', err);
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...Array.from(new Set(templates.map((t) => t.category)))];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#00C6FF]/30 border-t-[#00C6FF] rounded-full animate-spin"></div>
          <span style={{ fontSize: '.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#8E8E93' }}>Loading templates...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .templates-wrapper { --deep: #1C1C1E; --dark: #2A2A2D; --silver: #C0C0C0; --bs: #007BFF; --be: #00C6FF; --neon: #00C6FF; --tp: #EAEAEC; --ts: #8E8E93; }
        .tmpl-sec-label { font-size: .6rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--neon); }
        .tmpl-sec-title { font-weight: 700; line-height: 1.15; background: linear-gradient(135deg, #fff 25%, var(--silver)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .tmpl-filter { padding: 8px 20px; border-radius: 50px; font-size: .65rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; border: 1px solid rgba(192,192,192,.08); background: transparent; color: var(--ts); cursor: pointer; transition: all .3s cubic-bezier(.22,1,.36,1); }
        .tmpl-filter:hover { border-color: rgba(0,198,255,.2); color: var(--tp); }
        .tmpl-filter.active { background: linear-gradient(135deg, var(--bs), var(--be)); border-color: transparent; color: #fff; box-shadow: 0 4px 20px rgba(0,123,255,.25); }

        .tmpl-card { border-radius: 20px; border: 1px solid rgba(192,192,192,.06); background: var(--dark); transition: all .4s cubic-bezier(.22,1,.36,1); position: relative; overflow: hidden; cursor: pointer; }
        .tmpl-card:hover { border-color: rgba(0,198,255,.2); box-shadow: 0 8px 40px rgba(0,198,255,.08), 0 0 1px 0 rgba(0,198,255,.15); transform: translateY(-6px); }
        .tmpl-card::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--neon), transparent); opacity: 0; transition: opacity .4s; z-index: 0; }
        .tmpl-card:hover::before { opacity: 1; }

        .tmpl-thumb { position: relative; overflow: hidden; aspect-ratio: 16/10; }
        .tmpl-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.22,1,.36,1); }
        .tmpl-card:hover .tmpl-thumb img { transform: scale(1.05); }
        .tmpl-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: all .4s; }
        .tmpl-card:hover .tmpl-overlay { opacity: 1; }
        .tmpl-preview-btn { padding: 10px 28px; border-radius: 10px; background: linear-gradient(135deg, var(--bs), var(--be)); color: #fff; font-size: .7rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; transform: translateY(10px); transition: all .4s cubic-bezier(.22,1,.36,1); box-shadow: 0 4px 20px rgba(0,123,255,.3); }
        .tmpl-card:hover .tmpl-preview-btn { transform: translateY(0); }
        .tmpl-preview-btn:hover { box-shadow: 0 6px 30px rgba(0,123,255,.5); }

        .tmpl-body { padding: 24px; position: relative; z-index: 1; }
        .tmpl-cat { font-size: .55rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--neon); margin-bottom: 10px; }
        .tmpl-name { font-size: .95rem; font-weight: 700; color: var(--tp); margin-bottom: 8px; line-height: 1.3; }
        .tmpl-desc { font-size: .78rem; color: rgba(192,192,192,.45); line-height: 1.75; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .tmpl-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tmpl-tag { font-size: .55rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; background: rgba(0,198,255,.05); border: 1px solid rgba(0,198,255,.1); color: rgba(0,198,255,.6); }

        .tmpl-empty { border-radius: 20px; border: 2px dashed rgba(192,192,192,.08); background: rgba(42,42,45,.4); padding: 80px 40px; text-align: center; }
        .tmpl-empty-ico { width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, rgba(0,123,255,.08), rgba(0,198,255,.04)); border: 1px solid rgba(0,198,255,.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: var(--neon); font-size: 1.4rem; }

        @keyframes tmplFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .tmpl-card { animation: tmplFadeUp .6s cubic-bezier(.22,1,.36,1) both; }
      `}} />

      <section className="templates-wrapper" style={{ padding: '40px 0 100px' }}>
        <div className="container-custom" style={{ maxWidth: '1200px' }}>
          
          {/* Header — same pattern as ServicesSection */}
          <div className="text-center flex flex-col items-center" style={{ marginBottom: '60px' }}>
            <p className="tmpl-sec-label" style={{ marginBottom: '24px' }}>Template Gallery</p>
            <h2 className="tmpl-sec-title text-3xl sm:text-4xl md:text-5xl" style={{ marginBottom: '24px' }}>
              Premium Templates
            </h2>
            <p style={{ fontSize: '.95rem', color: 'var(--ts)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.8' }}>
              Browse our collection of high-performance, conversion-optimized website templates crafted for modern businesses.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3" style={{ marginBottom: '48px' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`tmpl-filter ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Template Grid */}
          {filteredTemplates.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template, i) => (
                <div
                  key={template.slug}
                  className="tmpl-card"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="tmpl-thumb">
                    <img 
                      src={template.thumbnail_image.startsWith('http') ? template.thumbnail_image : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${template.thumbnail_image}`} 
                      alt={template.title}
                      loading="lazy"
                    />
                    <div className="tmpl-overlay">
                      <a href={`/preview/${template.slug}`} className="tmpl-preview-btn">
                        Live Preview
                      </a>
                    </div>
                  </div>
                  
                  <div className="tmpl-body">
                    <div className="tmpl-cat">{template.category}</div>
                    <h3 className="tmpl-name">{template.title}</h3>
                    <p className="tmpl-desc">{template.description}</p>
                    
                    {template.features && template.features.length > 0 && (
                      <div className="tmpl-tags">
                        {template.features.slice(0, 3).map((feature: string, idx: number) => (
                          <span key={idx} className="tmpl-tag">{feature}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {templates.length === 0 && !loading && (
            <div className="tmpl-empty" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="tmpl-empty-ico">
                <i className="fas fa-layer-group"></i>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--tp)', marginBottom: '8px' }}>
                No templates available yet
              </h3>
              <p style={{ fontSize: '.85rem', color: 'var(--ts)', lineHeight: '1.7', maxWidth: '360px', margin: '0 auto' }}>
                We&apos;re crafting premium templates for you. Check back soon or contact us for a custom solution.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
