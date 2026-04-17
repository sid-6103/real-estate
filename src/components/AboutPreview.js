import React from 'react';

const AboutPreview = () => {
  return (
    <section data-testid="about-preview" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#0A0A0C] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
        {/* Image Side */}
        <div className="lg:col-span-5 relative">
          <div className="relative overflow-hidden border border-white/10">
            <img
              src="https://images.pexels.com/photos/33685855/pexels-photo-33685855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Luxury interior"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/40 to-transparent" />
          </div>
          {/* Decorative border */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10" />
        </div>

        {/* Text Side */}
        <div className="lg:col-span-7 lg:pl-8">
          <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-6">
            About Estate Tours
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-tight text-[#F3F3F1] leading-tight mb-8">
            Redefining Luxury
            <br />
            Real Estate <span className="italic">Experience</span>
          </h2>
          <div className="space-y-5">
            <p className="font-body font-light text-base text-[#A1A1A5] leading-relaxed">
              For over fifteen years, Estate Tours has been the trusted curator for discerning buyers seeking the world's most exceptional properties. Our approach transcends traditional real estate — we craft immersive experiences that reveal the soul of each residence.
            </p>
            <p className="font-body font-light text-base text-[#A1A1A5] leading-relaxed">
              From the sun-drenched coastlines of Malibu to the towering penthouses of Manhattan, every property in our collection has been personally vetted for architectural significance, investment potential, and that intangible quality that transforms a house into a legacy.
            </p>
          </div>

          {/* Highlight boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <div className="border border-white/10 p-5 hover:border-gold/30 transition-colors duration-500">
              <p className="font-heading text-2xl text-gold mb-1">Bespoke</p>
              <p className="text-xs font-body text-[#707076] uppercase tracking-wider">Private viewings tailored to your vision</p>
            </div>
            <div className="border border-white/10 p-5 hover:border-gold/30 transition-colors duration-500">
              <p className="font-heading text-2xl text-gold mb-1">Global</p>
              <p className="text-xs font-body text-[#707076] uppercase tracking-wider">Properties across 12 world-class markets</p>
            </div>
          </div>

          <a
            href="/about"
            data-testid="about-cta"
            className="inline-block mt-10 border border-gold text-gold hover:bg-gold hover:text-[#0A0A0C] transition-all duration-300 px-8 py-4 uppercase tracking-[0.2em] text-xs font-body font-medium"
          >
            Our Story
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
