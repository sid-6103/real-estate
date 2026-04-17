import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import { properties, priceRanges, propertyTypes, formatPrice } from '@/data/properties';

const PropertiesPage = () => {
  const [activeType, setActiveType] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [sortBy, setSortBy] = useState("featured");

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by type
    if (activeType !== "All") {
      result = result.filter((p) => p.type === activeType);
    }

    // Filter by price
    const range = priceRanges[activePriceRange];
    result = result.filter((p) => p.price >= range.min && p.price < range.max);

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [activeType, activePriceRange, sortBy]);

  return (
    <main className="pt-20 min-h-screen bg-[#0A0A0C]">
      {/* Page Header */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.span
            className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Collection
          </motion.span>
          <motion.h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-[#F3F3F1] leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Our <span className="italic">Properties</span>
          </motion.h1>
          <motion.p
            className="font-body font-light text-base text-[#A1A1A5] mt-6 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Browse our curated portfolio of extraordinary residences, from coastal villas to sky-high penthouses.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <motion.section
        className="py-8 px-6 md:px-12 lg:px-24 border-b border-white/5 bg-[#111114]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
            {/* Property Types */}
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  data-testid={`filter-type-${type.toLowerCase()}`}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-body transition-all duration-300 border ${
                    activeType === type
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-white/10 text-[#707076] hover:border-white/20 hover:text-[#A1A1A5]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/10" />

            {/* Price Range */}
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range, index) => (
                <button
                  key={range.label}
                  data-testid={`filter-price-${index}`}
                  onClick={() => setActivePriceRange(index)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-body transition-all duration-300 border ${
                    activePriceRange === index
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-white/10 text-[#707076] hover:border-white/20 hover:text-[#A1A1A5]'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort */}
            <select
              data-testid="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-body text-[#A1A1A5] focus:border-gold/40 focus:outline-none cursor-pointer appearance-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23707076'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '32px' }}
            >
              <option value="featured">Featured</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Results Count */}
      <div className="px-6 md:px-12 lg:px-24 py-6 max-w-7xl mx-auto">
        <p className="text-xs font-body text-[#707076] uppercase tracking-[0.15em]">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
        </p>
      </div>

      {/* Grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <PropertyCard property={property} index={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-heading text-2xl text-[#707076] font-light">
                No properties match your criteria
              </p>
              <button
                onClick={() => {
                  setActiveType("All");
                  setActivePriceRange(0);
                }}
                className="mt-6 border border-gold text-gold hover:bg-gold hover:text-[#0A0A0C] transition-all duration-300 px-6 py-3 uppercase tracking-[0.2em] text-xs font-body"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PropertiesPage;
