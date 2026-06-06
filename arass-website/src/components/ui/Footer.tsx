'use client';

const footerLinks = [
  { title: 'Services', links: ['AI & ML', 'Web Development', 'Mobile Apps', 'Cloud & DevOps', 'Data Engineering', '3D & Immersive'] },
  { title: 'Company', links: ['About', 'Portfolio', 'Careers', 'Blog', 'Contact'] },
  { title: 'Resources', links: ['Documentation', 'API Reference', 'Case Studies', 'Open Source'] },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="container-custom" style={{ paddingTop: '80px', paddingBottom: '48px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>A</span>
              </div>
              <span className="text-xl font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-heading)' }}>ARASS</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-xs">
              Building the future with AI-powered solutions and immersive digital experiences.
            </p>

          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-[var(--color-text-primary)]">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} ARASS Tech. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
