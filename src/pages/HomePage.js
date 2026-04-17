import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import StatsSection from '@/components/StatsSection';
import AboutPreview from '@/components/AboutPreview';
import ContactCTA from '@/components/ContactCTA';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedProperties />
      <StatsSection />
      <AboutPreview />
      <ContactCTA />
    </main>
  );
};

export default HomePage;
