import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroScene from '@/components/HeroScene';
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  return (
    <section data-testid="hero-section" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* 3D Background (React Three Fiber) */}
      <HeroScene />

      {/* Gradient Overlay - MANDATORY per design guidelines */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/30 to-transparent" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Content */}
      <div className="relative z-10 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 max-w-5xl">
        {/* Overline */}
        <motion.div
          className="mb-6"
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeInUp}
        >
          <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold">
            Exclusive Portfolio
          </span>
          <div className="w-16 h-px bg-gold/40 mt-3" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter leading-[0.95] text-[#F3F3F1] mb-6"
          initial="hidden"
          animate="visible"
          custom={0.4}
          variants={fadeInUp}
        >
          Where Architecture
          <br />
          Meets <span className="italic text-gold">Artistry</span>
        </motion.h1>

        {/* Sub text */}
        <motion.p
          className="font-body font-light text-base md:text-lg text-[#A1A1A5] max-w-lg leading-relaxed mb-10"
          initial="hidden"
          animate="visible"
          custom={0.6}
          variants={fadeInUp}
        >
          Curating the world's most extraordinary residences for discerning
          collectors of architectural excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial="hidden"
          animate="visible"
          custom={0.8}
          variants={fadeInUp}
        >
          <Link
            to="/properties"
            data-testid="hero-cta-explore"
            className="border border-gold text-gold hover:bg-gold hover:text-[#0A0A0C] transition-all duration-300 px-8 py-4 uppercase tracking-[0.2em] text-xs font-body font-medium"
          >
            Explore Collection
          </Link>
          <Link
            to="/showcase"
            data-testid="hero-cta-showcase"
            className="bg-white/5 hover:bg-white/10 text-[#F3F3F1] backdrop-blur-md border border-white/10 transition-all duration-300 px-8 py-4 uppercase tracking-[0.2em] text-xs font-body"
          >
            3D Showcase
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#707076] font-body">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
