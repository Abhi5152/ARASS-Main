/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Azure Haven Resort Web Design Case Study | ARASS Tech',
  description: 'Learn how ARASS Tech designed and developed a high-converting luxury website for Azure Haven Resort, increasing direct bookings by 45%.',
  alternates: {
    canonical: 'https://arasstech.com/portfolio/azure-haven-resort',
  }
};

export default function AzureHavenPortfolioPage() {
  return (
    <SEOPageLayout>
      <SEOContentSection
        title="Azure Haven Resort"
        subtitle="Luxury Hospitality Web Design & Direct Booking Optimization"
        content={
          <>
            <div className="w-full h-64 md:h-96 bg-gray-900 rounded-2xl mb-12 flex items-center justify-center border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-cyan-500/20 mix-blend-overlay"></div>
              <p className="text-gray-500 italic z-10">[Hero Image Placeholder: Azure Haven Homepage Mockup]</p>
            </div>

            <h2>Project Overview</h2>
            <p>
              Azure Haven Resort, a luxury beachfront property, approached ARASS Tech with a common hospitality problem: a heavy reliance on Online Travel Agencies (OTAs) and a high commission overhead. Their existing website was outdated, slow, and failed to convey the premium experience of the resort.
            </p>

            <h2>The Challenge</h2>
            <ul>
              <li><strong>Low Conversion Rate:</strong> The direct booking flow was confusing, leading to high cart abandonment.</li>
              <li><strong>Poor Mobile Experience:</strong> Over 60% of their traffic was mobile, but the site was unresponsive and difficult to navigate on small screens.</li>
              <li><strong>Lack of Visual Appeal:</strong> The stunning resort photography was heavily compressed and presented in a dated layout.</li>
            </ul>

            <h2>The Solution</h2>
            <p>
              We designed a custom, mobile-first digital experience that positioned Azure Haven as a top-tier luxury destination. 
            </p>
            
            <h3>1. Immersive Visual Storytelling</h3>
            <p>
              We implemented an edge-to-edge media architecture, utilizing lazy-loaded high-resolution images and subtle background videos to instantly immerse the visitor in the resort experience.
            </p>

            <h3>2. Frictionless Direct Booking Engine</h3>
            <p>
              We completely overhauled the booking widget, making it sticky on mobile and persistently accessible. We integrated seamlessly with their existing property management system API to show real-time availability and dynamic pricing without the user ever leaving the main site.
            </p>

            <h3>3. Technical SEO & Performance</h3>
            <p>
              Built on Next.js, the site boasts a 98/100 Google PageSpeed score. We implemented complex Schema markup for HotelRooms, Amenities, and LocalBusiness, helping the resort capture organic "luxury resort near me" search traffic.
            </p>

            <h2>The Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">+45%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Direct Bookings</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">-2.4s</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Page Load Time</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">+120%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Organic Traffic</div>
              </div>
            </div>

            <h2>Technology Stack</h2>
            <ul>
              <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS, Framer Motion</li>
              <li><strong>Backend/CMS:</strong> Sanity.io Headless CMS</li>
              <li><strong>Integrations:</strong> Cloudbeds Booking API, Stripe</li>
            </ul>

            <div className="mt-16 p-8 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-cyan-500/30 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4 mt-0">Want results like this for your property?</h3>
              <p className="text-gray-300 mb-6">Let's discuss how we can increase your direct bookings.</p>
              <Link href="/website-development-for-hotels" className="btn-primary inline-flex no-underline">
                View Hospitality Services
              </Link>
            </div>
          </>
        }
      />
    </SEOPageLayout>
  );
}
