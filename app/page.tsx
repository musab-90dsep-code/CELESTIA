'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Management from '../components/Management';
import Team from '../components/Team';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Crown } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

import { rooms } from '../lib/data';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const router = useRouter();
  // Navigation active states
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Custom light/dark mode for the general vibe
  const [isClassicDark, setIsClassicDark] = useState(true);

  // Dynamic Editable Page Data states
  const [pageData, setPageData] = useState({
    hotelName: 'SAMAWET AL KHALEJ',
    ownerName: 'Md Delowar Hossain',
    ownerMessage: 'Islami Bank Bangladesh PLC (IBBPLC) is the largest commercial bank of Bangladesh. It is the first Shariah-based scheduled commercial bank in the South and South-East Asia region established in March 1983. With 400 branches, 271 sub-branches & 2,793 Agent Banking Outlets, the Bank possesses the largest branch network among the private sector banks in Bangladesh.',
    ownerImageUrl: '',
    techPartnerName: ' SAUDI BUSINESS  CONSULTANCY',
    techPartnerUrl: 'https://saudibusiness.info',
    hotelPhone: '+966550014267',
    hotelEmail: 'DELOWAR019149@GMAIL.COM',
    hotelAddress: 'MAKKAH AL MAKARAMA SAUDI ARABIA'
  });

  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [managementMembers, setManagementMembers] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [whyChooseUsData, setWhyChooseUsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch configs from Supabase
  useEffect(() => {
    async function initData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from('landing_page_settings').select('*');
        if (error) {
          console.warn("Failed to fetch settings from Supabase. Defaulting to local states:", error.message);
          return;
        }

        if (data && data.length > 0) {
          const generalRow = data.find(r => r.section_key === 'general');
          const aboutRow = data.find(r => r.section_key === 'about');
          const heroRow = data.find(r => r.section_key === 'hero');
          const managementRow = data.find(r => r.section_key === 'management');
          const teamRow = data.find(r => r.section_key === 'team');
          const servicesRow = data.find(r => r.section_key === 'services');
          const whyChooseUsRow = data.find(r => r.section_key === 'why_choose_us');

          if (generalRow) {
            setPageData(prev => ({ ...prev, ...generalRow.content }));
          }
          if (aboutRow) {
            setPageData(prev => ({ ...prev, ...aboutRow.content }));
          }
          if (heroRow && heroRow.content?.images) {
            setHeroImages(heroRow.content.images);
          }
          if (managementRow && managementRow.content?.members) {
            setManagementMembers(managementRow.content.members);
          }
          if (teamRow && teamRow.content?.members) {
            setTeamMembers(teamRow.content.members);
          }
          if (servicesRow && servicesRow.content?.services) {
            setServicesList(servicesRow.content.services);
          }
          if (whyChooseUsRow && whyChooseUsRow.content) {
            setWhyChooseUsData(whyChooseUsRow.content);
          }
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    initData();
  }, []);

  // Save changes to database
  const saveSectionToDb = async (key: string, content: any) => {
    try {
      const { error } = await supabase
        .from('landing_page_settings')
        .upsert({ section_key: key, content, updated_at: new Date().toISOString() }, { onConflict: 'section_key' });
      if (error) throw error;

      // Update local state as well
      if (key === 'general') {
        setPageData(prev => ({ ...prev, ...content }));
      } else if (key === 'about') {
        setPageData(prev => ({ ...prev, ...content }));
      } else if (key === 'hero' && content.images) {
        setHeroImages(content.images);
      } else if (key === 'management' && content.members) {
        setManagementMembers(content.members);
      } else if (key === 'team' && content.members) {
        setTeamMembers(content.members);
      } else if (key === 'services' && content.services) {
        setServicesList(content.services);
      } else if (key === 'why_choose_us') {
        setWhyChooseUsData(content);
      }
    } catch (err: any) {
      console.error(`Error saving ${key} to Supabase:`, err.message);
      alert(`Database Save Error: ${err.message}`);
    }
  };

  // Booking Form State Variables (kept commented out sections compat)
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: 'deluxe',
    fullName: '',
    email: '',
    phone: '',
    specialRequest: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track scroll position to update header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple intersection tracker
      const sections = ['hero', 'about', 'management', 'team', 'services', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll handler
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const delay = typeof window !== 'undefined' && window.innerWidth < 1024 ? 300 : 0;
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, delay);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-100 font-sans">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            {/* Spinning luxury outer ring */}
            <div className="absolute inset-0 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-500/30 flex items-center justify-center bg-stone-900">
              <img src={logoImg.src} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-amber-400 to-amber-200 uppercase">
              SAMAWET AL KHALEJ
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-semibold">
              Loading Luxury Experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isClassicDark ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`} id="top">

      <Navbar
        activeSection={activeSection}
        scrollTo={scrollTo}
        isClassicDark={isClassicDark}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isScrolled={isScrolled}
        pageData={pageData}
      />

      <Hero pageData={pageData} databaseImages={heroImages} />

      <About isClassicDark={isClassicDark} scrollTo={scrollTo} pageData={pageData} />

      <Management isClassicDark={isClassicDark} databaseMembers={managementMembers} />

      <Team isClassicDark={isClassicDark} databaseMembers={teamMembers} />

      <WhyChooseUs isClassicDark={isClassicDark} whyChooseUsData={whyChooseUsData} />

      <Services isClassicDark={isClassicDark} databaseServices={servicesList} />

      <Contact isClassicDark={isClassicDark} formData={formData} setFormData={setFormData} scrollTo={scrollTo} pageData={pageData} />

      <Footer isClassicDark={isClassicDark} scrollTo={scrollTo} onAdminClick={() => window.open('/admin', '_blank')} pageData={pageData} />

    </div>
  );
}
