import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/data/properties';

const PropertyCard = ({ property, index }) => {
  const delay = index * 100;

  return (
    <Link
      to={`/property/${property.id}`}
      data-testid={`property-card-${property.id}`}
      className="group relative overflow-hidden bg-transparent border border-white/10 hover:border-white/20 transition-all duration-500 block"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images.main}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Property Type */}
        <span className="text-[10px] uppercase tracking-[0.2em] font-body text-gold font-medium">
          {property.type}
        </span>

        {/* Title */}
        <h3 className="font-heading text-2xl font-light text-[#F3F3F1] mt-2 mb-1 group-hover:text-gold transition-colors duration-500">
          {property.title}
        </h3>

        {/* Address */}
        <p className="text-sm font-body font-light text-[#707076] mb-4 truncate">
          {property.address}
        </p>

        {/* Price */}
        <p className="font-heading text-3xl font-light text-[#F3F3F1] mb-4">
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
    </Link>
  );
};

export default PropertyCard;
