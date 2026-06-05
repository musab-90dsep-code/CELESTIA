'use client';

import { Crown, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  scrollTo: (id: string) => void;
  isClassicDark: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isScrolled: boolean;
  pageData?: any;
}

export default function Navbar({
  activeSection,
  scrollTo,
  isClassicDark,
  mobileMenuOpen,
  setMobileMenuOpen,
  isScrolled,
  pageData
}: NavbarProps) {
  return (
    <header id="header-navbar" className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
      ? `py-4 ${isClassicDark ? 'bg-stone-950 border-b border-amber-500/10' : 'bg-white border-b border-stone-200'} shadow-lg`
      : `py-5 ${isClassicDark ? 'bg-stone-950 border-b border-amber-500/5' : 'bg-white border-b border-stone-100'} shadow-xs`
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo / Branding */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollTo('hero')} id="branding-logo">
          <span className={`w-9 h-9 border rounded-xs flex items-center justify-center transition-colors overflow-hidden ${isClassicDark ? 'border-amber-500/30 bg-stone-900' : 'border-stone-200 bg-stone-950 text-white'
            } ${pageData?.logoUrl ? 'p-0' : 'p-2'}`}>
            {pageData?.logoUrl ? (
              <img src={pageData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Crown className="w-5 h-5 text-amber-400" />
            )}
          </span>
          <div className="flex flex-col">
            <span className={`font-serif text-lg tracking-widest font-bold ${isClassicDark
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-amber-400 to-amber-200'
              : 'text-stone-950'
              }`}>
              {pageData?.hotelName || 'CELESTIA GRAND'}
            </span>
            <span className={`text-[9px] uppercase tracking-[0.25em] font-sans font-medium ${isClassicDark ? 'text-amber-500' : 'text-amber-700'
              }`}>
              Residential Hotel
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8" id="desktop-nav">
          {['home', 'about', 'management', 'team', 'services', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollTo(section === 'home' ? 'hero' : section)}
              className={`text-xs uppercase tracking-widest transition-all duration-300 relative py-1 capitalize font-sans ${activeSection === (section === 'home' ? 'hero' : section)
                ? 'text-amber-400 font-semibold'
                : `${isClassicDark ? 'text-stone-300 hover:text-stone-100' : 'text-stone-600 hover:text-stone-950'}`
                }`}
              id={`navlink-${section}`}
            >
              {section}
              {activeSection === (section === 'home' ? 'hero' : section) && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Header Panel (CTA, Mobile Trigger) */}
        <div className="flex items-center space-x-4">

          {/* Book Now Button */}
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center px-4 py-2 border border-amber-500/40 text-xs tracking-wider uppercase bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-stone-950 transition-all duration-300 font-sans font-semibold rounded-xs cursor-pointer"
            id="header-cta-booking"
          >
            Book Now
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-300 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
            id="mobile-menu-trigger"
          >
            <Menu className={`w-6 h-6 ${isClassicDark ? 'text-stone-100' : 'text-stone-900'}`} />
          </button>
        </div>
      </div>

      {/* Mobile slide-out nav screen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t ${isClassicDark ? 'bg-stone-950 border-stone-900' : 'bg-white border-stone-200'} px-4 py-4`}
            id="mobile-dropdown-menu"
          >
            <div className="flex flex-col space-y-3">
              {['home', 'about', 'management', 'team', 'services', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollTo(section === 'home' ? 'hero' : section)}
                  className={`text-left text-xs uppercase tracking-widest py-2 transition-all font-sans ${activeSection === (section === 'home' ? 'hero' : section) ? 'text-amber-400 font-bold' : 'text-stone-400'
                    }`}
                >
                  • {section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
