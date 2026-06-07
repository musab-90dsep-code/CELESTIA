'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '../../components/AdminPanel';
import { supabase } from '../../lib/supabaseClient';

export default function AdminPage() {
  const router = useRouter();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-100 font-sans">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Loading Admin Console...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <AdminPanel
        onClose={() => router.push('/')}
        isClassicDark={true}
        pageData={pageData}
        databaseHeroImages={heroImages}
        databaseManagementMembers={managementMembers}
        databaseTeamMembers={teamMembers}
        databaseServices={servicesList}
        databaseWhyChooseUs={whyChooseUsData}
        onSaveSection={saveSectionToDb}
      />
    </div>
  );
}
