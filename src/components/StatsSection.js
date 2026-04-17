import React from 'react';

const stats = [
  { value: "$2.8B+", label: "Total Portfolio Value" },
  { value: "340+", label: "Properties Sold" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years of Excellence" },
];

const StatsSection = () => {
  return (
    <section data-testid="stats-section" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#111114] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-32 h-32 border border-gold/5 rotate-45 -translate-x-16 -translate-y-16" />
      <div className="absolute top-1/2 right-0 w-32 h-32 border border-gold/5 rotate-45 translate-x-16 -translate-y-16" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center relative group"
              data-testid={`stat-${index}`}
            >
              {/* Separator */}
              {index > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/5" />
              )}
              <p className="font-heading text-4xl md:text-5xl font-light text-gold mb-2 group-hover:scale-105 transition-transform duration-500">
                {stat.value}
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] font-body font-light text-[#707076]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
