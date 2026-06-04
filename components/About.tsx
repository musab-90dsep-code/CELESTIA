'use client';

import ownerImg from '../assets/owner.png';

interface AboutProps {
  isClassicDark: boolean;
  scrollTo: (id: string) => void;
  pageData?: any;
}

export default function About({ isClassicDark, scrollTo, pageData }: AboutProps) {
  return (
    <section
      id="about"
      className={`py-12 relative overflow-hidden transition-colors duration-500 ${isClassicDark ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'
        }`}
    >
      {/* Background Mandala Pattern - Opacity adjusted for clean look */}
      <div
        className={`absolute inset-0 opacity-[0.04] pointer-events-none ${isClassicDark ? 'invert' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='50' fill='none' stroke='%23000' stroke-width='0.8'/%3E%3Cpath d='M60 0v120M0 60h120' stroke='%23000' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          backgroundPosition: 'left center'
        }}
      />

      {/* Main Container: Shifted slightly right and well-padded */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">

        {/* Centered Heading */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-amber-500">
            The Visionary
          </span>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Title, Owner Image, and Name - Shifted further right */}
          <div className="lg:col-span-5 flex flex-col space-y-6 pl-8 sm:pl-16 lg:pl-20">

            <div className="flex flex-col space-y-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl">
                <img
                  src={ownerImg.src}
                  alt="Hotel Owner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              </div>
              <div className="pl-1">
                <h4 className={`font-serif text-lg font-bold tracking-wide ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
                  {pageData?.ownerName || 'Al-Haj Muhammad Yunus'}
                </h4>
                <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-amber-500 mt-1">
                  Owner & Chairman
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Islami Bank Corporate Narrative (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 items-start lg:pl-6">
            <p className={`text-sm sm:text-base leading-relaxed font-sans font-normal ${isClassicDark ? 'text-stone-300' : 'text-stone-700'
              }`}>
              {pageData?.ownerMessage || `Islami Bank Bangladesh PLC (IBBPLC) is the largest commercial bank of Bangladesh. It is the first Shariah-based scheduled commercial bank in the South and South-East Asia region established in March 1983. With 400 branches, 271 sub-branches & 2,793 Agent Banking Outlets, the Bank possesses the largest branch network among the private sector banks in Bangladesh.`}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}