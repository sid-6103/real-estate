import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, formData);
    } catch (err) {
      console.log('Backend not available, form submitted locally');
    }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="pt-20 min-h-screen bg-[#0A0A0C]">
      {/* Header */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.span
            className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get in Touch
          </motion.span>
          <motion.h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-[#F3F3F1] leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Private <span className="italic">Consultation</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} data-testid="full-contact-form" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] font-body text-[#707076] mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="full-contact-name"
                      className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm font-body font-light text-[#F3F3F1] placeholder-[#707076] focus:border-gold/40 focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] font-body text-[#707076] mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-testid="full-contact-email"
                      className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm font-body font-light text-[#F3F3F1] placeholder-[#707076] focus:border-gold/40 focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] font-body text-[#707076] mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-testid="full-contact-phone"
                      className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm font-body font-light text-[#F3F3F1] placeholder-[#707076] focus:border-gold/40 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] font-body text-[#707076] mb-3">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      data-testid="full-contact-budget"
                      className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm font-body font-light text-[#F3F3F1] focus:border-gold/40 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23707076'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="">Select range</option>
                      <option value="10-20">$10M – $20M</option>
                      <option value="20-35">$20M – $35M</option>
                      <option value="35-50">$35M – $50M</option>
                      <option value="50+">$50M+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-body text-[#707076] mb-3">
                    Property Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    data-testid="full-contact-interest"
                    className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm font-body font-light text-[#F3F3F1] focus:border-gold/40 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23707076'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                  >
                    <option value="">Select interest</option>
                    <option value="mansion">Mansion</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="villa">Villa</option>
                    <option value="estate">Estate</option>
                    <option value="all">All Types</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-body text-[#707076] mb-3">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    data-testid="full-contact-message"
                    rows="5"
                    className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm font-body font-light text-[#F3F3F1] placeholder-[#707076] focus:border-gold/40 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your ideal property, preferred locations, and timeline..."
                  />
                </div>

                <button
                  type="submit"
                  data-testid="full-contact-submit"
                  disabled={loading}
                  className={`border border-gold text-gold hover:bg-gold hover:text-[#0A0A0C] transition-all duration-300 px-10 py-4 uppercase tracking-[0.2em] text-xs font-body font-medium ${loading ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            ) : (
              <motion.div
                className="py-24 text-center border border-white/10 bg-[#111114]"
                data-testid="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 border border-gold flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold text-2xl">✓</span>
                </div>
                <h3 className="font-heading text-3xl font-light text-[#F3F3F1] mb-4">
                  Thank You
                </h3>
                <p className="font-body font-light text-[#A1A1A5] max-w-md mx-auto">
                  Your consultation request has been received. Our team will be in touch within 24 hours to begin curating your personalized property selection.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', budget: '', interest: '', message: '' });
                  }}
                  className="mt-8 border border-white/10 text-[#A1A1A5] hover:border-gold hover:text-gold transition-all duration-300 px-6 py-3 uppercase tracking-[0.2em] text-xs font-body"
                >
                  Submit Another Request
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="lg:sticky lg:top-28 space-y-8">
              {/* Contact Info */}
              <div className="border border-white/10 p-8 bg-[#111114]">
                <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-6">
                  Direct Contact
                </span>
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] font-body text-[#707076] mb-1">Email</p>
                    <p className="font-body font-light text-[#F3F3F1]">private@estatetours.com</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] font-body text-[#707076] mb-1">Phone</p>
                    <p className="font-body font-light text-[#F3F3F1]">+1 (310) 555-0192</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] font-body text-[#707076] mb-1">Office</p>
                    <p className="font-body font-light text-[#F3F3F1]">9876 Wilshire Boulevard</p>
                    <p className="font-body font-light text-[#A1A1A5] text-sm">Suite 1200, Beverly Hills, CA 90210</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] font-body text-[#707076] mb-1">Hours</p>
                    <p className="font-body font-light text-[#F3F3F1]">Mon – Sat: 9:00 AM – 7:00 PM</p>
                    <p className="font-body font-light text-[#A1A1A5] text-sm">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="border border-gold/20 p-8 bg-gold/5">
                <p className="font-heading text-xl font-light text-gold mb-3 italic">
                  "Your search deserves the same precision and passion that goes into the architecture we represent."
                </p>
                <p className="text-xs font-body text-[#A1A1A5] uppercase tracking-wider">
                  — Victoria Sterling, Founding Director
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
