import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';

export const metadata: Metadata = {
  title: 'Web Development Company in Kerala | ARASS Tech',
  description: 'ARASS Tech is a top web development company in Kerala. We build custom websites and digital solutions.',
  alternates: {
    canonical: 'https://arasstech.com/web-development-company-kerala',
  }
};

export default function WebDevelopmentKeralaPage() {
  return (
    <SEOPageLayout>
      <SEOContentSection
        title="Web Development Company in Kerala"
        subtitle="Custom digital solutions for businesses in God's Own Country"
        content={
          <>
            <h2>Digital Excellence in Kerala</h2>
            <p>Content to be added...</p>
          </>
        }
      />
    </SEOPageLayout>
  );
}
