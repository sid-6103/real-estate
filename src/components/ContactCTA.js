import React, { useState } from 'react';

const ContactCTA = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section data-testid="contact-cta-section" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1765439178218-e54dcbb64bcb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvciUyMG5pZ2h0fGVufDB8fHx8MTc3NjQzNDczMnww&ixlib=rb-4.1.0&q=85"
          alt="Luxury architecture"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#0A0A0C]/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-6">
          Begin Your Journey
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F3F3F1] leading-tight mb-6">
          Find Your Next <span className="italic">Masterpiece</span>
        </h2>
        <p className="font-body font-light text-base text-[#A1A1A5] leading-relaxed max-w-2xl mx-auto mb-12">
          Schedule a private consultation with our team. We'll curate a selection of properties matched to your exact vision and lifestyle requirements.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          data-testid="contact-form"
          className="max-w-xl mx-auto space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              data-testid="contact-name"
              className="bg-white/5 border border-white/10 px-5 py-4 text-sm font-body font-light text-[#F3F3F1] placeholder-[#707076] focus:border-gold/40 focus:outline-none transition-colors duration-300 backdrop-blur-sm"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              data-testid="contact-email"
              className="bg-white/5 border border-white/10 px-5 py-4 text-sm font-body font-light text-[#F3F3F1] placeholder-[#707076] focus:border-gold/40 focus:outline-none transition-colors duration-300 backdrop-blur-sm"
              required
            />
          </div>
          <textarea
            placeholder="Tell us about your ideal property..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            data-testid="contact-message"
            rows="4"
            className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm font-body font-light text-[#F3F3F1] placeholder-[#707076] focus:border-gold/40 focus:outline-none transition-colors duration-300 backdrop-blur-sm resize-none"
          />
          <button
            type="submit"
            data-testid="contact-submit"
            className={`w-full border border-gold text-gold hover:bg-gold hover:text-[#0A0A0C] transition-all duration-300 px-8 py-4 uppercase tracking-[0.2em] text-xs font-body font-medium ${
              submitted ? 'bg-gold text-[#0A0A0C]' : ''
            }`}
          >
            {submitted ? '✓ Message Sent' : 'Request Private Consultation'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactCTA;
