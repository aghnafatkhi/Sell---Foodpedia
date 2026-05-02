import type {Metadata, Viewport} from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Dancing_Script, Lora } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const viewport: Viewport = {
  themeColor: '#1A1100',
};

export const metadata: Metadata = {
  title: 'Foodpedia × Secangkir Cerita — Fusion Food & Specialty Coffee | Metland Cileungsi',
  description: 'Foodpedia x Secangkir Cerita di Metland Cileungsi. Fusion food halal dari ayam geprek hingga beef steak, pasta, burger, shabu & grill, dan specialty coffee. â 4.5 (291 ulasan). Reservasi: 0877 9000 6003.',
  keywords: 'Foodpedia Cileungsi, Secangkir Cerita, restoran Metland Cileungsi, fusion food Cileungsi, kopi Cileungsi, shabu grill Bogor, ayam geprek Cileungsi, catering Cileungsi',
  openGraph: {
    title: 'Foodpedia × Secangkir Cerita | Makan Enak. Cerita Seru.',
    description: 'Fusion food halal + specialty coffee di Metland Cileungsi. Paket Shabu & Grill, ayam geprek, pasta, burger, dan kopi susu terbaik.',
    type: 'website',
    url: 'https://www.foodpedia.co.id',
  },
  alternates: {
    canonical: 'https://foodpedia.co.id',
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Foodpedia × Secangkir Cerita",
  "description": "Fusion food restaurant and specialty coffee in Metland Cileungsi, Bogor",
  "servesCuisine": ["Indonesian", "Western", "Fusion", "Coffee"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No.01 Blok DE, Ruko Colony, Jl. Boulevard Metland Cileungsi No.01",
    "addressLocality": "Cipenjo, Kec. Cileungsi",
    "addressRegion": "Kabupaten Bogor, Jawa Barat",
    "postalCode": "16820",
    "addressCountry": "ID"
  },
  "telephone": "+6287790006003",
  "url": "https://www.foodpedia.co.id",
  "priceRange": "Rp 25.000 – Rp 50.000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "291"
  },
  "openingHours": ["Su-Mo 09:00-22:00", "Sa 09:00-23:00"],
  "hasMap": "https://maps.google.com",
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Free Parking", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Outdoor Seating", "value": true}
  ],
  "sameAs": [
    "https://www.instagram.com/foodpedia.metlandcileungsi/",
    "https://www.tiktok.com/@foodpedia.cileungsi"
  ]
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${plusJakartaSans.variable} ${dancingScript.variable} ${lora.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-amber-950 text-white selection:bg-amber-500/30 font-sans mx-auto min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
