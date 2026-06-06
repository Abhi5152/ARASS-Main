import { Metadata } from 'next';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import SEOContentSection from '@/components/sections/SEOContentSection';

export const metadata: Metadata = {
  title: 'Website Development for Restaurants | ARASS Tech',
  description: 'Custom website development and digital solutions tailored for the restaurant industry.',
  alternates: {
    canonical: 'https://arasstech.com/website-development-for-restaurants',
  }
};

export default function RestaurantsDevelopmentPage() {
  return (
    <SEOPageLayout>
      <SEOContentSection
        title="Website Development for Restaurants"
        subtitle="Accelerate your growth in the restaurant sector with a premium digital presence."
        content={
          <>
            <h2>Specialized Solutions for Restaurants</h2>
            <p>Every industry has unique digital requirements. At ARASS Tech, we build specialized solutions tailored to the distinct needs and customer journey of the restaurant sector.</p>
          </>
        }
      />
    </SEOPageLayout>
  );
}
