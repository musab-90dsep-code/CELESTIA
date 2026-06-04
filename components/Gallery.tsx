'use client';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryItems } from '../lib/data';

interface GalleryProps {
  isClassicDark: boolean;
  lightboxIndex: number | null;
  setLightboxIndex: (index: number | null) => void;
}

export default function Gallery({ isClassicDark, lightboxIndex, setLightboxIndex }: GalleryProps) {
  return (
    <section id="gallery" className={`py-24 ${isClassicDark ? 'bg-stone-900' : 'bg-white'} border-t border-amber-550/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12" id="gallery-header">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-500 block mb-2">
              A Visual Promenade
            </span>
            <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight ${isClassicDark ? 'text-white' : 'text-stone-950'}`}>
              Sanctuary Showcase
            </h2>
          </div>
          <p className={`mt-2 md:mt-0 max-w-xs text-xs ${isClassicDark ? 'text-stone-400' : 'text-stone-600'} font-sans`}>
            Take a virtual promenade across Celestia Grand’s refined spatial designs and curated gastronomy. Click any frame to inspect details.
          </p>
        </div>

        {/* Masonry/Flexible gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-masonry">
          {galleryItems.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-4/3 rounded-sm overflow-hidden border border-transparent hover:border-amber-500/40 cursor-zoom-in transition-all duration-300"
              id={`gallery-item-${item.id}`}
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Soft gradient mask on hover info */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[9px] uppercase tracking-widest text-amber-400 mb-1 font-mono">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-300 font-sans line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Dynamic Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/98 backdrop-blur-md flex flex-col items-center justify-center p-4"
            id="gallery-lightbox"
          >
            {/* Close triggers */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
              id="lightbox-close"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Lightbox Wrapper */}
            <div className="max-w-4xl w-full flex flex-col items-center">
              
              {/* Navigation and Image block */}
              <div className="relative w-full aspect-16/10 flex items-center justify-center">
                
                {/* Left arrow */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(lightboxIndex === 0 ? galleryItems.length - 1 : lightboxIndex - 1);
                  }}
                  className="absolute left-4 p-2 bg-stone-900/60 border border-stone-800 text-amber-400 hover:text-white rounded-full transition-colors cursor-pointer"
                  id="lightbox-prev"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Main Image */}
                <img 
                  src={galleryItems[lightboxIndex].image} 
                  alt={galleryItems[lightboxIndex].title} 
                  className="max-h-[70vh] max-w-full rounded-sm object-contain border border-stone-800"
                />

                {/* Right arrow */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(lightboxIndex === galleryItems.length - 1 ? 0 : lightboxIndex + 1);
                  }}
                  className="absolute right-4 p-2 bg-stone-900/60 border border-stone-800 text-amber-400 hover:text-white rounded-full transition-colors cursor-pointer"
                  id="lightbox-next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
              </div>

              {/* Info display text details on image bottom */}
              <div className="text-center mt-6 max-w-2xl px-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
                  {galleryItems[lightboxIndex].category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {galleryItems[lightboxIndex].title}
                </h3>
                <p className="text-stone-300 font-sans text-sm mt-2">
                  {galleryItems[lightboxIndex].description}
                </p>
                <p className="text-stone-500 font-sans text-xs mt-4">
                  Photo {lightboxIndex + 1} of {galleryItems.length}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
