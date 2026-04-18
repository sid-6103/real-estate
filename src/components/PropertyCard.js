import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '@/data/properties';

const PropertyCard = ({ property, index }) => {
  return (
    <Link
      to={`/property/${property.id}`}
      data-testid={`property-card-${property.id}`}
      className="group relative overflow-hidden bg-transparent border border-white/10 hover:border-gold/30 transition-all duration-500 block"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images.main}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-body font-medium bg-[#0A0A0C]/70 backdrop-blur-md text-gold px-3 py-1.5 border border-gold/20">
            {property.status}
          </span>
        </div>
        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 right-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-body font-medium bg-gold/90 text-[#0A0A0C] px-3 py-1.5">
              Featured
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1.2s] ease-out" />
        {/* View details overlay — appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="bg-[#0A0A0C]/70 backdrop-blur-sm border border-gold/30 text-gold text-[10px] uppercase tracking-[0.25em] font-body px-5 py-2.5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Gold top border that reveals on hover */}
        <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-gold/50 via-gold to-gold/50 transition-all duration-700" />

        {/* Property Type */}
        <span className="text-[10px] uppercase tracking-[0.2em] font-body text-gold font-medium">
          {property.type}
        </span>

        {/* Title */}
        <h3 className="font-heading text-2xl font-light text-[#F3F3F1] mt-2 mb-1 group-hover:text-gold transition-colors duration-500">
          {property.title}
        </h3>

        {/* Address */}
        <p className="text-sm font-body font-light text-[#707076] mb-4 truncate group-hover:text-[#A1A1A5] transition-colors duration-500">
          {property.address}
        </p>

        {/* Price */}
        <p className="font-heading text-3xl font-light text-[#F3F3F1] mb-4 group-hover:translate-x-1 transition-transform duration-300">
          {formatPrice(property.price)}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-0 text-[11px] uppercase tracking-[0.15em] font-body font-light text-[#A1A1A5]">
          <span>{property.beds} Beds</span>
          <span className="mx-3 w-px h-3 bg-white/20" />
          <span>{property.baths} Baths</span>
          <span className="mx-3 w-px h-3 bg-white/20" />
          <span>{property.sqft.toLocaleString()} Sqft</span>
        </div>
      </div>

      {/* Corner accent on hover */}
      <div className="absolute bottom-0 right-0 w-0 h-0 group-hover:w-8 group-hover:h-8 border-b border-r border-gold/40 transition-all duration-500" />
    </Link>
  );
};

export default PropertyCard;
