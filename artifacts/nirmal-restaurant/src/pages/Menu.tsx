import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import chocolateTrifle   from '@assets/menu-chocolate-trifle.jpg';
import chocolateCake     from '@assets/menu-chocolate-cake.jpg';
import iceCreamSundae    from '@assets/menu-ice-cream-sundae.jpg';
import hazelnutIceCream  from '@assets/menu-hazelnut-icecream.jpg';
import chocolateIceCream from '@assets/menu-chocolate-icecream.jpg';
import royalSundae       from '@assets/menu-royal-sundae.jpg';
import halwaBarfi        from '@assets/menu-halwa-barfi.jpg';

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  tag?: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chocolate-trifle',
    name: 'Chocolate Trifle',
    desc: 'Layered dark brownie & silky white chocolate mousse, topped with chocolate shavings.',
    price: 149,
    img: chocolateTrifle,
    tag: '🍫 Best Seller',
  },
  {
    id: 'chocolate-fudge-cake',
    name: 'Chocolate Fudge Cake',
    desc: 'Three-layer moist chocolate cake drenched in glossy ganache with cocoa curls.',
    price: 179,
    img: chocolateCake,
    tag: "⭐ Chef's Pick",
  },
  {
    id: 'ice-cream-sundae',
    name: 'Ice Cream Sundae',
    desc: 'Tall glass of vanilla & chocolate scoops loaded with fudge sauce and whipped cream.',
    price: 159,
    img: iceCreamSundae,
  },
  {
    id: 'hazelnut-icecream',
    name: 'Hazelnut Chocolate Ice Cream',
    desc: 'Rich chocolate gelato drizzled with hazelnut caramel and crushed toasted nuts.',
    price: 129,
    img: hazelnutIceCream,
  },
  {
    id: 'chocolate-icecream',
    name: 'Chocolate Ice Cream',
    desc: 'Premium triple-chocolate scoops in a cold glass bowl with dark chocolate chips.',
    price: 99,
    img: chocolateIceCream,
  },
  {
    id: 'royal-sundae',
    name: 'Royal Chocolate Sundae',
    desc: 'Overflowing chocolate ice cream with wafer roll, whipped cream & a maraschino cherry.',
    price: 189,
    img: royalSundae,
    tag: '👑 Royal',
  },
  {
    id: 'halwa-barfi',
    name: 'Halwa Barfi',
    desc: 'Traditional semolina barfi garnished with coconut flakes and crushed pistachios.',
    price: 89,
    img: halwaBarfi,
    tag: '🌿 Desi Favourite',
  },
];

// ── Animated Card ──────────────────────────────────────────────────────────
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
      className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <motion.img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Tag badge */}
        {item.tag && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: (index % 3) * 0.1 + 0.3, duration: 0.4 }}
            className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#8B1A1A] text-xs font-bold px-3 py-1 rounded-full shadow-sm"
          >
            {item.tag}
          </motion.div>
        )}

        {/* Price pill floating at bottom-right */}
        <div className="absolute bottom-3 right-3 bg-[#8B1A1A] text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
          ₹{item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-[#8B1A1A] transition-colors duration-200">
          {item.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

// ── Floating sparkle dots ─────────────────────────────────────────────────
function FloatingDot({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#8B1A1A]/10 pointer-events-none"
      style={style}
      animate={{ y: [-8, 8, -8], opacity: [0.4, 0.9, 0.4] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function Menu() {
  return (
    <div className="min-h-screen bg-[#FDF8F3] pb-20">
      {/* ── Hero header ── */}
      <div className="relative bg-[#8B1A1A] overflow-hidden pt-28 pb-16 text-center">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#F5C842] text-xs tracking-[0.3em] font-semibold uppercase mb-3"
        >
          Nirmal Family Restaurant
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-4"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Our Menu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-base max-w-md mx-auto"
        >
          Handcrafted desserts made with love — every bite is a celebration.
        </motion.p>

        {/* Wavy divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full fill-[#FDF8F3]">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      {/* ── Item count strip ── */}
      <div className="text-center mt-10 mb-2">
        <span className="inline-block bg-[#8B1A1A]/10 text-[#8B1A1A] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
          🍽️ {MENU_ITEMS.length} Items Available
        </span>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-6xl mx-auto px-4 mt-8 relative">
        {/* Background floating dots */}
        <FloatingDot style={{ width: 18, height: 18, top: '10%', left: '2%' }} />
        <FloatingDot style={{ width: 10, height: 10, top: '30%', right: '3%' }} />
        <FloatingDot style={{ width: 14, height: 14, top: '60%', left: '5%' }} />
        <FloatingDot style={{ width: 8,  height: 8,  top: '80%', right: '6%' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {MENU_ITEMS.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* ── Footer note ── */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center text-gray-400 text-xs mt-14"
      >
        * All prices are inclusive of taxes. Menu subject to seasonal availability.
      </motion.p>
    </div>
  );
}
