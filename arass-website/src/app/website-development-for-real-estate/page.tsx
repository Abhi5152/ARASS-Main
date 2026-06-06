import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';

export const metadata: Metadata = {
  title: 'Website Development for Real estate | ARASS Tech',
  description: 'Custom website development and digital solutions tailored for the Real estate industry.',
  alternates: {
    canonical: 'https://arasstech.com/website-development-for-real-estate',
  }
};

export default function Page() {
  return (
    <SEOPageLayout>
      <SEOContentSection
        title="Website Development for Real estate"
        subtitle="Accelerate your growth in the Real estate sector with a premium digital presence."
        content={
          <>
            <h2>Specialized Solutions for Real estate</h2>
            <p>Every industry has unique digital requirements. At ARASS Tech, we build specialized solutions tailored to the distinct needs and customer journey of the Real estate sector.</p>
          </>
        }
      />
    </SEOPageLayout>
  );
}
