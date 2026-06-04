import { 
  Wifi, 
  Wind, 
  Tv, 
  UserCheck, 
  Car, 
  ShieldCheck, 
  Utensils, 
  ArrowUpDown 
} from 'lucide-react';
import { Room, Testimonial, GalleryItem } from './types';

export const rooms: Room[] = [
  {
    id: 'deluxe',
    name: 'Deluxe Serenity Suite',
    type: 'Deluxe Room',
    price: 550,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    features: ['Spacious Marble Terrace', 'Infinity Rain Shower', 'Handcrafted Silk Linens', 'Premium In-room Bar'],
    specs: { size: '64 m²', view: 'Panoramic Garden & Skyline', guests: 'Up to 2 Adults' },
    description: 'The Deluxe Serenity Suite merges warm earthly stone accents with sleek modern design. Perfect for long-term luxury residences looking for a tranquil haven away from the city crowd.'
  },
  {
    id: 'family',
    name: 'Signature Manor Suite',
    type: 'Family Room',
    price: 850,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
    features: ['Two Master Bedrooms', 'Fully Equipped Kitchenette', 'Dual Vanity Ensuite Bathroom', 'Floor-to-ceiling Balconies'],
    specs: { size: '120 m²', view: 'High floor Ocean Sunrise', guests: 'Up to 4 Adults, 2 Kids' },
    description: 'Designed exclusively for families who value grand spaces and supreme privacy. Includes individual lounges and direct access to kids-centered play zones.'
  },
  {
    id: 'vip',
    name: 'Celestia Presidential Residence',
    type: 'VIP Suite',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    features: ['24/7 Dedicated Butler Service', 'Private Heated Plunge Pool', 'Personal In-room Sauna', 'Exclusive Elite Lounge Access'],
    specs: { size: '250 m²', view: '360° Ocean & Mountains Vista', guests: 'Up to 6 Guests' },
    description: 'The pinnacle of five-star hospitality. The Celestia Presidential Residence offers an unparalleled level of bespoke service, private elevators, and handcrafted boutique interiors.'
  }
];

export const facilities = [
  { icon: Wifi, title: 'Ultra Fast WiFi 6', description: 'Gigabit fiber connections available throughout the residence and scenic gardens.' },
  { icon: Wind, title: 'Intelligent AC Nest', description: 'Advanced allergen filtration and automatic localized microclimate settings.' },
  { icon: Tv, title: 'Smart Apple TV Pro', description: '8K Ultra HD display paired with an immersive Bang & Olufsen high-fidelity system.' },
  { icon: UserCheck, title: '24/7 Elite Service', description: 'Bespoke concierge, private chefs, and personalized butler support at any hour.' },
  { icon: Car, title: 'VIP Secured Parking', description: 'Valet service, underground climate-controlled bays, and high-speed EV chargers.' },
  { icon: ShieldCheck, title: 'Supreme 5-Star Security', description: 'Discrete bio-metric checkpoints, private access floors, and 24/7 patrol guards.' },
  { icon: Utensils, title: 'Michelin Star Dining', description: 'Three exquisite in-house restaurants serving gourmet local and international cuisines.' },
  { icon: ArrowUpDown, title: 'Private Smart Elevators', description: 'Direct high-speed destination-control lifts prioritizing resident anonymity.' }
];

export const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Celestia Celestial Pool', category: 'Environment', image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80', description: 'Temperate-controlled luxury outdoor pool overlooking the city sunset skyline.' },
  { id: 2, title: 'The Amethyst Fine Restaurant', category: 'Gastronomy', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80', description: 'Award-winning private dining experience curate by international master chefs.' },
  { id: 3, title: 'Celestial Sanctuary Spa', category: 'Wellness', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', description: 'Signature hot-stone therapies, holistic body wraps, and absolute peace.' },
  { id: 4, title: 'Celestia Grand Exterior Facade', category: 'Architecture', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', description: 'The timeless visual icon that commands the city’s residential golden mile.' },
  { id: 5, title: 'The Opal Executive Lounge', category: 'Environment', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80', description: 'Bespoke meeting setups and cocktail bars reserved exclusively for residence guests.' },
  { id: 6, title: 'Grand Royal Entrance Lobby', category: 'Architecture', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', description: 'Majestic hand-carved stone layouts with a stunning crystal chandelier array.' }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Princess Sofia Romanov',
    role: 'Diplomatic Resident',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    text: 'Celestia Grand is not merely a hotel; it is an extension of home. The customized attention from our dedicated butler converted our three-month seasonal diplomatic stay into an unforgettable memory of comfort and serenity.',
    stayDate: 'Stayed in March 2026'
  },
  {
    id: 2,
    name: 'Alexander Sterling',
    role: 'Sovereign Capital CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    text: 'Having traveled to nearly 90 countries, I can confidently assert the executive suite at Celestia Grand competes directly with the finest in Switzerland. The absolute anonymity, high-fidelity secure office, and spa were stellar.',
    stayDate: 'Stayed in May 2026'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'International Fine Art Curator',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    text: 'The architecture speaks directly to standard Roman classics blended with brutalist elegance. Every single corridor carries curated artwork, and the lighting temperature is calculated flawlessly to relax the human optic nerves.',
    stayDate: 'Stayed in January 2026'
  }
];
