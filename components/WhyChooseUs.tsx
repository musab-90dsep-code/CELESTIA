'use client';

import { 
  Award, 
  Shield, 
  Crown, 
  Flame, 
  Heart, 
  Star, 
  Sparkles, 
  Gem, 
  Clock, 
  Compass, 
  ShieldCheck, 
  Coffee, 
  Wifi, 
  MapPin, 
  Utensils, 
  HelpCircle,
  HeartHandshake
} from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface WhyChooseUsData {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

interface WhyChooseUsProps {
  isClassicDark: boolean;
  whyChooseUsData?: WhyChooseUsData;
}

// Icon dictionary to avoid dynamic bundler lookup failures
const iconMap: Record<string, any> = {
  Award,
  Shield,
  Crown,
  Flame,
  Heart,
  Star,
  Sparkles,
  Gem,
  Clock,
  Compass,
  ShieldCheck,
  Coffee,
  Wifi,
  MapPin,
  Utensils,
  HelpCircle,
  HeartHandshake
};

export default function WhyChooseUs({ isClassicDark, whyChooseUsData }: WhyChooseUsProps) {
  // Default values matching premium theme
  const defaultData: WhyChooseUsData = {
    title: 'Why Choose Us',
    subtitle: 'The Epitome of Royal Comfort & Legacy',
    features: [
      {
        id: '1',
        title: 'Historic Legacy',
        description: 'With decades of catering to royals, we offer an unmatched heritage of grandeur and classic service.',
        icon: 'Award'
      },
      {
        id: '2',
        title: 'Absolute Security',
        description: 'Equipped with diplomatic-grade security systems and dedicated VIP protocols to keep you private.',
        icon: 'Shield'
      },
      {
        id: '3',
        title: 'Premium Comfort',
        description: 'Bespoke hand-crafted furniture, fine Italian linens, and stunning panoramic views in all suites.',
        icon: 'Crown'
      },
      {
        id: '4',
        title: 'Michelin Dining',
        description: 'Indulge in 24/7 gourmet menus prepared exclusively by our team of world-class Michelin chefs.',
        icon: 'Flame'
      }
    ]
  };

  const data = whyChooseUsData && whyChooseUsData.features && whyChooseUsData.features.length > 0 
    ? whyChooseUsData 
    : defaultData;

  return (
    <section
      id="why-choose-us"
      className={`py-16 relative overflow-hidden border-t transition-colors duration-500 ${
        isClassicDark 
          ? 'bg-stone-950 text-stone-100 border-stone-900' 
          : 'bg-stone-50 text-stone-900 border-stone-200'
      }`}
    >
      {/* Background Mandala / Subtle Pattern */}
      <div
        className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isClassicDark ? 'invert' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='50' fill='none' stroke='%23000' stroke-width='0.8'/%3E%3Cpath d='M60 0v120M0 60h120' stroke='%23000' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          backgroundPosition: 'left center'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-amber-500">
            A Royal Signature
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 tracking-wide">
            {data.title}
          </h2>
          <p className={`text-xs sm:text-sm uppercase tracking-widest font-sans font-medium mt-3 opacity-60`}>
            {data.subtitle}
          </p>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mt-4" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.features.map((feature) => {
            const IconComponent = iconMap[feature.icon] || HelpCircle;
            return (
              <div
                key={feature.id}
                className={`group p-8 rounded-2xl border transition-all duration-500 transform hover:-translate-y-1 flex flex-col items-center text-center ${
                  isClassicDark
                    ? 'bg-stone-900/40 border-stone-850 hover:border-amber-550/30 hover:shadow-xl hover:shadow-amber-500/[0.02]'
                    : 'bg-white border-stone-200 hover:border-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/[0.02]'
                }`}
              >
                {/* Icon Container with elegant glow */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                  isClassicDark
                    ? 'bg-stone-950/60 border border-stone-800 text-amber-500 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 group-hover:scale-105'
                    : 'bg-stone-50 border border-stone-100 text-emerald-600 group-hover:bg-emerald-50 group-hover:border-emerald-600/30 group-hover:scale-105'
                }`}>
                  <IconComponent className="w-7 h-7 transition-all duration-300" />
                </div>

                {/* Feature Title */}
                <h3 className="font-serif text-xl font-semibold tracking-wide mb-3">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className={`text-sm sm:text-base leading-relaxed opacity-75 font-sans font-normal ${
                  isClassicDark ? 'text-stone-350' : 'text-stone-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
