import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';

export const metadata: Metadata = {
  title: 'Website Development for Startups | ARASS Tech',
  description: 'Custom website development and digital solutions tailored for the Startups industry.',
  alternates: {
    canonical: 'https://arasstech.com/website-development-for-startups',
  }
};

export default function Page() {
  return (
    <SEOPageLayout>
      <SEOContentSection
        title="Website Development for Startups"
        subtitle="Accelerate your growth in the Startups sector with a premium digital presence."
        content={
          <>
            <h2>Specialized Solutions for Startups</h2>
            <p>Every industry has unique digital requirements. At ARASS Tech, we build specialized solutions tailored to the distinct needs and customer journey of the Startups sector.</p>
          </>
        }
      />
    </SEOPageLayout>
  );
}
