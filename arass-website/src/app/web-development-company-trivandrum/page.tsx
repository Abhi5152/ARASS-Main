import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';

export const metadata: Metadata = {
  title: 'Web Development Company in Trivandrum | ARASS Tech',
  description: 'Premium digital solutions and services by ARASS Tech.',
  alternates: {
    canonical: 'https://arasstech.com/web-development-company-trivandrum',
  }
};

export default function Page() {
  return (
    <SEOPageLayout>
      <SEOContentSection
        title="Web Development Company in Trivandrum"
        subtitle="Leading digital transformation."
        content={
          <>
            <h2>Local Excellence</h2>
            <p>Content to be added...</p>
          </>
        }
      />
    </SEOPageLayout>
  );
}
