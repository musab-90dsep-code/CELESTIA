'use client';

import ownerImg from '../assets/owner.png';
import { Quote, Phone, Mail } from 'lucide-react';

interface AboutProps {
  isClassicDark: boolean;
  scrollTo: (id: string) => void;
  pageData?: any;
}

export default function About({ isClassicDark, scrollTo, pageData }: AboutProps) {
  return (
    <section
      id="about"
      className={`py-16 relative overflow-hidden transition-colors duration-500 ${isClassicDark ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'
        }`}
    >
      {/* Background Mandala Pattern */}
      <div
        className={`absolute inset-0 opacity-[0.04] pointer-events-none ${isClassicDark ? 'invert' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='50' fill='none' stroke='%23000' stroke-width='0.8'/%3E%3Cpath d='M60 0v120M0 60h120' stroke='%23000' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          backgroundPosition: 'left center'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">

        {/* Centered Heading */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-amber-500">
            The Visionary
          </span>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Premium Owner Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className={`relative p-6 rounded-3xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] border ${
              isClassicDark
                ? 'bg-stone-900/40 border-stone-800/80 backdrop-blur-md shadow-2xl'
                : 'bg-white border-stone-200/80 shadow-xl'
            } w-full max-w-lg`}>

              {/* Decorative Accent Corners */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 rounded-tr-md" />
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 rounded-bl-md" />
              </div>

              <div className="flex flex-col items-center text-center space-y-6">
                {/* Image Wrapper with Glow & Ring */}
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-300 opacity-20 group-hover:opacity-50 transition duration-500 blur-sm" />
                  <div className="relative w-72 sm:w-80 lg:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border border-amber-500/20 bg-stone-950">
                    <img
                      src={pageData?.ownerImageUrl || ownerImg.src}
                      alt="Hotel Owner"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-110 group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Owner Info */}
                <div className="space-y-2">
                  <h4 className={`font-serif text-xl font-bold tracking-wide ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
                    {pageData?.ownerName || 'Al-Haj Muhammad Yunus'}
                  </h4>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="h-[1px] w-4 bg-amber-500/50" />
                    <p className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-amber-500">
                      Owner & Chairman
                    </p>
                    <span className="h-[1px] w-4 bg-amber-500/50" />
                  </div>
                  {(pageData?.ownerPhone || pageData?.ownerEmail) && (
                    <div className="flex flex-col items-center gap-1.5 mt-3 text-xs text-stone-450 font-sans">
                      {pageData?.ownerPhone && (
                        <a href={`tel:${pageData.ownerPhone}`} className="hover:text-amber-500 transition flex items-center gap-2 justify-center">
                          <Phone className="w-3.5 h-3.5 text-amber-500" />
                          <span>{pageData.ownerPhone}</span>
                        </a>
                      )}
                      {pageData?.ownerEmail && (
                        <a href={`mailto:${pageData.ownerEmail}`} className="hover:text-amber-500 transition flex items-center gap-2 justify-center">
                          <Mail className="w-3.5 h-3.5 text-amber-500" />
                          <span>{pageData.ownerEmail}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Message styled as elegant blockquote */}
          <div className="lg:col-span-7 flex flex-col space-y-6 items-start lg:pl-6 relative">
            <div className="absolute -top-6 -left-2 opacity-10 text-amber-500 pointer-events-none">
              <Quote className="w-16 h-16" />
            </div>
            
            <p className={`text-sm sm:text-base leading-relaxed font-serif italic ${isClassicDark ? 'text-stone-300' : 'text-stone-700'
              }`}>
              "{pageData?.ownerMessage || `Islami Bank Bangladesh PLC (IBBPLC) is the largest commercial bank of Bangladesh. It is the first Shariah-based scheduled commercial bank in the South and South-East Asia region established in March 1983. With 400 branches, 271 sub-branches & 2,793 Agent Banking Outlets, the Bank possesses the largest branch network among the private sector banks in Bangladesh.`}"
            </p>
            
            <div className="flex items-center space-x-3 pt-2">
              <div className="h-[2px] w-8 bg-amber-500" />
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-amber-500">
                Chairman's Message
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}