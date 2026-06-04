import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Celestia Grand | Luxury Residential & Wellness Hotel',
  description: 'Experience premium luxury living, five-star rooms, and legendary hospitality at Celestia Grand.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-stone-950 text-stone-100 selection:bg-amber-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
