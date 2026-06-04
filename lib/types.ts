export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  features: string[];
  specs: { size: string; view: string; guests: string };
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  stayDate: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}
