'use client';

import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

interface ContactProps {
  isClassicDark: boolean;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  scrollTo: (id: string) => void;
  pageData?: any;
}

export default function Contact({ isClassicDark, formData, setFormData, scrollTo, pageData }: ContactProps) {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Our Location',
      content: pageData?.hotelAddress || '74 Oceanic Golden Boulevard, Sector 5, Dhaka 1212, Bangladesh',
      linkText: 'Open in Google Maps',
      linkUrl: `https://maps.google.com/?q=${encodeURIComponent(pageData?.hotelAddress || '74 Oceanic Golden Boulevard, Sector 5, Dhaka 1212, Bangladesh')}`,
    },
    {
      icon: Phone,
      title: 'Phone & Concierge',
      content: pageData?.hotelPhone || '+880 1790 334 564',
      linkText: 'Call lobby desk',
      linkUrl: `tel:${(pageData?.hotelPhone || '+8801790334564').replace(/[^\d+]/g, '')}`,
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: pageData?.hotelEmail || 'concierge@celestiagrand.com',
      linkText: 'Send an email',
      linkUrl: `mailto:${pageData?.hotelEmail || 'concierge@celestiagrand.com'}`,
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Chat',
      content: 'Available 24/7 for guest support',
      linkText: 'Chat on WhatsApp',
      linkUrl: `https://wa.me/${(pageData?.hotelPhone || '8801790334564').replace(/[^\d]/g, '')}?text=Hello%20Celestia%20Grand%20Concierge%2C%2520I%2520would%2520like%2520to%2520request%2520information.`,
      isHighlight: true,
    },
  ];

  return (
    <section
      id="contact"
      className={`py-16 relative overflow-hidden border-t transition-colors duration-500 ${isClassicDark
          ? 'bg-stone-950 text-stone-100 border-stone-900'
          : 'bg-stone-50 text-stone-900 border-stone-200'
        }`}
    >
      {/* Background Mandala Pattern */}
      <div
        className={`absolute inset-0 opacity-[0.02] pointer-events-none ${isClassicDark ? 'invert' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='50' fill='none' stroke='%23000' stroke-width='0.8'/%3E%3Cpath d='M60 0v120M0 60h120' stroke='%23000' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          backgroundPosition: 'left center'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">

        {/* Centered Heading */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-amber-500">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl font-bold mt-2 tracking-wide">
            Connect With Celestia
          </h2>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mt-3" />
        </div>

        {/* Simplistic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactDetails.map((detail, idx) => {
            const Icon = detail.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center ${detail.isHighlight
                    ? isClassicDark
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : 'bg-emerald-50/50 border-emerald-600/20'
                    : isClassicDark
                      ? 'bg-stone-900/40 border-stone-800'
                      : 'bg-white border-stone-200'
                  }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isClassicDark
                    ? 'bg-stone-900 text-amber-400 border border-amber-500/10'
                    : 'bg-stone-100 text-emerald-700'
                  }`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold tracking-wide mb-2">
                  {detail.title}
                </h3>

                {/* Content */}
                <p className={`text-xs sm:text-sm font-sans mb-4 leading-relaxed flex-grow opacity-75 ${isClassicDark ? 'text-stone-300' : 'text-stone-600'
                  }`}>
                  {detail.content}
                </p>

                {/* Link Action */}
                <a
                  href={detail.linkUrl}
                  target={detail.linkUrl.startsWith('http') ? '_blank' : undefined}
                  rel={detail.linkUrl.startsWith('http') ? 'noreferrer' : undefined}
                  className={`text-xs uppercase tracking-wider font-semibold hover:underline transition-colors ${detail.isHighlight
                      ? 'text-amber-500'
                      : isClassicDark
                        ? 'text-amber-400'
                        : 'text-emerald-700'
                    }`}
                >
                  {detail.linkText} &rarr;
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
