import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import chocolateTrifle   from '@assets/menu-chocolate-trifle.jpg';
import chocolateCake     from '@assets/menu-chocolate-cake.jpg';
import iceCreamSundae    from '@assets/menu-ice-cream-sundae.jpg';
import hazelnutIceCream  from '@assets/menu-hazelnut-icecream.jpg';
import chocolateIceCream from '@assets/menu-chocolate-icecream.jpg';
import royalSundae       from '@assets/menu-royal-sundae.jpg';
import halwaBarfi        from '@assets/menu-halwa-barfi.jpg';
import peda              from '@assets/menu-peda.jpg';
import rasmalai          from '@assets/menu-rasmalai.jpg';
import fruitCustard      from '@assets/menu-fruit-custard.jpg';
import mithaiPlatter     from '@assets/menu-mithai-platter.jpg';
import gulabRasgullaMix  from '@assets/menu-gulab-rasgulla-mix.jpg';
import rasgulla          from '@assets/menu-rasgulla.jpg';
import kalakand          from '@assets/menu-kalakand.jpg';
import gulabJamun        from '@assets/menu-gulab-jamun.jpg';
import besanBarfiPhoto   from '@assets/WhatsApp_Image_2026-08-05_at_11.52.57_PM_1786126928615.jpeg';
import jalebiPhoto       from '@assets/WhatsApp_Image_2026-08-05_at_11.52.57_PM_(2)_1786126938191.jpeg';
import stuffedGulabJamunPhoto from '@assets/WhatsApp_Image_2026-08-05_at_11.52.57_PM_(1)_1786126940207.jpeg';
import pistaRoseIceCreamPhoto from '@assets/WhatsApp_Image_2026-08-05_at_11.53.01_PM_(2)_1786126969319.jpeg';
import shahiTukdaPhoto from '@assets/WhatsApp_Image_2026-08-05_at_11.53.01_PM_(1)_1786126973320.jpeg';
import anarPistaIceCreamPhoto from '@assets/WhatsApp_Image_2026-08-05_at_11.53.01_PM_1786127097524.jpeg';
import kajuKatliPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.21_PM_1786127256424.jpeg';
import mohanthalPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.22_PM_(2)_1786127258776.jpeg';
import pistaBarfiPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.22_PM_(1)_1786127260790.jpeg';
import coconutLadooPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.22_PM_1786127268788.jpeg';
import boondiLadooPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.23_PM_(2)_1786127271364.jpeg';
import milkPedaPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.23_PM_(1)_1786127273292.jpeg';
import gulabJamunPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.23_PM_1786127280640.jpeg';
import kesarSandeshPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.20_PM_(2)_1786127412197.jpeg';
import gulabJamunRabriPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.20_PM_(1)_1786127415162.jpeg';
import pinkCoconutRollPhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.20_PM_1786127418142.jpeg';
import gulabJamunSundaePhoto from '@assets/WhatsApp_Image_2026-08-06_at_10.56.21_PM_(1)_1786127420338.jpeg';

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
  {
    id: 'peda',
    name: 'Peda',
    desc: 'Soft melt-in-mouth milk peda topped with silver varq and fragrant dried flowers.',
    price: 79,
    img: peda,
    tag: '🌸 Festival Special',
  },
  {
    id: 'rasmalai',
    name: 'Rasmalai',
    desc: 'Spongy chhena dumplings soaked in saffron-cardamom rabri, garnished with pistachios.',
    price: 109,
    img: rasmalai,
    tag: '⭐ Must Try',
  },
  {
    id: 'fruit-custard',
    name: 'Fruit Custard',
    desc: 'Creamy vanilla custard loaded with fresh seasonal fruits, grapes and pomegranate.',
    price: 99,
    img: fruitCustard,
  },
  {
    id: 'mithai-platter',
    name: 'Mithai Platter',
    desc: 'Festival assortment of gulab jamun, rasgulla, jalebi, peda, barfi & modak in one tray.',
    price: 249,
    img: mithaiPlatter,
    tag: '🎉 Party Special',
  },
  {
    id: 'gulab-rasgulla-mix',
    name: 'Gulab Jamun & Rasgulla Mix',
    desc: 'Golden gulab jamun, milky rasgulla and mango kalakand rolls — a sweet lover\'s delight.',
    price: 139,
    img: gulabRasgullaMix,
    tag: '🍬 Popular Combo',
  },
  {
    id: 'rasgulla',
    name: 'Rasgulla',
    desc: 'Light & spongy chhena balls soaked in light sugar syrup — soft, fresh, classic Bengali style.',
    price: 89,
    img: rasgulla,
  },
  {
    id: 'kalakand',
    name: 'Kalakand',
    desc: 'Rich milk-cake rounds set with granulated paneer, topped with pistachios and almonds.',
    price: 99,
    img: kalakand,
    tag: '🌿 Desi Favourite',
  },
  {
    id: 'besan-barfi',
    name: 'Besan Barfi',
    desc: 'Soft, nutty gram-flour fudge finished with golden ghee and a generous topping of almonds.',
    price: 99,
    img: besanBarfiPhoto,
    tag: '🌿 Desi Favourite',
  },
  {
    id: 'jalebi',
    name: 'Jalebi',
    desc: 'Crisp saffron-orange spirals soaked in fragrant sugar syrup and finished with pistachios.',
    price: 89,
    img: jalebiPhoto,
    tag: '🔥 Fresh & Hot',
  },
  {
    id: 'stuffed-gulab-jamun',
    name: 'Stuffed Gulab Jamun',
    desc: 'Golden gulab jamun filled with creamy khoya and delicately finished with rose petals.',
    price: 129,
    img: stuffedGulabJamunPhoto,
    tag: '⭐ Must Try',
  },
  {
    id: 'pista-rose-ice-cream',
    name: 'Pista Rose Ice Cream',
    desc: 'Creamy pistachio and rose ice cream topped with roasted pistachios and rose petals.',
    price: 139,
    img: pistaRoseIceCreamPhoto,
    tag: '🌹 Seasonal Special',
  },
  {
    id: 'shahi-tukda',
    name: 'Shahi Tukda',
    desc: 'Rich bread pudding soaked in saffron rabri, finished with almonds and candied cherries.',
    price: 119,
    img: shahiTukdaPhoto,
    tag: '👑 Royal',
  },
  {
    id: 'anar-pista-ice-cream',
    name: 'Anar-Pista Ice Cream',
    desc: 'Silky vanilla ice cream swirled with pomegranate and topped with pistachios.',
    price: 139,
    img: anarPistaIceCreamPhoto,
    tag: '⭐ Must Try',
  },
  {
    id: 'kaju-katli',
    name: 'Kaju Katli',
    desc: 'Delicate cashew fudge cut into diamond shapes and finished with a shimmer of silver varq.',
    price: 149,
    img: kajuKatliPhoto,
    tag: '⭐ Classic Favourite',
  },
  {
    id: 'mohanthal',
    name: 'Mohanthal',
    desc: 'Rich traditional gram-flour fudge roasted in ghee and topped with almonds and pistachios.',
    price: 109,
    img: mohanthalPhoto,
    tag: '🌿 Desi Favourite',
  },
  {
    id: 'pista-barfi',
    name: 'Pista Barfi',
    desc: 'Creamy milk barfi layered with fragrant pistachios and gently finished with almonds.',
    price: 119,
    img: pistaBarfiPhoto,
    tag: '🌿 Desi Favourite',
  },
  {
    id: 'coconut-ladoo',
    name: 'Coconut Ladoo',
    desc: 'Soft coconut ladoos rolled in a delicate coating and garnished with pistachio and cherry.',
    price: 99,
    img: coconutLadooPhoto,
  },
  {
    id: 'boondi-ladoo',
    name: 'Boondi Ladoo',
    desc: 'Golden saffron boondi pearls bound into festive ladoos and finished with melon seeds.',
    price: 89,
    img: boondiLadooPhoto,
    tag: '🎉 Festival Special',
  },
  {
    id: 'milk-peda',
    name: 'Milk Peda',
    desc: 'Soft, milky peda with a smooth melt-in-the-mouth texture and a light pistachio garnish.',
    price: 89,
    img: milkPedaPhoto,
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    desc: 'Warm, golden milk dumplings soaked in fragrant sugar syrup and topped with pistachios.',
    price: 109,
    img: gulabJamunPhoto,
    tag: '🍬 Popular',
  },
  {
    id: 'kesar-sandesh',
    name: 'Kesar Sandesh',
    desc: 'Soft Bengali-style milk sweets infused with saffron and finished with pistachio garnish.',
    price: 119,
    img: kesarSandeshPhoto,
    tag: '🌿 Desi Favourite',
  },
  {
    id: 'gulab-jamun-rabri',
    name: 'Gulab Jamun Rabri',
    desc: 'Warm gulab jamun served in creamy saffron rabri with almonds and pistachios.',
    price: 149,
    img: gulabJamunRabriPhoto,
    tag: '👑 Royal',
  },
  {
    id: 'pink-coconut-roll',
    name: 'Pink Coconut Roll',
    desc: 'Soft pink coconut rolls with a delicate rose flavour and creamy nut-filled centre.',
    price: 99,
    img: pinkCoconutRollPhoto,
    tag: '🌹 Seasonal Special',
  },
  {
    id: 'gulab-jamun-sundae',
    name: 'Gulab Jamun Sundae',
    desc: 'Golden gulab jamun layered with vanilla ice cream, caramel, pistachios and rose petals.',
    price: 179,
    img: gulabJamunSundaePhoto,
    tag: '⭐ Must Try',
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
