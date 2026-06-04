'use client';

import { ArrowUpRight } from 'lucide-react';
import { rooms } from '../lib/data';

interface RoomsProps {
  isClassicDark: boolean;
  selectRoomAndScroll: (roomId: string) => void;
}

export default function Rooms({ isClassicDark, selectRoomAndScroll }: RoomsProps) {
  return (
    <section id="rooms" className={`py-24 ${isClassicDark ? 'bg-stone-900' : 'bg-white'} border-t border-amber-500/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="rooms-section-header">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-500 block mb-2">
            Unrivaled Comfort Sanctuary
          </span>
          <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
            The Residence Collection
          </h2>
          <p className={`text-xs sm:text-sm ${isClassicDark ? 'text-stone-400' : 'text-stone-600'} font-sans`}>
            Every space is meticulously planned, acoustically treated to under 20dB internal noise, and furnished with customized timber layouts.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="rooms-list-grid">
          {rooms.map((room) => (
            <div 
              key={room.id}
              className={`flex flex-col h-full rounded-sm overflow-hidden border transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl ${
                isClassicDark 
                  ? 'bg-stone-950 border-stone-850 hover:border-amber-550/30' 
                  : 'bg-stone-50 border-stone-200 hover:border-amber-450/40'
              }`}
              id={`room-card-${room.id}`}
            >
              {/* Room Image Container */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category badging */}
                <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest text-[9px] px-2.5 py-1 rounded-xs">
                  {room.type}
                </div>
                {/* Pricing Badge overlapping image */}
                <div className="absolute bottom-4 right-4 bg-stone-950/90 text-amber-400 font-serif border border-amber-500/20 px-3 py-1.5 rounded-xs text-sm font-semibold backdrop-blur-xs">
                  <span className="text-stone-200 text-xs">from</span> ${room.price} <span className="text-stone-400 text-[10px] font-sans uppercase">/ Night</span>
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                
                <div>
                  <h3 className={`font-serif text-xl sm:text-2xl font-semibold mb-1 ${isClassicDark ? 'text-stone-100' : 'text-stone-900'}`}>
                    {room.name}
                  </h3>
                  <div className={`flex items-center space-x-2 text-xs font-mono tracking-wide ${
                    isClassicDark ? 'text-amber-400' : 'text-amber-800'
                  }`}>
                    <span>{room.specs.size}</span>
                    <span className="text-[10px] opacity-70">•</span>
                    <span>{room.specs.view}</span>
                    <span className="text-[10px] opacity-70">•</span>
                    <span>{room.specs.guests}</span>
                  </div>
                </div>

                <p className={`text-xs sm:text-sm font-sans line-clamp-3 leading-relaxed flex-grow ${isClassicDark ? 'text-stone-400' : 'text-stone-650'}`}>
                  {room.description}
                </p>

                {/* Highlights Bullet List */}
                <div className={`space-y-1.5 pt-3 border-t ${
                  isClassicDark ? 'border-stone-850' : 'border-stone-200/65'
                }`}>
                  {room.features.slice(0, 3).map((feat, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                      <span className={isClassicDark ? 'text-stone-300' : 'text-stone-700'}>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action row with booking bridge */}
                <button
                  onClick={() => selectRoomAndScroll(room.id)}
                  className="w-full mt-2 py-3 border border-amber-500 bg-amber-550/5 text-amber-400 hover:bg-amber-500 hover:text-stone-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xs cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Instant Book</span>
                  <ArrowUpRight className="w-3" />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
