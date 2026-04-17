import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/data/properties';

const FeaturedProperties = () => {
  const featuredProperties = properties.filter((p) => p.featured);

  return (
    <section data-testid="featured-section" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#0A0A0C]">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.span
          className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Curated Selection
        </motion.span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h2
            className="font-heading text-4xl sm:text-5xl font-light tracking-tight text-[#F3F3F1] leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Featured <span className="italic">Residences</span>
          </motion.h2>
          <motion.a
            href="/properties"
            data-testid="view-all-properties"
            className="border border-white/10 backdrop-blur-md px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#A1A1A5] hover:border-gold hover:text-gold transition-all duration-300 self-start md:self-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            View All
          </motion.a>
        </div>
        <motion.div
          className="w-16 h-px bg-gold/30 mt-6"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Property Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
        {featuredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              delay: index * 0.15,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <PropertyCard property={property} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
