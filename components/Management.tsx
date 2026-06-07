'use client';

import { useState } from 'react';
import ceoImg from '../assets/ceo.png';
import gmImg from '../assets/gm.png';
import opsImg from '../assets/ops.png';

interface ManagementMember {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  bio: string;
  image: any;
}

interface ManagementProps {
  isClassicDark: boolean;
  databaseMembers?: any[];
}

export default function Management({ isClassicDark, databaseMembers }: ManagementProps) {
  const [selectedMember, setSelectedMember] = useState<ManagementMember | null>(null);

  const defaultMembers: ManagementMember[] = [
    {
      id: '1',
      name: 'Rahat Rahman',
      designation: 'Chief Executive Officer (CEO)',
      email: 'rahat.rahman@celestiagrand.com',
      phone: '+880 1711-223344',
      bio: 'Rahat Rahman brings over 18 years of international experience in luxury hospitality management. He guides the overall strategic direction of Celestia Grand, ensuring unmatched service quality and adherence to global hospitality standards.',
      image: ceoImg,
    },
    {
      id: '2',
      name: 'Nusrat Jahan',
      designation: 'General Manager (GM)',
      email: 'nusrat.jahan@celestiagrand.com',
      phone: '+880 1711-556677',
      bio: 'Nusrat Jahan oversees day-to-day hotel operations, guest relations, and service delivery. Her passion for excellence ensures that every guest experiences the signature warmth and luxury of Celestia Grand.',
      image: gmImg,
    },
    {
      id: '3',
      name: 'Tanvir Ahmed',
      designation: 'Director of Operations',
      email: 'tanvir.ahmed@celestiagrand.com',
      phone: '+880 1711-889900',
      bio: 'Tanvir Ahmed coordinates across all service departments, including food & beverage, housekeeping, and facilities management, to maintain seamless operation and pristine quality.',
      image: opsImg,
    },
  ];

  // Resolve members from props, mapping static assets if using defaults
  const members = databaseMembers && databaseMembers.length > 0
    ? databaseMembers.map(m => {
      let mappedImg = ceoImg;
      if (m.id === '2') mappedImg = gmImg;
      if (m.id === '3') mappedImg = opsImg;
      return {
        ...m,
        image: m.imageUrl ? { src: m.imageUrl } : mappedImg
      };
    })
    : defaultMembers;

  return (
    <section
      id="management"
      className={`py-16 relative overflow-hidden border-t transition-colors duration-500 ${isClassicDark
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
            Leadership Team
          </span>
          <h2 className="font-serif text-3xl font-bold mt-2 tracking-wide">
            Our Management
          </h2>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mt-3" />
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${isClassicDark
                  ? 'bg-stone-900/60 border-stone-800 hover:border-amber-500/30'
                  : 'bg-white border-stone-200 hover:border-emerald-600/30'
                }`}
            >
              {/* Member Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={member.image.src}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-65" />
              </div>

              {/* Member Info Summary */}
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-1">
                  {member.designation}
                </p>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  {member.name}
                </h3>
                <div className="text-xs space-y-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>Phone:</strong> {member.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal (Zoom Details without Image) */}
      {selectedMember && (
        <div
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg rounded-2xl p-8 border shadow-2xl transition-all duration-300 transform scale-100 ${isClassicDark
                ? 'bg-stone-900 border-stone-800 text-stone-100'
                : 'bg-white border-stone-200 text-stone-900'
              }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className={`absolute top-4 right-4 p-2 rounded-full hover:bg-stone-500/10 transition-colors ${isClassicDark ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Details Content (No Image) */}
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-1">
                  {selectedMember.designation}
                </p>
                <h3 className="font-serif text-2xl font-bold tracking-wide">
                  {selectedMember.name}
                </h3>
                <div className="w-12 h-[1px] bg-amber-500/50 mt-3" />
              </div>

              <div className="space-y-2 py-4 border-y border-stone-500/10">
                <p className="text-sm">
                  <span className="font-semibold opacity-60">Email: </span>
                  <a href={`mailto:${selectedMember.email}`} className="text-amber-500 hover:underline">
                    {selectedMember.email}
                  </a>
                </p>
                <p className="text-sm">
                  <span className="font-semibold opacity-60">Phone: </span>
                  <a href={`tel:${selectedMember.phone}`} className="text-amber-500 hover:underline">
                    {selectedMember.phone}
                  </a>
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold opacity-60 mb-2">
                  Biography & Role
                </h4>
                <p className="text-sm leading-relaxed opacity-85">
                  {selectedMember.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
