import React from 'react';
import { motion } from 'framer-motion';

const AboutPreview = () => {
  return (
    <section data-testid="about-preview" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#0A0A0C] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
        {/* Image Side */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden border border-white/10 group">
            <img
              src="https://images.pexels.com/photos/33685855/pexels-photo-33685855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Luxury interior"
              className="w-full aspect-[3/4] object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/40 to-transparent" />
            {/* Shimmer overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s] ease-out" />
          </div>
          {/* Decorative border */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        {/* Text Side */}
        <div className="lg:col-span-7 lg:pl-8">
          <motion.span
            className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Estate Tours
          </motion.span>

          <motion.h2
            className="font-heading text-4xl sm:text-5xl font-light tracking-tight text-[#F3F3F1] leading-tight mb-8"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Redefining Luxury
            <br />
            Real Estate <span className="italic">Experience</span>
          </motion.h2>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="font-body font-light text-base text-[#A1A1A5] leading-relaxed">
              For over fifteen years, Estate Tours has been the trusted curator for discerning buyers seeking the world's most exceptional properties. Our approach transcends traditional real estate — we craft immersive experiences that reveal the soul of each residence.
            </p>
            <p className="font-body font-light text-base text-[#A1A1A5] leading-relaxed">
              From the sun-drenched coastlines of Malibu to the towering penthouses of Manhattan, every property in our collection has been personally vetted for architectural significance, investment potential, and that intangible quality that transforms a house into a legacy.
            </p>
          </motion.div>

          {/* Highlight boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {[
              { title: 'Bespoke', desc: 'Private viewings tailored to your vision' },
              { title: 'Global', desc: 'Properties across 12 world-class markets' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="border border-white/10 p-5 hover:border-gold/30 hover:bg-gold/5 transition-all duration-500 cursor-default group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.7 }}
              >
                <p className="font-heading text-2xl text-gold mb-1 group-hover:translate-x-1 transition-transform duration-300">{item.title}</p>
                <p className="text-xs font-body text-[#707076] uppercase tracking-wider group-hover:text-[#A1A1A5] transition-colors duration-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="/about"
            data-testid="about-cta"
            className="inline-block mt-10 border border-gold text-gold hover:bg-gold hover:text-[#0A0A0C] hover:shadow-[0_0_30px_rgba(193,154,107,0.2)] transition-all duration-300 px-8 py-4 uppercase tracking-[0.2em] text-xs font-body font-medium"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            Our Story
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
