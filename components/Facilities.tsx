'use client';

import { facilities } from '../lib/data';

interface FacilitiesProps {
  isClassicDark: boolean;
}

export default function Facilities({ isClassicDark }: FacilitiesProps) {
  return (
    <section id="facilities" className={`py-24 ${isClassicDark ? 'bg-stone-950' : 'bg-stone-50'} border-t border-amber-500/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="facilities-header">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-500 block mb-2">
            Unrivaled 5-Star Ambiance
          </span>
          <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
            Residency Privileges
          </h2>
          <p className={`text-xs sm:text-sm ${isClassicDark ? 'text-stone-400' : 'text-stone-600'} font-sans`}>
            We maintain absolute precision of execution, pairing fine digital infrastructure with elegant lifestyle convenience.
          </p>
        </div>

        {/* privileges list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="facilities-bento-grid">
          {facilities.map((fac, idx) => {
            const FacIcon = fac.icon;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-xs border transition-all duration-300 hover:border-amber-500/40 relative overflow-hidden group ${
                  isClassicDark ? 'bg-stone-900 border-stone-850' : 'bg-white border-stone-250 shadow-sm'
                }`}
                id={`facility-item-${idx}`}
              >
                {/* Subtle golden corner light element on parent hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl translate-x-8 -translate-y-8 group-hover:bg-amber-500/10 transition-colors" />

                {/* Icon setting */}
                <div className={`p-3 border rounded-sm w-fit mb-4 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all duration-300 ${
                  isClassicDark 
                    ? 'border-amber-500/20 bg-amber-500/5 text-amber-400' 
                    : 'border-amber-600/25 bg-amber-600/5 text-amber-800'
                }`}>
                  <FacIcon className="w-5 h-5" />
                </div>

                <h3 className={`font-serif text-lg font-semibold mb-2 ${isClassicDark ? 'text-stone-100' : 'text-stone-900'}`}>
                  {fac.title}
                </h3>

                <p className={`text-xs leading-relaxed font-sans ${isClassicDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  {fac.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
