import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface SEOContentSectionProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  faqs?: FAQ[];
}

export default function SEOContentSection({ title, subtitle, content, faqs }: SEOContentSectionProps) {
  // Generate FAQ Schema dynamically if FAQs are provided
  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-16">
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-300 font-inter max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="prose prose-invert prose-lg max-w-none font-inter text-gray-300">
        {content}
      </div>

      {faqs && faqs.length > 0 && (
        <div className="space-y-8 pt-12 border-t border-white/10">
          <h2 className="text-3xl font-orbitron font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-medium text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
