'use client';

import chefImg from '../assets/chef.png';
import conciergeImg from '../assets/concierge.png';
import relationsImg from '../assets/relations.png';
import spaImg from '../assets/spa.png';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  experience: string;
  image: any;
}

interface TeamProps {
  isClassicDark: boolean;
  databaseMembers?: any[];
}

export default function Team({ isClassicDark, databaseMembers }: TeamProps) {
  const defaultTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Chef Marco Rossi',
      role: 'Executive Chef',
      quote: '“Gastronomy is an art form. Every dish we serve at Celestia Grand is designed to tell a unique story of flavor, tradition, and innovation.”',
      experience: '12+ Years in Michelin-starred Kitchens',
      image: chefImg,
    },
    {
      id: '2',
      name: 'William Dupont',
      role: 'Head Concierge',
      quote: '“For our guests, nothing is impossible. Whether it is a last-minute booking or a custom private tour, we curate experiences that linger forever.”',
      experience: 'Member of Les Clefs d’Or',
      image: conciergeImg,
    },
    {
      id: '3',
      name: 'Sophia Sterling',
      role: 'Guest Relations Manager',
      quote: '“True hospitality lies in anticipating needs before they are spoken. We treat every guest not just as a visitor, but as family coming home.”',
      experience: '10+ Years in Luxury Hospitality',
      image: relationsImg,
    },
    {
      id: '4',
      name: 'Elena Rostova',
      role: 'Spa & Wellness Director',
      quote: '“Rejuvenation is a holistic journey. We create a sanctuary of tranquility where guests can disconnect from the world and restore their inner harmony.”',
      experience: 'Certified Holistic Therapist',
      image: spaImg,
    },
  ];

  // Resolve team members, mapping static assets if using defaults
  const teamMembers = databaseMembers && databaseMembers.length > 0
    ? databaseMembers.map(m => {
        let mappedImg = chefImg;
        if (m.id === '2') mappedImg = conciergeImg;
        if (m.id === '3') mappedImg = relationsImg;
        if (m.id === '4') mappedImg = spaImg;
        return {
          ...m,
          image: m.imageUrl ? { src: m.imageUrl } : mappedImg
        };
      })
    : defaultTeamMembers;

  // Duplicate team list for infinite marquee scrolling
  const doubledMembers = [...teamMembers, ...teamMembers];

  return (
    <section
      id="team"
      className={`py-16 relative overflow-hidden border-t transition-colors duration-550 ${
        isClassicDark 
          ? 'bg-stone-950 text-stone-100 border-stone-900' 
          : 'bg-stone-50 text-stone-900 border-stone-200'
      }`}
    >
      {/* Subtle Mandala Background */}
      <div
        className={`absolute inset-0 opacity-[0.02] pointer-events-none ${isClassicDark ? 'invert' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='50' fill='none' stroke='%23000' stroke-width='0.8'/%3E%3Cpath d='M60 0v120M0 60h120' stroke='%23000' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          backgroundPosition: 'left center'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Centered Title */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-amber-500">
            Meet the Artisans
          </span>
          <h2 className="font-serif text-3xl font-bold mt-2 tracking-wide">
            Our Devoted Team
          </h2>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mt-3" />
        </div>
      </div>

      {/* Infinite Team Marquee Row */}
      <div className="w-full overflow-hidden relative py-4">
        {/* Shadow Overlay Left & Right */}
        <div className={`absolute top-0 bottom-0 left-0 w-24 z-10 pointer-events-none ${isClassicDark ? 'bg-gradient-to-r from-stone-950 to-transparent' : 'bg-gradient-to-r from-stone-50 to-transparent'}`} />
        <div className={`absolute top-0 bottom-0 right-0 w-24 z-10 pointer-events-none ${isClassicDark ? 'bg-gradient-to-l from-stone-950 to-transparent' : 'bg-gradient-to-l from-stone-50 to-transparent'}`} />

        <div className="animate-marquee-reverse flex gap-8">
          {doubledMembers.map((member, index) => (
            <div
              key={`${member.id}-${index}`}
              className={`flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] group relative rounded-2xl overflow-hidden border transition-all duration-550 flex flex-col ${
                isClassicDark
                  ? 'bg-stone-900/40 border-stone-850 hover:border-amber-500/20'
                  : 'bg-white border-stone-250 hover:border-emerald-600/20'
              }`}
            >
              {/* Image & Hover Quote Overlay */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src={member.image.src}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark gradient backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Quote details overlay visible on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs italic text-stone-200 line-clamp-6 leading-relaxed mb-4">
                    {member.quote}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                    {member.experience}
                  </p>
                </div>
              </div>

              {/* Title / Info bar always visible */}
              <div className="p-5 text-center z-10 border-t border-stone-500/10">
                <h3 className="font-serif text-lg font-bold tracking-wide">
                  {member.name}
                </h3>
                <p className="text-xs text-amber-500 uppercase tracking-widest font-sans font-semibold mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
