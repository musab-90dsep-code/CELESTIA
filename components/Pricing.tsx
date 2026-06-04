'use client';

import { Sparkles } from 'lucide-react';

interface PricingProps {
  isClassicDark: boolean;
  selectRoomAndScroll: (roomId: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  scrollTo: (id: string) => void;
}

export default function Pricing({ isClassicDark, selectRoomAndScroll, setFormData, scrollTo }: PricingProps) {
  return (
    <section id="pricing" className={`py-24 ${isClassicDark ? 'bg-stone-900' : 'bg-white'} border-t border-amber-500/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16" id="pricing-header">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-500 block mb-2">
            Bespoke Investment Values
          </span>
          <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
            Season Rate Ledger
          </h2>
          <p className={`text-xs sm:text-sm ${isClassicDark ? 'text-stone-400' : 'text-stone-600'} font-sans`}>
            Rates are fully transparent and include master organic breakfast, sauna credits, and personalized concierge.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className={`overflow-x-auto shadow-2xl rounded-sm border ${
          isClassicDark ? 'border-amber-500/15' : 'border-stone-250 shadow-sm'
        }`} id="pricing-table-wrapper">
          <table className="w-full text-left border-collapse min-w-[600px]">
            
            {/* Table Column Headers */}
            <thead>
              <tr className={`${isClassicDark ? 'bg-stone-950 text-amber-400' : 'bg-stone-100 text-stone-900'} uppercase text-[10px] font-sans tracking-[0.2em] border-b ${
                isClassicDark ? 'border-amber-500/15' : 'border-stone-250'
              }`}>
                <th className="py-5 px-6 font-semibold">Residency Suite Class</th>
                <th className="py-5 px-6 font-semibold">Standard Rate</th>
                <th className="py-5 px-6 font-semibold">Peak Summer (June-Aug)</th>
                <th className="py-5 px-6 font-semibold">Special Retreats Perks</th>
                <th className="py-5 px-6 font-semibold text-right">Action Desk</th>
              </tr>
            </thead>

            {/* Table Content Rows */}
            <tbody className={`divide-y ${
              isClassicDark ? 'divide-amber-500/10 text-stone-200' : 'divide-stone-200 text-stone-800'
            }`}>
              
              {/* DELUXE ROOM */}
              <tr className={`transition-colors py-4 ${isClassicDark ? 'hover:bg-stone-850/60' : 'hover:bg-stone-50'}`}>
                <td className="py-6 px-6 font-serif">
                  <span className="text-sm font-semibold block uppercase">Deluxe Serenity Suite</span>
                  <span className="text-[10px] text-stone-500 uppercase font-sans">Ideal for medium stays</span>
                </td>
                <td className="py-6 px-6 font-mono text-xs font-semibold">$550 <span className="text-[9px] text-stone-500 uppercase font-sans font-normal">/ Night</span></td>
                <td className={`py-6 px-6 font-mono text-xs ${isClassicDark ? 'text-amber-400/90' : 'text-amber-850 font-semibold'}`}>$650 <span className="text-[9px] text-stone-500 uppercase font-sans font-normal">/ Night</span></td>
                <td className={`py-6 px-6 text-xs font-sans ${isClassicDark ? 'text-stone-300' : 'text-stone-600'}`}>
                  • Fast Wellness Hydrotherapy <br />
                  • Breakfast curation included
                </td>
                <td className="py-6 px-6 text-right">
                  <button 
                    onClick={() => selectRoomAndScroll('deluxe')}
                    className={`px-3 py-1.5 border text-[9px] tracking-widest font-semibold uppercase transition-colors rounded-xs cursor-pointer ${
                      isClassicDark 
                        ? 'border-amber-500/40 bg-amber-500/5 text-amber-400 hover:bg-amber-500 hover:text-stone-950' 
                        : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-950 hover:text-white shadow-xs'
                    }`}
                  >
                    Reserve
                  </button>
                </td>
              </tr>

              {/* FAMILY ROOM */}
              <tr className={`transition-colors py-4 ${isClassicDark ? 'hover:bg-stone-850/60' : 'hover:bg-stone-50'}`}>
                <td className="py-6 px-6 font-serif">
                  <span className="text-sm font-semibold block uppercase">Signature Manor Suite</span>
                  <span className="text-[10px] text-stone-500 uppercase font-sans">Great for luxury families</span>
                </td>
                <td className="py-6 px-6 font-mono text-xs font-semibold">$850 <span className="text-[9px] text-stone-500 uppercase font-sans font-normal">/ Night</span></td>
                <td className={`py-6 px-6 font-mono text-xs ${isClassicDark ? 'text-amber-400/90' : 'text-amber-850 font-semibold'}`}>$990 <span className="text-[9px] text-stone-500 uppercase font-sans font-normal">/ Night</span></td>
                <td className={`py-6 px-6 text-xs font-sans ${isClassicDark ? 'text-stone-300' : 'text-stone-600'}`}>
                  • 2 complimentary wellness massages <br />
                  • Daily child play curator access
                </td>
                <td className="py-6 px-6 text-right">
                  <button 
                    onClick={() => selectRoomAndScroll('family')}
                    className={`px-3 py-1.5 border text-[9px] tracking-widest font-semibold uppercase transition-colors rounded-xs cursor-pointer ${
                      isClassicDark 
                        ? 'border-amber-500/40 bg-amber-500/5 text-amber-400 hover:bg-amber-500 hover:text-stone-950' 
                        : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-950 hover:text-white shadow-xs'
                    }`}
                  >
                  </button>
                </td>
              </tr>

              {/* VIP PRESIDENTIAL SUITE */}
              <tr className={`transition-colors py-4 ${isClassicDark ? 'hover:bg-stone-850/60' : 'hover:bg-stone-50'}`}>
                <td className="py-6 px-6 font-serif">
                  <span className={`text-sm font-bold block uppercase flex items-center gap-1 ${
                    isClassicDark ? 'text-amber-400' : 'text-amber-800'
                  }`}>
                    Celestia Presidential Residence
                    <Sparkles className="w-3.5 h-3.5 inline-block text-amber-500" />
                  </span>
                  <span className="text-[10px] text-stone-500 uppercase font-sans">Unrivaled 5-star signature</span>
                </td>
                <td className="py-6 px-6 font-mono text-xs font-semibold">$1,850 <span className="text-[9px] text-stone-550 uppercase font-sans font-normal">/ Night</span></td>
                <td className={`py-6 px-6 font-mono text-xs ${isClassicDark ? 'text-amber-400/90' : 'text-amber-800'}`}>$2,100 <span className="text-[9px] text-stone-550 uppercase font-sans font-normal">/ Night</span></td>
                <td className={`py-6 px-6 text-xs font-sans leading-relaxed ${isClassicDark ? 'text-amber-200 font-medium' : 'text-stone-700 font-semibold'}`}>
                  • Full Dedicated 24/7 Butler Service <br />
                  • Private Pool & airport VIP limousine
                </td>
                <td className="py-6 px-6 text-right">
                  <button 
                    onClick={() => selectRoomAndScroll('vip')}
                    className="px-3 py-1.5 border border-amber-500 text-[9px] tracking-widest font-bold uppercase bg-amber-500 text-stone-950 hover:bg-amber-400 hover:scale-105 transition-all rounded-xs cursor-pointer"
                  >
                    Reserve VIP
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Special Limited Offer Widget */}
        <div className={`mt-12 p-8 rounded-sm flex flex-col md:flex-row items-center justify-between border backdrop-blur-md ${
          isClassicDark 
            ? 'bg-stone-900/90 border-amber-500/20 text-stone-200' 
            : 'bg-white border-stone-250 text-stone-850 shadow-md'
        }`} id="pricing-promotion-banner">
          <div className="mb-6 md:mb-0 max-w-xl">
            <span className="px-2 py-0.5 bg-amber-500 text-stone-950 text-[9px] uppercase tracking-widest font-bold font-sans rounded-xs">
              Limited Oasis Offer
            </span>
            <h3 className={`font-serif text-2xl font-bold mt-2 ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
              Diplomatic Sanctuary package (Stay 5+ Nights)
            </h3>
            <p className={`text-xs mt-1 font-sans ${isClassicDark ? 'text-stone-300' : 'text-stone-600'}`}>
              Book a stay greater than four nights across June 2026 to automatically qualify for a 15% investment rebate, complete Michelin dining credits, and complementary ocean jet-ski rentals.
            </p>
          </div>
          <button 
            onClick={() => {
              setFormData((prev: any) => ({ ...prev, specialRequest: 'CELESTIA GRAND SPECIAL OFFER (Diplomatic Sanctuary Package)' }));
              scrollTo('booking');
            }}
            className="px-6 py-3 bg-amber-500 text-stone-950 text-xs uppercase tracking-widest font-bold rounded-xs cursor-pointer hover:bg-amber-400"
          >
            Qualify Room
          </button>
        </div>

      </div>
    </section>
  );
}
