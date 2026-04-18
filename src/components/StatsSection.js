import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: "$2.8B", suffix: "+", label: "Total Portfolio Value" },
  { value: "340", suffix: "+", label: "Properties Sold" },
  { value: "98", suffix: "%", label: "Client Satisfaction" },
  { value: "15", suffix: "+", label: "Years of Excellence" },
];

/* ─── Animated counter that counts up when in view ─── */
const AnimatedStat = ({ value, suffix, label, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part
    const prefix = value.replace(/[0-9.]/g, '');
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const startTime = Date.now();
    const isFloat = value.includes('.');

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num * (isFloat ? 10 : 1)) / (isFloat ? 10 : 1);
      setDisplayValue(`${prefix}${isFloat ? current.toFixed(1) : current}`);
      if (progress < 1) requestAnimationFrame(animate);
    };

    // Stagger start based on index
    const timer = setTimeout(() => requestAnimationFrame(animate), index * 200);
    return () => clearTimeout(timer);
  }, [isInView, value, index]);

  return (
    <motion.div
      ref={ref}
      className="text-center relative group cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Separator */}
      {index > 0 && (
        <motion.div
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/5"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
      )}

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 rounded-lg transition-all duration-500 -m-4" />

      <p className="font-heading text-4xl md:text-5xl font-light text-gold mb-2 group-hover:scale-110 transition-transform duration-500 relative">
        {displayValue}<span>{suffix}</span>
      </p>
      <p className="text-[11px] uppercase tracking-[0.2em] font-body font-light text-[#707076] group-hover:text-[#A1A1A5] transition-colors duration-500 relative">
        {label}
      </p>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section data-testid="stats-section" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#111114] overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      />
      <div className="absolute top-1/2 left-0 w-32 h-32 border border-gold/5 rotate-45 -translate-x-16 -translate-y-16" />
      <div className="absolute top-1/2 right-0 w-32 h-32 border border-gold/5 rotate-45 translate-x-16 -translate-y-16" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
              data-testid={`stat-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
