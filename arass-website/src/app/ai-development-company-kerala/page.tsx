import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';

export const metadata: Metadata = {
  title: 'AI Development Company in Kerala | ARASS Tech',
  description: 'Premium digital solutions and services by ARASS Tech.',
  alternates: {
    canonical: 'https://arasstech.com/ai-development-company-kerala',
  }
};

export default function Page() {
  return (
    <SEOPageLayout>
      <SEOContentSection
        title="AI Development Company in Kerala"
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
