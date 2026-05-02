'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, MapPin, Phone, Instagram, Music, Coffee, Flame, UtensilsCrossed, Check } from 'lucide-react';

const MENU_TABS = ['Semua', 'Premium', 'Chicken & Burger', 'Pasta & Steak', 'Nasi & Mie', 'Snack', 'Kopi & Minuman'];

const FULL_MENU = [
  { category: 'Premium', name: 'Beef Steak Crispy', price: '40K', desc: 'Tenderloin dengan balutan tepung, kentang goreng, mix vegetable, mushroom sauce' },
  { category: 'Premium', name: "Se'i Sapi", price: '38K', desc: 'Daging sapi asap dengan nasi dan sambal matah' },
  { category: 'Premium', name: 'Chicken Cordon Bleu', price: '35K', desc: 'Chicken breast digulung dengan mozzarela dan smoked beef, disajikan dengan spaghetti aglio olio' },
  { category: 'Premium', name: 'Fettuccine Carbonara', price: '28K', desc: 'Fettuccine dengan carbonara sauce dan smoke beef' },
  { category: 'Premium', name: 'Battered Dori with Fettuccine Alfredo', price: '30K', desc: 'Dori tepung dengan fettuccine Alfredo, khas sauce putih' },
  { category: 'Premium', name: 'Battered Dori With Spaghetti Aglio Olio', price: '30K', desc: 'Dori tepung dengan spaghetti aglio olio' },
  
  { category: 'Pasta & Steak', name: 'Chicken Steak', price: '35K', desc: 'Chicken breast crispy + french fries + mix vegetable' },
  { category: 'Pasta & Steak', name: 'Chicken Spinach Cordon Bleu', price: '33K', desc: 'Chicken breast digulung dengan mozzarela dan smoke beef + french fries' },
  { category: 'Pasta & Steak', name: 'Fish n Chips Marinara', price: '30K', desc: '' },
  { category: 'Pasta & Steak', name: 'Fish n Chips Creamy', price: '30K', desc: '' },
  { category: 'Pasta & Steak', name: 'Fish n Chips Cheese', price: '25K', desc: '' },
  { category: 'Pasta & Steak', name: 'Spaghetti Aglio Olio', price: '30K', desc: 'Spaghetti dengan tumisan bawang, mushroom, dan chicken' },
  { category: 'Pasta & Steak', name: 'Spaghetti Bolognese', price: '25K', desc: 'Bolognese sauce, daging cincang, dan sosis slice' },

  { category: 'Chicken & Burger', name: 'Ayam Djontor', price: '28K', desc: 'Nasi putih + ayam bakar kecap sambal djontor, slada, timun, tomat' },
  { category: 'Chicken & Burger', name: 'Ayam Geprek Mozzarela + Nasi', price: '35K', desc: 'Ayam tepung digeprek + sambal + mozzarela + nasi' },
  { category: 'Chicken & Burger', name: 'Beef Quesadilla', price: '30K', desc: 'Daging sapi cincang + bawang bombay dibungkus tortilla + sauce fajitas' },
  { category: 'Chicken & Burger', name: 'BBQ/Spicy Chicken Wings', price: '28K', desc: 'Sayap ayam dibalut tepung + sauce bbq / spicy' },
  { category: 'Chicken & Burger', name: 'Cheese Burger + French Fries', price: '30K', desc: '' },
  { category: 'Chicken & Burger', name: 'Double Original Burger + Onion Ring', price: '35K', desc: '' },
  { category: 'Chicken & Burger', name: 'Double Cheese Burger + French Fries', price: '33K', desc: '' },
  { category: 'Chicken & Burger', name: 'Original Burger + Onion Ring', price: '25K', desc: '' },
  { category: 'Chicken & Burger', name: 'Chicken Quesadilla', price: '27K', desc: '' },
  { category: 'Chicken & Burger', name: 'Cheese Quesadilla', price: '22K', desc: '' },
  { category: 'Chicken & Burger', name: 'Ayam Geprek Keju + Nasi', price: '31K', desc: '' },
  { category: 'Chicken & Burger', name: 'Ayam Geprek + Nasi', price: '28K', desc: '' },

  { category: 'Nasi & Mie', name: 'Cheese Lovers', price: '25K', desc: 'Ayam katsu + creamy sauce + mozzarela + nasi putih' },
  { category: 'Nasi & Mie', name: 'Nasi Goreng Seafood', price: '30K', desc: 'Bumbu merah + mix vegetable + udang + telur' },
  { category: 'Nasi & Mie', name: 'Nasi Goreng Kampung', price: '30K', desc: 'Bumbu desa istimewa + chicken smalldies' },
  { category: 'Nasi & Mie', name: 'Nasi Goreng Sapi', price: '35K', desc: 'Bumbu merah + potongan daging sapi + telur mata sapi' },
  { category: 'Nasi & Mie', name: 'Butter Rice', price: '25K', desc: 'Nasi putih ditumis dengan butter + mix vegetable + telur mata sapi' },
  { category: 'Nasi & Mie', name: 'Chicken Thai', price: '25K', desc: 'Potongan ayam tumis saos asam manis + paprika + bawang bombay + nasi' },
  { category: 'Nasi & Mie', name: 'Nasi Pedia 1', price: '20K', desc: 'Nasi putih + telur + tahu tempe + salad + sambal kecap' },
  { category: 'Nasi & Mie', name: 'Nasi Pedia 2', price: '25K', desc: 'Nasi putih + chicken teriyaki + coslow salad' },
  { category: 'Nasi & Mie', name: 'Nasi Pedia 3', price: '25K', desc: 'Nasi goreng + telur + bakso + coslow salad' },
  { category: 'Nasi & Mie', name: 'Nasi Pedia 4', price: '27K', desc: 'Nasi goreng + telur + sosis + keju + coslow salad' },
  { category: 'Nasi & Mie', name: 'Nasi Pedia 5', price: '30K', desc: 'Nasi goreng + chicken katsu + coslow salad' },
  { category: 'Nasi & Mie', name: 'Indomie Rebus Spesial', price: '25K', desc: 'Telur mata sapi + bakso + sosis keju' },
  { category: 'Nasi & Mie', name: 'Indomie Goreng Spesial', price: '25K', desc: 'Telur mata sapi + bakso + sosis keju' },
  { category: 'Nasi & Mie', name: 'Indomie Rebus Telor', price: '15K', desc: '' },
  { category: 'Nasi & Mie', name: 'Indomie Goreng Telur', price: '15K', desc: '' },
  { category: 'Nasi & Mie', name: 'Indomie Goreng Biasa', price: '10K', desc: '' },
  { category: 'Nasi & Mie', name: 'Indomie Rebus Biasa', price: '10K', desc: '' },
  { category: 'Nasi & Mie', name: 'Kwetiaw Ayam', price: '23K', desc: '' },
  { category: 'Nasi & Mie', name: 'Kwetiaw Seafood', price: '27K', desc: '' },

  { category: 'Snack', name: 'Singkong Keju', price: '19K', desc: 'Singkong goreng dengan taburan keju' },
  { category: 'Snack', name: 'Spicy Tofu', price: '18K', desc: '' },
  { category: 'Snack', name: 'Capcay', price: '18K', desc: '' },
  { category: 'Snack', name: 'Pisang Goreng', price: '15K', desc: 'Pisang dibalut tepung crispy' },
  { category: 'Snack', name: 'Cireng', price: '15K', desc: 'Disajikan dengan saos bumbu rujak' },
  { category: 'Snack', name: 'Pangsit Crispy', price: '10K', desc: '' },
  { category: 'Snack', name: 'Udang Tempura', price: '25K', desc: '' },
  { category: 'Snack', name: 'Sosis Bakar + French Fries', price: '25K', desc: '' },
  { category: 'Snack', name: 'Onion Ring', price: '16K', desc: '' },
  { category: 'Snack', name: 'Otak Otak Ikan Tengiri', price: '15K', desc: '' },
  { category: 'Snack', name: 'Jamur Crispy', price: '18K', desc: '' },
  { category: 'Snack', name: 'French Fries', price: '17K', desc: '' },
  { category: 'Snack', name: 'Sosis Bakar + Onion Ring', price: '25K', desc: '' },
  { category: 'Snack', name: 'French Fries Bolognese', price: '22K', desc: '' },
  { category: 'Snack', name: 'French Fries Cheese', price: '21K', desc: '' },
  { category: 'Snack', name: 'Roti Bakar Chocolate', price: '20K', desc: 'Coklat astor dan biskuit' },
  { category: 'Snack', name: 'Roti Bakar Nutella', price: '25K', desc: 'Nutella + biskuit + chococrunch' },
  { category: 'Snack', name: 'Roti Bakar Keju', price: '22K', desc: 'Keju + cococrunch + biskuit' },
  { category: 'Snack', name: 'Roti Bakar Strawberry', price: '21K', desc: 'Selai strawberry + astor' },

  { category: 'Kopi & Minuman', name: 'Kopi Susu Pandan Hot/Ice', price: '20K', desc: 'Khas rasa dan aroma pandan yang dominan' },
  { category: 'Kopi & Minuman', name: 'Moccacino Hot/Ice', price: '24K', desc: 'Dark coklat dipadukan dengan extra kopi pahit dan susu manis' },
  { category: 'Kopi & Minuman', name: 'Cappucino Hot/Ice', price: '25K', desc: 'Tekstur foamy, rasa lebih pahit dari latte' },
  { category: 'Kopi & Minuman', name: 'Kopi Susu Aren', price: '22K', desc: 'Extra coffee + gula aren + creamer susu segar' },
  { category: 'Kopi & Minuman', name: 'Americano Hot/Ice', price: '18K', desc: 'Rasa dominan pahit, cocok untuk penyuka kopi murni' },
  { category: 'Kopi & Minuman', name: 'Cold White Latte Ice', price: '20K', desc: 'Cold brewing + sedikit susu segar + gula almond vanilla + caramel sirup' },
  { category: 'Kopi & Minuman', name: 'Affogato', price: '20K', desc: '' },
  { category: 'Kopi & Minuman', name: 'Cafe Latte (hot/ice)', price: '25K', desc: '' },
  { category: 'Kopi & Minuman', name: 'Vanilla Latte (hot/ice)', price: '22K/23K', desc: '' },
  { category: 'Kopi & Minuman', name: 'Almond Latte (hot/ice)', price: '22K/23K', desc: '' },
  { category: 'Kopi & Minuman', name: 'Caramel Latte (hot/ice)', price: '22K/23K', desc: '' },
  { category: 'Kopi & Minuman', name: 'Hazelnut Latte (hot/ice)', price: '22K/23K', desc: '' },
  { category: 'Kopi & Minuman', name: 'Butterscotch Hot/Ice', price: '23K', desc: 'Paduan rasa kopi dengan rasa karamel yang kental' },
  { category: 'Kopi & Minuman', name: 'Liquid Coffee', price: '27K', desc: 'Tampilan rasa terbaik dari ekstrak kopi' },
  { category: 'Kopi & Minuman', name: 'Coffee Float', price: '25K', desc: 'Pahit coffee + manisnya ice cream dengan citarasa khas' },
  { category: 'Kopi & Minuman', name: 'Caramel Macchiato', price: '25K', desc: '' },
  { category: 'Kopi & Minuman', name: 'Juice Mango', price: '22K', desc: '' },
  { category: 'Kopi & Minuman', name: 'Avocado Juice', price: '22K', desc: '' },
  { category: 'Kopi & Minuman', name: 'Orange Juice', price: '18K', desc: '' },
];

const fadeInUp: any = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.035 }
  }
};

const staggerMenuContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMenu = activeTab === 'Semua' ? FULL_MENU : FULL_MENU.filter(m => m.category === activeTab);

  return (
    <main className="w-full relative bg-amber-950 font-sans selection:bg-amber-500/30 selection:text-white pb-0">
      
      {/* 1. NAVIGATION */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-amber-950 border-b border-amber-500/20 py-4 shadow-lg shadow-black/20' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-black text-2xl md:text-3xl text-amber-500 tracking-tight lowercase">foodpedia</span>
            <span className="font-script text-amber-200 text-lg md:text-xl -mt-1 tracking-wide">× Secangkir Cerita</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {['Menu', 'Paket', 'Shabu & Grill', 'Kopi', 'Reservasi'].map(link => (
              <button 
                key={link} 
                onClick={() => document.getElementById(link.toLowerCase().replace(/ & | /g, '-'))?.scrollIntoView()}
                className="text-amber-200 hover:text-amber-500 transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer bg-transparent border-none p-0"
              >
                {link}
              </button>
            ))}
            <a href="tel:087790006003" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold rounded-sm transition-all duration-300 shrink-0">
              Reservasi Sekarang
            </a>
          </div>

          <button className="lg:hidden text-white cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-amber-950/98 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
          >
            {['Menu', 'Paket', 'Shabu & Grill', 'Kopi', 'Reservasi'].map(link => (
              <button 
                key={link} 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById(link.toLowerCase().replace(/ & | /g, '-'))?.scrollIntoView();
                }}
                className="text-white text-2xl font-serif text-center bg-transparent border-none cursor-pointer"
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[100dvh] pt-32 pb-20 px-6 md:px-8 flex items-center bg-[#100a00]">
        <div className="noise-overlay" />
        
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
          <motion.div 
            className="md:col-span-12 lg:col-span-8 flex flex-col justify-center space-y-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="text-amber-500 uppercase tracking-[0.2em] text-xs font-bold w-fit">
              Metland Cileungsi · Est. Cileungsi, Bogor
            </motion.span>
            
            <motion.h1 variants={fadeInUp} className="font-serif leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}>
              <span className="block font-black text-white">Makan Enak.</span>
              <span className="block text-amber-500 italic" style={{fontFamily: 'var(--font-lora)', fontSize: 'clamp(48px, 6vw, 84px)'}}>Cerita Seru.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-amber-200 text-lg md:text-xl max-w-xl leading-relaxed mt-2 font-medium">
              Fusion food dari ayam geprek hingga beef steak. Kopi dari Secangkir Cerita yang bikin betah. Satu tempat, banyak alasan untuk kembali.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => document.getElementById('menu')?.scrollIntoView()} className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-sm transition-all duration-300 cursor-pointer border-none text-base">
                Lihat Menu
              </button>
              <a href="tel:087790006003" className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500/10 font-bold rounded-sm transition-all duration-300 text-base">
                Reservasi Meja
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-8 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 bg-amber-900/50 rounded-full px-4 py-1.5 border border-amber-500/20 w-fit">
                <span className="text-amber-400">⭐ 4.5</span>
                <span className="text-amber-200/50">·</span>
                <span className="text-amber-200 text-sm font-medium">291 Ulasan</span>
              </div>
              
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-white font-medium text-sm">
                <span className="flex items-center gap-2 max-w-fit"><UtensilsCrossed size={18} className="text-amber-500"/> Menu Fusion Lengkap</span>
                <span className="flex items-center gap-2 max-w-fit"><Coffee size={18} className="text-amber-500"/> Specialty Coffee & Drinks</span>
                <span className="flex items-center gap-2 max-w-fit"><Flame size={18} className="text-amber-500"/> Paket Shabu & Grill</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. QUICK INFO STRIP */}
      <div className="w-full bg-amber-500 text-amber-950 font-bold py-3 px-6 text-xs md:text-sm overflow-hidden z-20 relative">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center items-center gap-y-2 gap-x-4 md:gap-x-6">
          <span>Mon–Fri: 9AM–10PM</span>
          <span className="hidden sm:inline opacity-30">·</span>
          <span>Sabtu: 9AM–11PM</span>
          <span className="hidden sm:inline opacity-30">·</span>
          <span>📞 0877 9000 6003</span>
          <span className="hidden md:inline opacity-30">·</span>
          <span className="hidden md:inline">📍 Ruko Colony Blok DE, Metland Cileungsi</span>
          <span className="hidden lg:inline opacity-30">·</span>
          <span className="hidden lg:inline">Free Wi-Fi</span>
          <span className="hidden lg:inline opacity-30">·</span>
          <span className="hidden lg:inline">Free Parking</span>
        </div>
      </div>

      {/* 4. PAKET SPESIAL SHABU & GRILL */}
      <section id="shabu-grill" className="py-24 px-6 md:px-8 bg-red-950 relative border-y border-amber-500/10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="flex flex-col items-center text-center mb-16">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-xs uppercase tracking-widest rounded-sm mb-4">🔥 Paket Unggulan</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">Paket Spesial Shabu & Grill</h2>
            <p className="text-amber-200 text-lg md:text-xl font-medium">Pilih Shabu atau Grill. Cocok untuk makan bersama.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <motion.div variants={fadeInUp} className="bg-[#2A0A00] border-y border-r border-amber-500/20 border-l-4 border-l-amber-500 rounded-xl p-8 hover:border-amber-500/50 transition-colors relative group">
              <div className="absolute top-5 right-5 bg-amber-500 text-[#2A0A00] text-xs font-bold px-3 py-1 rounded-sm">Paling Populer</div>
              <div className="text-4xl mb-4">👥👥👥👥</div>
              <h3 className="text-3xl font-serif font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">BER-4</h3>
              <div className="text-2xl font-mono text-amber-500 font-bold mb-6">IDR 150.000</div>
              <p className="text-amber-100 font-medium text-lg leading-relaxed">Shabu <span className="italic">atau</span> Grill untuk 4 orang + Nasi + Minuman</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-[#2A0A00] border-y border-r border-amber-500/20 border-l-4 border-l-amber-500 rounded-xl p-8 hover:border-amber-500/50 transition-colors group">
              <div className="text-4xl mb-4">👥👥</div>
              <h3 className="text-3xl font-serif font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">BER-2</h3>
              <div className="text-2xl font-mono text-amber-500 font-bold mb-6">IDR 75.000</div>
              <p className="text-amber-100 font-medium text-lg leading-relaxed mb-1">Pilih Shabu <span className="italic">ATAU</span> Grill untuk 2 orang + Nasi + Minuman</p>
              <p className="text-amber-200/60 text-sm italic font-medium">Pilih sesuai selera</p>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-12 text-center">
            <a href="tel:087790006003" className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-lg rounded-sm transition-all duration-300">
              Pesan Sekarang <span>→</span> 0877 9000 6003
            </a>
          </motion.div>
        </div>
      </section>

      {/* 5. MENU PAKET SECTION */}
      <section id="paket" className="py-24 px-6 md:px-8 bg-amber-950 relative">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Paket Hemat Foodpedia</h2>
            <p className="text-amber-200 text-lg">Nasi + Ayam + Minuman pilihan. Mulai dari 30K.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid flex-nowrap md:grid-cols-4 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory">
            {[
              { title: "Ayam Goreng Rempah", price: "30K", desc: "Ayam goreng dengan bumbu rempah pilihan", incl: "Nasi" },
              { title: "Paket A", price: "39K", desc: "Chicken Thai", incl: "Nasi + Ice Lemon Tea" },
              { title: "Paket B", price: "39K", desc: "Ayam Djontor", incl: "Nasi + Orange Juice" },
              { title: "Paket C", price: "39K", desc: "Ayam Geprek", incl: "Nasi + Passion Fruit Juice" }
            ].map((paket, i) => (
              <motion.div key={i} variants={fadeInUp} className="snap-start min-w-[280px] md:min-w-0 bg-amber-900 p-6 rounded-lg border-l-4 border-amber-500 transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,140,26,0.1)] group">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors leading-tight">{paket.title}</h3>
                  <span className="font-mono text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded text-sm shrink-0">Rp {paket.price}</span>
                </div>
                <p className="text-amber-200 text-sm mb-5 leading-relaxed">{paket.desc}</p>
                <div className="pt-4 border-t border-amber-500/10 text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Check size={14} className="shrink-0" /> {paket.incl}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-amber-200 mt-2 text-sm italic font-medium border-l-[3px] border-amber-500/50 pl-3">Pilihan minuman: Ice Lemon Tea / Orange Juice / Passion Fruit Juice</p>
        </div>
      </section>

      {/* 6. FULL MENU SECTION */}
      <section id="menu" className="py-24 px-6 md:px-8 bg-black/20 relative border-t border-amber-500/10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="mb-12 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Menu Lengkap</h2>
            <p className="text-amber-200 text-lg">Dari masakan Indonesia hingga Western. Halal. Dimasak segar.</p>
          </motion.div>

          <div className="flex overflow-x-auto no-scrollbar gap-2 mb-12 pb-4 border-b border-amber-500/10 justify-start md:justify-center">
            {MENU_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border-none cursor-pointer ${activeTab === tab ? 'bg-amber-500 text-amber-950' : 'bg-amber-900/40 text-amber-200 hover:text-white hover:bg-amber-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div 
            key={activeTab}
            initial="hidden" animate="visible" variants={staggerMenuContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6"
          >
            {filteredMenu.map((item, idx) => (
              <motion.article key={idx} variants={fadeInUp} className="group relative flex justify-between items-start border-b border-amber-500/10 pb-4">
                <div className="pr-4">
                  <h4 className="text-white font-bold uppercase tracking-tight md:text-lg leading-tight group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h4>
                  {item.desc && <p className="text-amber-200 text-sm mt-1 mb-0 italic" style={{fontFamily: 'var(--font-lora)'}}>{item.desc}</p>}
                </div>
                <div className="font-mono text-amber-500 font-bold shrink-0 text-lg">Rp {item.price}</div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. SECANGKIR CERITA — COFFEE SECTION */}
      <section id="kopi" className="py-24 px-6 md:px-8 bg-coffee-950 relative border-t border-amber-500/10 overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-px mix-blend-overlay w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-20"></div>
        <div className="max-w-[1000px] mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="mb-16 text-center flex flex-col items-center">
             <h2 className="text-5xl md:text-7xl font-script text-amber-400 mb-6 font-medium">× Secangkir Cerita</h2>
             <p className="text-amber-200 text-lg max-w-2xl font-medium">Setiap cangkir punya ceritanya. Specialty coffee & minuman segar untuk menemani harimu.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerMenuContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 text-left bg-black/20 md:border-l border-amber-500/10 p-6 md:p-10 rounded-2xl"
          >
             {FULL_MENU.filter(m => m.category === 'Kopi & Minuman').slice(0, 10).map((item, idx) => (
                <motion.article key={idx} variants={fadeInUp} className="flex justify-between items-start border-b border-amber-400/10 pb-3 group">
                  <div className="pr-4">
                    <h4 className="text-amber-50 font-bold uppercase tracking-tight md:text-lg group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h4>
                    {item.desc && <p className="text-amber-200 text-sm mt-1 italic" style={{fontFamily: 'var(--font-lora)'}}>{item.desc}</p>}
                  </div>
                  <div className="font-mono text-amber-400 opacity-90 shrink-0 font-bold">Rp {item.price}</div>
                </motion.article>
             ))}
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-12 text-center">
             <button 
               onClick={() => {document.getElementById('menu')?.scrollIntoView(); setActiveTab('Kopi & Minuman');}} 
               className="text-amber-400 hover:text-white underline underline-offset-4 text-sm font-bold tracking-widest uppercase transition-colors bg-transparent border-none cursor-pointer"
             >
               Lihat Semua Minuman &rarr;
             </button>
          </motion.div>
        </div>
      </section>

      {/* 8. ATMOSPHERE / VISIT US */}
      <section className="py-24 px-6 md:px-8 bg-[#180f00] relative border-t border-amber-500/10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-[1.1] mb-6 text-white">Tempatnya memang di Metland. Tapi rasanya kayak jalan-jalan jauh.</h2>
            <p className="text-amber-200 text-lg max-w-sm xl:max-w-md leading-relaxed border-l-2 border-amber-500 pl-6 italic font-medium">
              Quiet enough to focus. Cosy enough to stay. Romantic enough for a date. Family-friendly enough to bring everyone.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="bg-[#120b00] p-8 md:p-10 rounded-2xl border border-amber-500/10 space-y-10">
            <motion.div variants={fadeInUp}>
              <h3 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4">Jam Buka</h3>
              <ul className="text-white space-y-2 font-medium text-lg">
                <li className="flex justify-between items-center border-b border-amber-500/10 pb-2"><span>Sun–Mon</span> <span className="font-mono text-amber-400">9:00 AM – 10:00 PM</span></li>
                <li className="flex justify-between items-center pt-1"><span>Saturday</span> <span className="font-mono text-amber-400">9:00 AM – 11:00 PM</span></li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4">Fasilitas</h3>
              <div className="flex flex-wrap gap-2 text-sm font-medium text-amber-100">
                {['Dine-in', 'Outdoor Seating', 'Takeaway', 'Delivery', 'Free Wi-Fi', 'Free Parking', 'Wheelchair Accessible', 'Kids Menu', 'High Chairs', 'Accepts Reservations', 'Table Service'].map(f => (
                  <span key={f} className="bg-amber-950 border border-amber-500/30 px-3 py-1.5 rounded-sm">{f}</span>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h3 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4">Alamat</h3>
              <p className="text-white font-medium leading-relaxed mb-4 text-base">
                No.01 Blok DE, Ruko Colony, Jl. Boulevard Metland Cileungsi No.01, Cipenjo, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820
              </p>
              <a href="https://maps.google.com/?q=Foodpedia+Secangkir+Cerita+Metland+Cileungsi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-400 hover:text-white font-bold transition-colors">
                Get Directions &rarr;
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 9. POLICY BANNER */}
      <div className="w-full bg-amber-500 text-amber-950 text-center py-4 px-6 border-y border-amber-500/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
        <p className="text-sm max-w-3xl mx-auto font-bold tracking-wide">
          ⚠️ Dilarang membawa makanan dan minuman dari luar. Pelanggaran akan dikenakan charge 20% dari total pesanan.
        </p>
      </div>

      {/* 10. CTA SECTION */}
      <section id="reservasi" className="py-24 px-6 md:px-8 bg-amber-950 relative border-t border-amber-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-amber-950 to-amber-950 pointer-events-none"></div>
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Siap Makan? Siap Reservasi?</h2>
            <p className="text-amber-200 text-lg mb-12 font-medium">Hubungi kami langsung atau kunjungi outlet kami di Metland Cileungsi.</p>
            <div className="flex gap-4 justify-center items-center flex-col sm:flex-row">
              <a href="tel:087790006003" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-lg rounded-sm transition-all duration-300">
                <Phone size={20} /> Telpon / WhatsApp
              </a>
              <a href="https://maps.google.com/?q=Foodpedia+Secangkir+Cerita+Metland+Cileungsi" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-900 border border-amber-500/30 hover:bg-amber-800 text-amber-50 font-bold text-lg rounded-sm transition-all duration-300">
                <MapPin size={20} /> Lihat di Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-[#0D0A00] pt-20 pb-8 px-6 md:px-8 text-amber-200 text-sm font-medium">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col">
            <div className="flex flex-col mb-4">
              <span className="font-bold text-2xl text-amber-500 tracking-tight lowercase">foodpedia</span>
              <span className="font-script text-amber-200 text-xl -mt-1 tracking-wide">× Secangkir Cerita</span>
            </div>
            <p className="text-amber-200/60 font-serif italic text-lg leading-relaxed">Makan Enak<br/>Cerita Seru.</p>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-xs">Menu Cepat</h4>
            <ul className="space-y-4">
              {['Menu', 'Paket', 'Shabu & Grill', 'Kopi', 'Reservasi'].map(link => (
                <li key={link}>
                  <button onClick={() => document.getElementById(link.toLowerCase().replace(/ & | /g, '-'))?.scrollIntoView()} className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer p-0 font-medium">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-xs">Kontak</h4>
            <ul className="space-y-4">
              <li><a href="tel:087790006003" className="flex items-center gap-3 hover:text-amber-400 transition-colors"><Phone size={16} className="text-amber-500"/> 0877 9000 6003</a></li>
              <li><a href="https://wa.me/6287790006003" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-amber-400 transition-colors"><Phone size={16} className="text-amber-500"/> WhatsApp</a></li>
              <li><a href="https://www.instagram.com/foodpedia.metlandcileungsi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-amber-400 transition-colors"><Instagram size={16} className="text-amber-500"/> @foodpedia.metland</a></li>
              <li><a href="https://www.tiktok.com/@foodpedia.cileungsi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-amber-400 transition-colors"><Music size={16} className="text-amber-500"/> @foodpedia.cileungsi</a></li>
              <li><a href="https://www.foodpedia.co.id" className="flex items-center gap-3 hover:text-amber-400 transition-colors text-amber-500 underline underline-offset-4">www.foodpedia.co.id</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-xs">Lokasi & Jam</h4>
            <ul className="space-y-4 text-amber-200/80">
              <li className="leading-relaxed"><MapPin size={16} className="text-amber-500 inline mr-2 -mt-1"/>No.01 Blok DE, Ruko Colony, Jl. Boulevard Metland Cileungsi, Cipenjo, Cileungsi, Bogor 16820</li>
              <li className="border-t border-amber-500/10 pt-4"><strong className="text-white font-normal block mb-1">Jam Operasional:</strong>Sun–Mon: 9AM–10PM<br/>Saturday: 9AM–11PM</li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto border-t border-amber-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-amber-200/50 text-xs font-medium">
          <p>© 2025 Foodpedia × Secangkir Cerita. All rights reserved.</p>
          <p>Ruko Colony, Metland Cileungsi</p>
        </div>
      </footer>
    </main>
  );
}
