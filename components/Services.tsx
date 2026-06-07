import { useState, useEffect } from 'react';
import diningImg from '../assets/service_dining.png';
import spaImg from '../assets/service_spa.png';
import poolImg from '../assets/service_pool.png';
import chauffeurImg from '../assets/service_chauffeur.png';
import loungeImg from '../assets/service_lounge.png';
import butlerImg from '../assets/service_butler.png';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

interface ServicesProps {
  isClassicDark: boolean;
  databaseServices?: any[];
}

export default function Services({ isClassicDark, databaseServices }: ServicesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const defaultServices: ServiceItem[] = [
    {
      id: '1',
      title: 'Fine Dining & Gastronomy',
      description: 'Indulge in exquisite culinary journeys curated by our Michelin-starred chefs. From private dining to signature restaurants, every meal is a masterpiece.',
      image: diningImg,
    },
    {
      id: '2',
      title: 'Wellness Spa & Retreat',
      description: 'Reclaim your peace of mind with tailored body treatments, hot stone therapies, and holistic wellness rituals designed to rejuvenate.',
      image: spaImg,
    },
    {
      id: '3',
      title: 'Panoramic Infinity Pool',
      description: 'Take a swim in our temperature-controlled infinity pool overlooking the breathtaking skyline of the city, complete with a private poolside bar.',
      image: poolImg,
    },
    {
      id: '4',
      title: 'Luxury Valet & Chauffeur',
      description: 'Travel in elegance. We offer professional chauffeur services and airport escort transfers with our private fleet of luxury limousines.',
      image: chauffeurImg,
    },
    {
      id: '5',
      title: 'High-Secured VIP Lounges',
      description: 'Access highly secured, soundproof VIP meeting lounges and club floors, optimized for business conferences and ultimate privacy.',
      image: loungeImg,
    },
    {
      id: '6',
      title: '24/7 Personal Butler',
      description: 'Experience bespoke luxury with a dedicated personal butler at your disposal around the clock, managing every detail of your comfortable stay.',
      image: butlerImg,
    },
  ];

  // Resolve services list mapping database records with fallback images
  const services = databaseServices && databaseServices.length > 0
    ? databaseServices.map(s => {
        let mappedImg = diningImg;
        if (s.id === '2') mappedImg = spaImg;
        if (s.id === '3') mappedImg = poolImg;
        if (s.id === '4') mappedImg = chauffeurImg;
        if (s.id === '5') mappedImg = loungeImg;
        if (s.id === '6') mappedImg = butlerImg;
        return {
          ...s,
          image: s.imageUrl ? { src: s.imageUrl } : mappedImg
        };
      })
    : defaultServices;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, services.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (maxIndex === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex, currentIndex]);

  return (
    <section
      id="services"
      className={`py-16 relative overflow-hidden border-t transition-colors duration-500 ${
        isClassicDark 
          ? 'bg-stone-950 text-stone-100 border-stone-900' 
          : 'bg-stone-50 text-stone-900 border-stone-200'
      }`}
    >
      {/* Background Mandala Pattern */}
      <div
        className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isClassicDark ? 'invert' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='50' fill='none' stroke='%23000' stroke-width='0.8'/%3E%3Cpath d='M60 0v120M0 60h120' stroke='%23000' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          backgroundPosition: 'right center'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-amber-500">
            Exclusive Amenities
          </span>
          <h2 className="font-serif text-3xl font-bold mt-2 tracking-wide">
            Our Premium Services
          </h2>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mt-3" />
        </div>

        {/* Services Horizontal Slider Row */}
        <div className="w-full overflow-hidden relative py-4">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${currentIndex} * (100% + 24px) / ${visibleCount}))` }}
          >
            {services.map((service) => {
              return (
                <div
                  key={service.id}
                  className={`flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] overflow-hidden rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group flex flex-col ${
                    isClassicDark
                      ? 'bg-stone-900/60 border-stone-800 hover:border-amber-500/30'
                      : 'bg-white border-stone-200 hover:border-emerald-600/30'
                  }`}
                >
                  {/* Service Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={service.image.src}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-50" />
                  </div>

                  {/* Service Details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl font-bold tracking-wide mb-3">
                      {service.title}
                    </h3>
                    
                    <p className={`text-sm sm:text-base leading-relaxed opacity-75 font-sans font-normal ${
                      isClassicDark ? 'text-stone-300' : 'text-stone-600'
                    }`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls & Navigation Dots */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className={`p-3 rounded-full border transition-all duration-300 ${
                isClassicDark
                  ? 'border-stone-800 bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-amber-500'
                  : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-emerald-600'
              }`}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className={`p-3 rounded-full border transition-all duration-300 ${
                isClassicDark
                  ? 'border-stone-800 bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-amber-500'
                  : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-emerald-600'
              }`}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-6 bg-amber-500'
                    : `w-1.5 ${isClassicDark ? 'bg-stone-800' : 'bg-stone-300'}`
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
