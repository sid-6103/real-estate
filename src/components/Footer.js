import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-gold flex items-center justify-center">
                <span className="font-heading text-gold text-lg font-light">E</span>
              </div>
              <span className="font-heading text-xl tracking-wider text-[#F3F3F1]">
                ESTATE TOURS
              </span>
            </div>
            <p className="font-body font-light text-sm text-[#707076] leading-relaxed max-w-xs">
              Curating extraordinary residences for those who demand architectural perfection and uncompromising luxury.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-body font-medium text-gold mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {["Properties", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-sm font-body font-light text-[#707076] hover:text-[#F3F3F1] transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-body font-medium text-gold mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              {["Mansions", "Penthouses", "Villas", "Estates"].map((item) => (
                <li key={item}>
                  <Link
                    to="/properties"
                    className="text-sm font-body font-light text-[#707076] hover:text-[#F3F3F1] transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-body font-medium text-gold mb-6">
              Connect
            </h4>
            <div className="space-y-3">
              <p className="text-sm font-body font-light text-[#707076]">
                contact@estatetours.com
              </p>
              <p className="text-sm font-body font-light text-[#707076]">
                +1 (310) 555-0192
              </p>
              <p className="text-sm font-body font-light text-[#707076]">
                Beverly Hills, CA 90210
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-body font-light text-[#707076] tracking-wider">
            © 2026 Estate Tours. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <button
                key={item}
                className="text-[11px] font-body font-light text-[#707076] hover:text-[#A1A1A5] transition-colors duration-300 tracking-wider uppercase"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
