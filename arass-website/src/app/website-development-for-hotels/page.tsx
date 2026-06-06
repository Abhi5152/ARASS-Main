/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';

export const metadata: Metadata = {
  title: 'Website Development for Hotels | ARASS Tech',
  description: 'Boost your direct bookings with premium website development for hotels and resorts by ARASS Tech.',
  alternates: {
    canonical: 'https://arasstech.com/website-development-for-hotels',
  }
};

export default function HotelsDevelopmentPage() {
  const faqs = [
    {
      question: "Why do hotels need custom website development?",
      answer: "Custom websites allow hotels to integrate direct booking engines, showcase luxury amenities with premium 3D/video tours, and optimize the guest experience to reduce OTA (Online Travel Agency) commission fees."
    },
    {
      question: "Can you integrate our existing booking engine?",
      answer: "Yes, we integrate seamlessly with major Property Management Systems (PMS) and booking engines like Cloudbeds, SiteMinder, and custom APIs."
    }
  ];

  return (
    <SEOPageLayout>
      <SEOContentSection
        title="Website Development for Hotels & Resorts"
        subtitle="Increase Direct Bookings with Premium Digital Experiences"
        faqs={faqs}
        content={
          <>
            <h2>Stop Losing Revenue to OTAs</h2>
            <p>
              In the hospitality industry, every booking made through an Online Travel Agency (OTA) like Booking.com or Expedia costs you 15-25% in commissions. A premium, high-converting custom website encourages guests to book directly with you, drastically improving your profit margins.
            </p>
            
            <h2>Features of Our Hotel Websites</h2>
            <ul>
              <li><strong>Direct Booking Integration:</strong> Frictionless reservation systems.</li>
              <li><strong>Mobile-First Design:</strong> 70% of travel research happens on mobile. We ensure your site looks flawless on every device.</li>
              <li><strong>Immersive Galleries:</strong> High-resolution media, virtual tours, and 3D room viewers.</li>
              <li><strong>Lightning Fast Speed:</strong> Optimized to load instantly, reducing bounce rates.</li>
              <li><strong>Local SEO Optimization:</strong> Dominate search results for "hotels near me" and your specific destination.</li>
            </ul>

            <h3>Case Study: Azure Haven Resort</h3>
            <p>
              We completely revamped the digital presence for Azure Haven Resort, focusing on a luxury aesthetic and a streamlined booking flow. The result? A <strong>45% increase in direct bookings</strong> within the first three months of launch.
            </p>
          </>
        }
      />
    </SEOPageLayout>
  );
}
