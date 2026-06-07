'use client';

import { Crown, Heart } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

interface FooterProps {
  isClassicDark: boolean;
  scrollTo: (id: string) => void;
  onAdminClick?: () => void;
  pageData?: any;
}

export default function Footer({ isClassicDark, scrollTo, onAdminClick, pageData }: FooterProps) {
  return (
    <footer className="bg-stone-950 border-t border-amber-500/15 text-stone-400 font-sans" id="hotel-footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Column 1: Brand & Navigation (7 Cols) */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="border border-amber-500/30 bg-stone-900 rounded-xs flex items-center justify-center transition-colors overflow-hidden w-9 h-9 p-0">
                <img src={pageData?.logoUrl || logoImg.src} alt="Logo" className="w-full h-full object-cover" />
              </span>
              <span className="font-serif font-bold text-lg tracking-widest text-white">
                {pageData?.hotelName || 'SAMAWET AL KHALEJ'}
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed max-w-md">
              Bespoke luxury residential living bridging security, serenity, and legendary 5-star service. Experience the zenith of hospitality.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              <button onClick={() => scrollTo('about')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">The Visionary</button>
              <button onClick={() => scrollTo('management')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">Management</button>
              <button onClick={() => scrollTo('team')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">Team</button>
              <button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">Services</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">Contact</button>
              {onAdminClick && (
                <button
                  onClick={onAdminClick}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400 font-semibold border-l border-stone-800 pl-4"
                  id="footer-admin-link"
                >
                  Admin Panel
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Tech Partner Marketing - Hasanah Tech Solution (6 Cols) */}
          <div className="md:col-span-6 space-y-4 border-t md:border-t-0 md:border-l border-stone-800 pt-6 md:pt-0 md:pl-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-500 block">
              Technology Partner & Digital Architect
            </span>
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              {pageData?.techPartnerName || 'Hasanah Tech Solution'}
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed max-w-md">
              Crafting premium digital platforms, robust web systems, custom software solutions, and high-performance applications for leading brands globally. Transforming visions into state-of-the-art software realities.
            </p>
            <div className="text-xs">
              <span className="text-stone-600">Explore Services: </span>
              <a
                href="https://saudibusiness.info"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:text-amber-350 hover:underline font-semibold"
              >
                {(pageData?.techPartnerUrl || 'https://saudibusiness.info').replace(/^https?:\/\//, '')} &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Simplified Copyright line */}
      <div className="bg-stone-950 py-6 border-t border-stone-900" id="footer-copyright-subline">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p className="font-sans">
            &copy; {new Date().getFullYear()} {pageData?.hotelName || 'SAMAWET AL KHALEJ'}. All Rights Reserved.
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="ml-2 text-stone-600 hover:text-amber-500 hover:underline transition-colors cursor-pointer font-medium"
              >
                Admin
              </button>
            )}
          </p>
          <p className="flex items-center gap-1.5 font-sans">
            Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by{' '}
            <a
              href="https://saudibusiness.info"
              target="_blank"
              rel="noreferrer"
              className="text-stone-400 hover:text-amber-400 hover:underline font-semibold"
            >
               SAUDI BUSINESS  CONSULTANCY
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
