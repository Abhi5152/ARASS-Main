import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';

export const metadata: Metadata = {
  title: 'Website Development for Law firms | ARASS Tech',
  description: 'Custom website development and digital solutions tailored for the Law firms industry.',
  alternates: {
    canonical: 'https://arasstech.com/website-development-for-law-firms',
  }
};

export default function Page() {
  return (
    <SEOPageLayout>
      <SEOContentSection
        title="Website Development for Law firms"
        subtitle="Accelerate your growth in the Law firms sector with a premium digital presence."
        content={
          <>
            <h2>Specialized Solutions for Law firms</h2>
            <p>Every industry has unique digital requirements. At ARASS Tech, we build specialized solutions tailored to the distinct needs and customer journey of the Law firms sector.</p>
          </>
        }
      />
    </SEOPageLayout>
  );
}
