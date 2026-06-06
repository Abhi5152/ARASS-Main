/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Web Development Company in India | ARASS Tech',
  description: "ARASS Tech is a top web development company in India building modern, high-performance websites for growing businesses. Let's build your digital presence.",
  alternates: {
    canonical: 'https://arasstech.com/web-development-company-india',
  }
};

export default function WebDevelopmentIndiaPage() {
  const faqs = [
    {
      question: "Why choose ARASS Tech as your web development company in India?",
      answer: "ARASS Tech combines world-class design aesthetics with robust engineering. We don't just build websites; we create digital experiences optimized for performance, SEO, and conversions."
    },
    {
      question: "How long does it take to develop a custom website?",
      answer: "For standard business websites, it typically takes 4-6 weeks from discovery to launch. Complex web applications or massive eCommerce platforms may take 3-6 months depending on the required features."
    },
    {
      question: "Do you provide ongoing website maintenance?",
      answer: "Yes, we offer comprehensive maintenance packages to ensure your website remains secure, fast, and up-to-date with the latest web standards and search engine algorithms."
    },
    {
      question: "Will my website be mobile-friendly and SEO optimized?",
      answer: "Absolutely. Every website we build is mobile-first, fully responsive, and built with technical SEO best practices, ensuring fast load times and proper semantic structure."
    },
    {
      question: "What technologies do you use for web development?",
      answer: "We specialize in modern stacks like React, Next.js, Node.js, and specialized 3D libraries like Three.js. This ensures your site is blazingly fast and future-proof."
    }
  ];

  return (
    <SEOPageLayout>
      <SEOContentSection
        title="Web Development Company in India"
        subtitle="Building Modern High-Performance Websites for Growing Businesses"
        faqs={faqs}
        content={
          <>
            <h2>The Challenge: Why Most Websites Fail</h2>
            <p>
              In today's fast-paced digital world, business owners struggle with websites that look outdated, load slowly, and fail to convert visitors into customers. A poor mobile experience or a confusing user journey can cost you thousands of dollars in lost revenue. In India's highly competitive market, having just a "digital brochure" is no longer enough.
            </p>
            
            <h2>Our Solution: High-Performance Digital Experiences</h2>
            <p>
              As a premier web development company in India, <strong>ARASS Tech</strong> builds digital assets that work as your 24/7 sales team. We combine cutting-edge technology (like Next.js and WebGL) with stunning, premium design to create websites that don't just look good—they dominate search rankings and turn clicks into loyal clients.
            </p>

            <h3>Our Proven Web Development Process</h3>
            <ol>
              <li>
                <strong>Discovery & Strategy:</strong> We start by understanding your business goals, target audience, and competitive landscape in India and beyond.
              </li>
              <li>
                <strong>UX/UI Design:</strong> Our design team crafts premium, user-centric interfaces with seamless micro-animations and intuitive navigation.
              </li>
              <li>
                <strong>Development:</strong> We write clean, scalable code. Whether it's a sleek corporate site or a complex web application, performance is our priority.
              </li>
              <li>
                <strong>Testing & Optimization:</strong> Rigorous cross-browser testing, Core Web Vitals optimization, and accessibility checks ensure perfection.
              </li>
              <li>
                <strong>Launch & Growth:</strong> We deploy your site on reliable cloud infrastructure and provide the tools you need to scale your business.
              </li>
            </ol>

            <h3>Why Invest in Premium Web Development?</h3>
            <p>
              Your website is often the first interaction a potential customer has with your brand. A fast, beautifully designed website builds immediate trust. It signals authority. When you partner with ARASS Tech, you are investing in a tailored solution designed specifically to outshine your competitors and capture market share.
            </p>

            <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4 mt-0">Ready to Transform Your Digital Presence?</h3>
              <p className="text-gray-400 mb-6">Book a free strategy session with our technical architects today.</p>
              <Link href="/#booking" className="btn-primary inline-flex no-underline">
                Book a Free Consultation
              </Link>
            </div>
          </>
        }
      />
    </SEOPageLayout>
  );
}
