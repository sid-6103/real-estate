import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: "Properties", href: "/properties" },
  { name: "Showcase", href: "/showcase" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      data-testid="header-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-[#0A0A0C]/80 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" data-testid="logo">
          <div className="w-8 h-8 border border-gold flex items-center justify-center">
            <span className="font-heading text-gold text-lg font-light">E</span>
          </div>
          <span className="font-heading text-xl tracking-wider text-[#F3F3F1] group-hover:text-gold transition-colors duration-300">
            ESTATE TOURS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              data-testid={`nav-${link.name.toLowerCase()}`}
              className={`text-xs uppercase tracking-[0.2em] font-body font-light transition-colors duration-300 ${
                location.pathname === link.href
                  ? 'text-gold'
                  : 'text-[#A1A1A5] hover:text-[#F3F3F1]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            data-testid="nav-cta"
            className="border border-white/10 backdrop-blur-md px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[#F3F3F1] hover:border-gold hover:text-gold transition-all duration-300"
          >
            Schedule Tour
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-px bg-[#F3F3F1] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`block w-6 h-px bg-[#F3F3F1] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-[#F3F3F1] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-[#0A0A0C]/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm uppercase tracking-[0.2em] font-body font-light transition-colors duration-300 ${
                location.pathname === link.href
                  ? 'text-gold'
                  : 'text-[#A1A1A5] hover:text-[#F3F3F1]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="border border-gold text-gold px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-[#0A0A0C] transition-all duration-300 mt-2"
          >
            Schedule Tour
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
