'use client';

import { useState } from 'react';
import { LayoutDashboard, Settings, LogOut, ShieldCheck, Mail, Phone, Calendar, MessageSquare, Image, Award, Heart, Shield } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
  isClassicDark: boolean;
  pageData: {
    hotelName: string;
    ownerName: string;
    ownerMessage: string;
    techPartnerName: string;
    techPartnerUrl: string;
    hotelPhone: string;
    hotelEmail: string;
    hotelAddress: string;
  };
  databaseHeroImages: string[];
  databaseManagementMembers: any[];
  databaseTeamMembers: any[];
  databaseServices: any[];
  onSaveSection: (key: string, content: any) => Promise<void>;
}

export default function AdminPanel({
  onClose,
  isClassicDark,
  pageData,
  databaseHeroImages,
  databaseManagementMembers,
  databaseTeamMembers,
  databaseServices,
  onSaveSection
}: AdminPanelProps) {
  const stats = [
    { label: 'Total Rooms', value: '45', change: '8 Operational Suites', color: 'text-amber-500' },
    { label: 'Active Reservations', value: '12', change: '+3 new this week', color: 'text-amber-500' },
    { label: 'Pending Enquiries', value: '4', change: 'Requires desk review', color: 'text-amber-500' },
    { label: 'Digital Partner Status', value: 'Online', change: 'Supabase real-time link', color: 'text-emerald-500' }
  ];

  const mockBookings = [
    { id: '1', guest: 'Princess Sofia Romanov', room: 'Celestia Presidential Residence', checkIn: '2026-06-10', checkOut: '2026-09-10', status: 'Confirmed & Paid' },
    { id: '2', guest: 'Alexander Sterling', room: 'Deluxe Serenity Suite', checkIn: '2026-06-12', checkOut: '2026-06-20', status: 'Confirmed' },
    { id: '3', guest: 'David Miller', room: 'Signature Manor Suite', checkIn: '2026-06-15', checkOut: '2026-06-22', status: 'Pending Review' }
  ];

  const mockMessages = [
    { id: '1', name: 'Zahirul Islam', email: 'zahirul@example.com', phone: '+880 1711-222333', date: '2026-06-04 18:24', message: 'Hello, I want to book the Presidential Residence for an official executive meeting on June 15. Please let me know the availability and security protocol details.' },
    { id: '2', name: 'Laura Benson', email: 'laura.b@example.com', phone: '+1 415-555-0199', date: '2026-06-03 14:12', message: 'Do you offer airport transfer via private limousine for guests arriving at Hazrat Shahjalal International Airport? Thank you.' }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'management' | 'team' | 'services'>('general');

  // --- LOCAL INPUT STATES ---

  // 1. General & About
  const [formHotelName, setFormHotelName] = useState(pageData.hotelName);
  const [formOwnerName, setFormOwnerName] = useState(pageData.ownerName);
  const [formOwnerMessage, setFormOwnerMessage] = useState(pageData.ownerMessage);
  const [formTechPartnerName, setFormTechPartnerName] = useState(pageData.techPartnerName);
  const [formTechPartnerUrl, setFormTechPartnerUrl] = useState(pageData.techPartnerUrl);
  const [formHotelPhone, setFormHotelPhone] = useState(pageData.hotelPhone);
  const [formHotelEmail, setFormHotelEmail] = useState(pageData.hotelEmail);
  const [formHotelAddress, setFormHotelAddress] = useState(pageData.hotelAddress);
  const [formLogoUrl, setFormLogoUrl] = useState((pageData as any).logoUrl || '');

  // 2. Hero Images (4 items)
  const defaultHeroUrls = [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=80'
  ];
  const [heroUrls, setHeroUrls] = useState<string[]>(
    databaseHeroImages && databaseHeroImages.length > 0 ? databaseHeroImages : defaultHeroUrls
  );

  // 3. Management (3 items)
  const defaultManagement = [
    { id: '1', name: 'Rahat Rahman', designation: 'Chief Executive Officer (CEO)', email: 'rahat.rahman@celestiagrand.com', phone: '+880 1711-223344', bio: 'Rahat Rahman brings over 18 years of international experience...', imageUrl: '' },
    { id: '2', name: 'Nusrat Jahan', designation: 'General Manager (GM)', email: 'nusrat.jahan@celestiagrand.com', phone: '+880 1711-556677', bio: 'Nusrat Jahan oversees day-to-day hotel operations...', imageUrl: '' },
    { id: '3', name: 'Tanvir Ahmed', designation: 'Director of Operations', email: 'tanvir.ahmed@celestiagrand.com', phone: '+880 1711-889900', bio: 'Tanvir Ahmed coordinates across all service departments...', imageUrl: '' }
  ];
  const [managementList, setManagementList] = useState<any[]>(
    databaseManagementMembers && databaseManagementMembers.length > 0 ? databaseManagementMembers : defaultManagement
  );

  // 4. Team (4 items)
  const defaultTeam = [
    { id: '1', name: 'Chef Marco Rossi', role: 'Executive Chef', quote: '“Gastronomy is an art form...”', experience: '12+ Years in Michelin-starred Kitchens', imageUrl: '' },
    { id: '2', name: 'William Dupont', role: 'Head Concierge', quote: '“For our guests, nothing is impossible...”', experience: 'Member of Les Clefs d’Or', imageUrl: '' },
    { id: '3', name: 'Sophia Sterling', role: 'Guest Relations Manager', quote: '“True hospitality lies in anticipating...”', experience: '10+ Years in Luxury Hospitality', imageUrl: '' },
    { id: '4', name: 'Elena Rostova', role: 'Spa & Wellness Director', quote: '“Rejuvenation is a holistic journey...”', experience: 'Certified Holistic Therapist', imageUrl: '' }
  ];
  const [teamList, setTeamList] = useState<any[]>(
    databaseTeamMembers && databaseTeamMembers.length > 0 ? databaseTeamMembers : defaultTeam
  );

  // 5. Services (6 items)
  const defaultServices = [
    { id: '1', title: 'Fine Dining & Gastronomy', description: 'Indulge in exquisite culinary journeys curated...', imageUrl: '' },
    { id: '2', title: 'Wellness Spa & Retreat', description: 'Reclaim your peace of mind with tailored...', imageUrl: '' },
    { id: '3', title: 'Panoramic Infinity Pool', description: 'Take a swim in our temperature-controlled...', imageUrl: '' },
    { id: '4', title: 'Luxury Valet & Chauffeur', description: 'Travel in elegance. We offer professional...', imageUrl: '' },
    { id: '5', title: 'High-Secured VIP Lounges', description: 'Access highly secured, soundproof VIP...', imageUrl: '' },
    { id: '6', title: '24/7 Personal Butler', description: 'Experience bespoke luxury with a dedicated...', imageUrl: '' }
  ];
  const [servicesList, setServicesList] = useState<any[]>(
    databaseServices && databaseServices.length > 0 ? databaseServices : defaultServices
  );

  // --- SAVE ACTIONS ---

  const saveGeneralAndAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveSection('general', {
      hotelName: formHotelName,
      techPartnerName: pageData.techPartnerName || 'Hasanah Tech Solution',
      techPartnerUrl: pageData.techPartnerUrl || 'https://hasanahtech.com',
      hotelPhone: formHotelPhone,
      hotelEmail: formHotelEmail,
      hotelAddress: formHotelAddress,
      logoUrl: formLogoUrl
    });
    await onSaveSection('about', {
      ownerName: formOwnerName,
      ownerMessage: formOwnerMessage
    });
    alert('General and About configurations saved successfully to Supabase!');
  };

  const saveHeroImages = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveSection('hero', { images: heroUrls });
    alert('Hero slide configurations saved successfully to Supabase!');
  };

  const saveManagement = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveSection('management', { members: managementList });
    alert('Management configurations saved successfully to Supabase!');
  };

  const saveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveSection('team', { members: teamList });
    alert('Team configurations saved successfully to Supabase!');
  };

  const saveServices = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveSection('services', { services: servicesList });
    alert('Services configurations saved successfully to Supabase!');
  };

  // Helper handling array input shifts
  const updateHeroUrl = (index: number, val: string) => {
    const updated = [...heroUrls];
    updated[index] = val;
    setHeroUrls(updated);
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateHeroUrl(index, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleManagementImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateManagementField(index, 'imageUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTeamImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateTeamField(index, 'imageUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleServicesImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateServicesField(index, 'imageUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setFormLogoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const updateManagementField = (index: number, field: string, val: string) => {
    const updated = [...managementList];
    updated[index] = { ...updated[index], [field]: val };
    setManagementList(updated);
  };

  const updateTeamField = (index: number, field: string, val: string) => {
    const updated = [...teamList];
    updated[index] = { ...updated[index], [field]: val };
    setTeamList(updated);
  };

  const updateServicesField = (index: number, field: string, val: string) => {
    const updated = [...servicesList];
    updated[index] = { ...updated[index], [field]: val };
    setServicesList(updated);
  };

  // Auth Submit handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. (Hint: admin / admin123)');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950 backdrop-blur-md">
        <div className="relative w-full max-w-md p-8 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl text-stone-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition cursor-pointer"
          >
            &times;
          </button>

          <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-wide text-white">
              {pageData.hotelName} Admin
            </h2>
            <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">
              Secure Staff Registry Portal (Supabase DB)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">Username</label>
              <input
                type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full py-3 px-4 bg-stone-950 border border-stone-800 focus:outline-none focus:border-amber-500 text-sm placeholder-stone-750 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">Password</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full py-3 px-4 bg-stone-950 border border-stone-800 focus:outline-none focus:border-amber-500 text-sm placeholder-stone-750 rounded-lg text-white"
              />
            </div>
            {loginError && <p className="text-xs text-red-500 font-semibold mt-1">{loginError}</p>}
            <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-widest text-xs transition rounded-lg cursor-pointer">
              Authenticate Desk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-stone-950 text-stone-100 font-sans">
      {/* Sidebar Panel */}
      <aside className="w-64 bg-stone-900 border-r border-stone-800 flex flex-col justify-between p-6 flex-shrink-0">
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span className="font-serif text-base tracking-widest font-bold text-white uppercase">{pageData.hotelName}</span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${activeTab === 'general' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
            >
              <Settings className="w-4 h-4" />
              <span>General & About</span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${activeTab === 'hero' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
            >
              <Image className="w-4 h-4" />
              <span>Hero Slides</span>
            </button>

            <button
              onClick={() => setActiveTab('management')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${activeTab === 'management' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
            >
              <Award className="w-4 h-4" />
              <span>Management Staff</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${activeTab === 'team' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
            >
              <Heart className="w-4 h-4" />
              <span>Devoted Team</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${activeTab === 'services' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
            >
              <Shield className="w-4 h-4" />
              <span>Services</span>
            </button>
          </nav>
        </div>

        <button
          onClick={onClose}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-650 hover:bg-red-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Panel</span>
        </button>
      </aside>

      {/* Main content area */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 border-b border-stone-800 pb-5">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-white capitalize">Modify {activeTab} Data</h1>
            <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Secured Console (Connected to Supabase)</p>
          </div>
          <div className="flex items-center space-x-3 bg-stone-900 border border-stone-800 px-4 py-2 rounded-xl text-xs text-stone-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Database Status: Active</span>
          </div>
        </header>

        <div className="space-y-6">
          {/* General Sub-tab Form */}
          {activeTab === 'general' && (
            <form onSubmit={saveGeneralAndAbout} className="p-8 bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl space-y-6">
              <h3 className="font-serif text-lg font-bold text-white">General Information & About Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-2">Hotel Name</label>
                  <input type="text" value={formHotelName} onChange={(e) => setFormHotelName(e.target.value)} className="w-full py-2.5 px-4 bg-stone-950 border border-stone-800 rounded text-xs text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-2">Owner Name</label>
                  <input type="text" value={formOwnerName} onChange={(e) => setFormOwnerName(e.target.value)} className="w-full py-2.5 px-4 bg-stone-950 border border-stone-800 rounded text-xs text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-2">Owner's Message (The Visionary)</label>
                  <textarea rows={4} value={formOwnerMessage} onChange={(e) => setFormOwnerMessage(e.target.value)} className="w-full py-2.5 px-4 bg-stone-950 border border-stone-800 rounded text-xs text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-500 mb-2">Tech Partner Name (Locked)</label>
                  <input type="text" value={formTechPartnerName} disabled className="w-full py-2.5 px-4 bg-stone-900 border border-stone-800 rounded text-xs text-stone-500 cursor-not-allowed focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-500 mb-2">Tech Partner URL (Locked)</label>
                  <input type="text" value={formTechPartnerUrl} disabled className="w-full py-2.5 px-4 bg-stone-900 border border-stone-800 rounded text-xs text-stone-500 cursor-not-allowed focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-2">Website Logo Image</label>
                  <div className="flex items-center space-x-4">
                    {formLogoUrl && (
                      <div className="w-10 h-10 border border-stone-800 rounded bg-stone-950 flex items-center justify-center p-0 overflow-hidden flex-shrink-0">
                        <img src={formLogoUrl} alt="Logo preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-grow flex items-center space-x-2">
                      <input
                        type="text"
                        value={formLogoUrl.startsWith('data:') ? '[Uploaded Image Base64 Data]' : formLogoUrl}
                        onChange={(e) => setFormLogoUrl(e.target.value)}
                        className="flex-grow py-2.5 px-4 bg-stone-950 border border-stone-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                        placeholder="Image URL or upload local file"
                      />
                      <label className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold rounded cursor-pointer transition flex-shrink-0">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleLogoUpload(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-2">Hotel Phone</label>
                  <input type="text" value={formHotelPhone} onChange={(e) => setFormHotelPhone(e.target.value)} className="w-full py-2.5 px-4 bg-stone-950 border border-stone-800 rounded text-xs text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-2">Hotel Email</label>
                  <input type="email" value={formHotelEmail} onChange={(e) => setFormHotelEmail(e.target.value)} className="w-full py-2.5 px-4 bg-stone-950 border border-stone-800 rounded text-xs text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase font-bold text-stone-400 mb-2">Hotel Physical Address</label>
                  <textarea rows={2} value={formHotelAddress} onChange={(e) => setFormHotelAddress(e.target.value)} className="w-full py-2.5 px-4 bg-stone-950 border border-stone-800 rounded text-xs text-white focus:outline-none focus:border-amber-500" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest text-[10px] rounded hover:bg-amber-400 transition cursor-pointer">Save Info</button>
              </div>
            </form>
          )}

          {/* Hero Sub-tab Form */}
          {activeTab === 'hero' && (
            <form onSubmit={saveHeroImages} className="p-8 bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-white">Hero Slide Images</h3>
                <button
                  type="button"
                  onClick={() => setHeroUrls([...heroUrls, ''])}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-500 hover:text-amber-450 text-xs font-semibold rounded uppercase tracking-wider transition cursor-pointer"
                >
                  + Add Slide
                </button>
              </div>
              <div className="space-y-5">
                {heroUrls.map((url, index) => (
                  <div key={index} className="space-y-1">
                    <label className="block text-xs uppercase font-bold text-stone-400">Slide Image {index + 1}</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={url.startsWith('data:') ? '[Uploaded Image Base64 Data]' : url}
                        onChange={(e) => updateHeroUrl(index, e.target.value)}
                        className="flex-grow py-2.5 px-4 bg-stone-950 border border-stone-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                        placeholder="Image URL or upload local file"
                      />
                      <label className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold rounded cursor-pointer transition flex-shrink-0">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(index, e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                      {heroUrls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = heroUrls.filter((_, idx) => idx !== index);
                            setHeroUrls(updated);
                          }}
                          className="px-3 py-2.5 bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold rounded transition cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest text-[10px] rounded hover:bg-amber-400 transition cursor-pointer">Save Slides</button>
              </div>
            </form>
          )}

          {/* Management Sub-tab Form */}
          {activeTab === 'management' && (
            <form onSubmit={saveManagement} className="p-8 bg-stone-900 border border-stone-800 rounded-2xl max-w-3xl space-y-8">
              <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-white">Management Executives Info</h3>
                <button
                  type="button"
                  onClick={() => setManagementList([...managementList, { id: String(Date.now()), name: '', designation: 'New Designation', email: '', phone: '', bio: '', imageUrl: '' }])}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-500 hover:text-amber-450 text-xs font-semibold rounded uppercase tracking-wider transition cursor-pointer"
                >
                  + Add Executive
                </button>
              </div>
              {managementList.map((member, index) => (
                <div key={member.id} className="border-b border-stone-800 pb-6 space-y-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={member.designation}
                      onChange={(e) => updateManagementField(index, 'designation', e.target.value)}
                      className="text-[10px] uppercase tracking-wider text-amber-500 font-bold bg-amber-500/10 px-2 py-1 rounded border border-transparent focus:border-amber-500/30 focus:outline-none"
                      placeholder="Executive Designation"
                    />
                    {managementList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = managementList.filter((_, idx) => idx !== index);
                          setManagementList(updated);
                        }}
                        className="px-2.5 py-1 text-[9px] bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded uppercase tracking-widest transition cursor-pointer font-bold"
                      >
                        Remove Executive
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Full Name</label>
                      <input type="text" value={member.name} onChange={(e) => updateManagementField(index, 'name', e.target.value)} className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Custom Image URL (Optional)</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={member.imageUrl && member.imageUrl.startsWith('data:') ? '[Uploaded Image Base64 Data]' : (member.imageUrl || '')}
                          onChange={(e) => updateManagementField(index, 'imageUrl', e.target.value)}
                          className="flex-grow py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white"
                          placeholder="Leave empty for default portrait"
                        />
                        <label className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold rounded cursor-pointer transition flex-shrink-0">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleManagementImageUpload(index, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Email</label>
                      <input type="text" value={member.email} onChange={(e) => updateManagementField(index, 'email', e.target.value)} className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Phone</label>
                      <input type="text" value={member.phone} onChange={(e) => updateManagementField(index, 'phone', e.target.value)} className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Biography & Work Role</label>
                      <textarea rows={2} value={member.bio} onChange={(e) => updateManagementField(index, 'bio', e.target.value)} className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest text-[10px] rounded hover:bg-amber-400 transition cursor-pointer">Save Management Data</button>
              </div>
            </form>
          )}

          {/* Team Sub-tab Form */}
          {activeTab === 'team' && (
            <form onSubmit={saveTeam} className="p-8 bg-stone-900 border border-stone-800 rounded-2xl max-w-3xl space-y-8">
              <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-white">Team Members Info</h3>
                <button
                  type="button"
                  onClick={() => setTeamList([...teamList, { id: String(Date.now()), name: '', role: 'New Role', quote: '', experience: '', imageUrl: '' }])}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-500 hover:text-amber-450 text-xs font-semibold rounded uppercase tracking-wider transition cursor-pointer"
                >
                  + Add Team Member
                </button>
              </div>
              {teamList.map((member, index) => (
                <div key={member.id} className="border-b border-stone-800 pb-6 space-y-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => updateTeamField(index, 'role', e.target.value)}
                      className="text-[10px] uppercase tracking-wider text-amber-500 font-bold bg-amber-500/10 px-2 py-1 rounded border border-transparent focus:border-amber-500/30 focus:outline-none"
                      placeholder="Staff Role"
                    />
                    {teamList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = teamList.filter((_, idx) => idx !== index);
                          setTeamList(updated);
                        }}
                        className="px-2.5 py-1 text-[9px] bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded uppercase tracking-widest transition cursor-pointer font-bold"
                      >
                        Remove Member
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Full Name</label>
                      <input type="text" value={member.name} onChange={(e) => updateTeamField(index, 'name', e.target.value)} className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Custom Image URL (Optional)</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={member.imageUrl && member.imageUrl.startsWith('data:') ? '[Uploaded Image Base64 Data]' : (member.imageUrl || '')}
                          onChange={(e) => updateTeamField(index, 'imageUrl', e.target.value)}
                          className="flex-grow py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white"
                          placeholder="Leave empty for default portrait"
                        />
                        <label className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold rounded cursor-pointer transition flex-shrink-0">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleTeamImageUpload(index, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Professional Experience summary</label>
                      <input type="text" value={member.experience} onChange={(e) => updateTeamField(index, 'experience', e.target.value)} className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Personal Hospitality Quote</label>
                      <input type="text" value={member.quote} onChange={(e) => updateTeamField(index, 'quote', e.target.value)} className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest text-[10px] rounded hover:bg-amber-400 transition cursor-pointer">Save Team Data</button>
              </div>
            </form>
          )}

          {/* Services Sub-tab Form */}
          {activeTab === 'services' && (
            <form onSubmit={saveServices} className="p-8 bg-stone-900 border border-stone-800 rounded-2xl max-w-3xl space-y-8">
              <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-white">Services & Amenities Settings</h3>
                <button
                  type="button"
                  onClick={() => setServicesList([...servicesList, { id: String(Date.now()), title: 'New Service', description: '', imageUrl: '' }])}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-500 hover:text-amber-450 text-xs font-semibold rounded uppercase tracking-wider transition cursor-pointer"
                >
                  + Add Service
                </button>
              </div>
              {servicesList.map((service, index) => (
                <div key={service.id} className="border-b border-stone-800 pb-6 space-y-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold bg-amber-500/10 px-2 py-1 rounded">Amenity {index + 1}</span>
                    {servicesList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = servicesList.filter((_, idx) => idx !== index);
                          setServicesList(updated);
                        }}
                        className="px-2.5 py-1 text-[9px] bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded uppercase tracking-widest transition cursor-pointer font-bold"
                      >
                        Remove Service
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Title</label>
                      <input type="text" value={service.title} onChange={(e) => updateServicesField(index, 'title', e.target.value)} className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Custom Image URL (Optional)</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={service.imageUrl && service.imageUrl.startsWith('data:') ? '[Uploaded Image Base64 Data]' : (service.imageUrl || '')}
                          onChange={(e) => updateServicesField(index, 'imageUrl', e.target.value)}
                          className="flex-grow py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white"
                          placeholder="Leave empty for default photo"
                        />
                        <label className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold rounded cursor-pointer transition flex-shrink-0">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleServicesImageUpload(index, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase text-stone-500 mb-1">Service Description</label>
                      <textarea rows={2} value={service.description} onChange={(e) => updateServicesField(index, 'description', e.target.value)} className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded text-xs text-white" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold uppercase tracking-widest text-[10px] rounded hover:bg-amber-400 transition cursor-pointer">Save Services Data</button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
