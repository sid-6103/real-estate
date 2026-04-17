import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { properties, formatFullPrice } from '@/data/properties';
import PanoViewer from '@/components/PanoViewer';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState('main');
  const [showPano, setShowPano] = useState(false);

  const property = useMemo(() => {
    return properties.find((p) => p.id === parseInt(id));
  }, [id]);

  if (!property) {
    return (
      <main className="pt-20 min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-[#F3F3F1] mb-4">Property Not Found</h1>
          <Link
            to="/properties"
            className="border border-gold text-gold hover:bg-gold hover:text-[#0A0A0C] transition-all duration-300 px-6 py-3 uppercase tracking-[0.2em] text-xs font-body"
          >
            Back to Properties
          </Link>
        </div>
      </main>
    );
  }

  const images = [
    { key: 'main', src: property.images.main, label: 'Exterior' },
    { key: 'interior', src: property.images.interior, label: 'Interior' },
  ];

  const specs = [
    { label: 'Price', value: formatFullPrice(property.price) },
    { label: 'Bedrooms', value: property.beds },
    { label: 'Bathrooms', value: property.baths },
    { label: 'Square Feet', value: property.sqft.toLocaleString() },
    { label: 'Year Built', value: property.yearBuilt },
    { label: 'Lot Size', value: property.lotSize },
    { label: 'Type', value: property.type },
    { label: 'Status', value: property.status },
  ];

  // Use the interior image for the 360 panorama demo
  const panoImage = property.images.interior;

  return (
    <main className="pt-20 min-h-screen bg-[#0A0A0C]">
      {/* 360° Panoramic Viewer Overlay */}
      {showPano && (
        <PanoViewer
          imageUrl={panoImage}
          onClose={() => setShowPano(false)}
        />
      )}

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-24 py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-body text-[#707076]">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-gold transition-colors">Properties</Link>
          <span>/</span>
          <span className="text-[#A1A1A5]">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left - Images */}
          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUp}
          >
            {/* Main Image */}
            <div className="relative overflow-hidden border border-white/10 mb-4 group">
              <img
                src={images.find((i) => i.key === activeImage)?.src}
                alt={property.title}
                className="w-full aspect-[16/10] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                data-testid="property-main-image"
              />
              {/* 360 Tour Button */}
              <button
                onClick={() => setShowPano(true)}
                data-testid="open-360-tour"
                className="absolute bottom-4 left-4 bg-[#0A0A0C]/80 backdrop-blur-xl border border-gold/40 px-5 py-3 flex items-center gap-3 hover:bg-gold/20 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C19A6B" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                </svg>
                <span className="text-[11px] uppercase tracking-[0.2em] font-body text-gold">
                  360° Virtual Tour
                </span>
              </button>
              {/* Drag hint */}
              <div className="absolute bottom-4 right-4 bg-[#0A0A0C]/70 backdrop-blur-md px-4 py-2 border border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] font-body text-[#A1A1A5]">
                  Click thumbnails to explore
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              {images.map((img) => (
                <button
                  key={img.key}
                  onClick={() => setActiveImage(img.key)}
                  data-testid={`thumbnail-${img.key}`}
                  className={`relative overflow-hidden flex-1 border transition-all duration-300 ${
                    activeImage === img.key
                      ? 'border-gold'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0C]/40 flex items-end justify-start p-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-body text-[#F3F3F1]">
                      {img.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Description */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-4">
                About This Property
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-[#F3F3F1] mb-6">
                {property.title}
              </h2>
              <p className="font-body font-light text-base text-[#A1A1A5] leading-relaxed">
                {property.description}
              </p>

              {/* Features */}
              <div className="mt-10">
                <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-6">
                  Amenities & Features
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      className="border border-white/10 px-4 py-3 text-sm font-body font-light text-[#A1A1A5] hover:border-gold/30 hover:text-gold transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                    >
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Specs Sidebar */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Price Card */}
              <div className="border border-white/10 p-6 bg-[#111114]">
                <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-2">
                  {property.type}
                </span>
                <h1 className="font-heading text-4xl font-light text-[#F3F3F1] mb-2">
                  {property.title}
                </h1>
                <p className="text-sm font-body font-light text-[#707076] mb-6">
                  {property.address}
                </p>
                <p className="font-heading text-4xl font-light text-gold border-t border-white/10 pt-6">
                  {formatFullPrice(property.price)}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="border border-white/10 overflow-hidden">
                {specs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between items-center px-5 py-4 ${
                      index < specs.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                    data-testid={`spec-${spec.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="text-[11px] uppercase tracking-[0.15em] font-body text-[#707076]">
                      {spec.label}
                    </span>
                    <span className="text-sm font-body font-light text-[#F3F3F1]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Agent Card */}
              <div className="border border-white/10 p-6 bg-[#111114]">
                <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-4">
                  Your Agent
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-14 h-14 object-cover border border-white/10"
                  />
                  <div>
                    <p className="font-heading text-lg text-[#F3F3F1]">{property.agent.name}</p>
                    <p className="text-xs font-body text-[#707076] uppercase tracking-wider">Licensed Realtor</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  data-testid="schedule-tour-btn"
                  className="block text-center border border-gold text-gold hover:bg-gold hover:text-[#0A0A0C] transition-all duration-300 px-6 py-4 uppercase tracking-[0.2em] text-xs font-body font-medium"
                >
                  Schedule a Tour
                </Link>
                <button
                  className="block w-full mt-3 text-center bg-white/5 hover:bg-white/10 text-[#F3F3F1] backdrop-blur-md border border-white/10 transition-all duration-300 px-6 py-4 uppercase tracking-[0.2em] text-xs font-body"
                >
                  Request Information
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailPage;
