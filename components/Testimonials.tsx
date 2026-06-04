'use client';

import { Star } from 'lucide-react';
import { testimonials } from '../lib/data';

interface TestimonialsProps {
  isClassicDark: boolean;
}

export default function Testimonials({ isClassicDark }: TestimonialsProps) {
  return (
    <section id="testimonials" className={`py-24 ${isClassicDark ? 'bg-stone-950' : 'bg-stone-100'} border-t border-amber-500/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16" id="testimonials-header">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-500 block mb-2">
            Words From Our Dignitaries
          </span>
          <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
            The Celestia Registry
          </h2>
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        {/* Testimonial grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="testimonials-grid">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className={`p-8 rounded-sm border flex flex-col justify-between space-y-6 transition-all duration-300 ${
                isClassicDark 
                  ? 'bg-stone-900 border-stone-850 hover:bg-stone-900/60' 
                  : 'bg-white border-stone-200 hover:shadow-md'
              }`}
              id={`testimonial-card-${test.id}`}
            >
              {/* Star rating and text */}
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className={`text-sm tracking-wide leading-relaxed font-sans ${isClassicDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  &ldquo;{test.text}&rdquo;
                </p>
              </div>

              {/* Avatar detail block */}
              <div className="flex items-center space-x-4 pt-4 border-t border-stone-800/15 dark:border-stone-100/10">
                <img 
                  src={test.avatar} 
                  alt={test.name} 
                  className="w-11 h-11 rounded-full object-cover border border-amber-500/20"
                />
                <div>
                  <h4 className={`text-xs uppercase tracking-widest font-bold ${isClassicDark ? 'text-stone-100' : 'text-stone-900'}`}>
                    {test.name}
                  </h4>
                  <span className="text-[10px] text-amber-500 block uppercase font-mono">
                    {test.role}
                  </span>
                  <span className="text-[9px] text-stone-500 font-sans block mt-0.5">
                    {test.stayDate}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
