import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Flame, Leaf } from 'lucide-react';

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  type: 'veg' | 'non-veg';
  category: string;
  img: string;
  tag?: string;
};

// Unsplash food images — reliable known photo IDs
const IMG = {
  paneerTikka:    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=480&h=320&fit=crop&auto=format',
  haraBhara:      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=480&h=320&fit=crop&auto=format',
  chickenTikka:   'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=480&h=320&fit=crop&auto=format',
  fishFry:        'https://images.unsplash.com/photo-1559847844-5315695dadae?w=480&h=320&fit=crop&auto=format',
  crispyCorn:     'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=480&h=320&fit=crop&auto=format',
  alooTikki:      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=480&h=320&fit=crop&auto=format',
  seekhKebab:     'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=480&h=320&fit=crop&auto=format',
  dahiSholey:     'https://images.unsplash.com/photo-1565557623262-b51c2513a1d5?w=480&h=320&fit=crop&auto=format',
  prawns:         'https://images.unsplash.com/photo-1559847844-5315695dadae?w=480&h=320&fit=crop&auto=format',
  vegShammi:      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=480&h=320&fit=crop&auto=format',
  dalMakhani:     'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=480&h=320&fit=crop&auto=format',
  paneerButter:   'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=480&h=320&fit=crop&auto=format',
  kadhaiPaneer:   'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=480&h=320&fit=crop&auto=format',
  malaiKofta:     'https://images.unsplash.com/photo-1565557623262-b51c2513a1d5?w=480&h=320&fit=crop&auto=format',
  mixVeg:         'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=480&h=320&fit=crop&auto=format',
  shahiPaneer:    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=480&h=320&fit=crop&auto=format',
  palakPaneer:    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=480&h=320&fit=crop&auto=format',
  chanaMasala:    'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=480&h=320&fit=crop&auto=format',
  alooGobhi:      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=480&h=320&fit=crop&auto=format',
  matarPaneer:    'https://images.unsplash.com/photo-1565557623262-b51c2513a1d5?w=480&h=320&fit=crop&auto=format',
  butterChicken:  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=480&h=320&fit=crop&auto=format',
  chickenCurry:   'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=480&h=320&fit=crop&auto=format',
  muttonRogan:    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=480&h=320&fit=crop&auto=format',
  kadhaiChicken:  'https://images.unsplash.com/photo-1565557623262-b51c2513a1d5?w=480&h=320&fit=crop&auto=format',
  chickenDoPyaza: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=480&h=320&fit=crop&auto=format',
  muttonKeema:    'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=480&h=320&fit=crop&auto=format',
  fishCurry:      'https://images.unsplash.com/photo-1559847844-5315695dadae?w=480&h=320&fit=crop&auto=format',
  prawnMasala:    'https://images.unsplash.com/photo-1559847844-5315695dadae?w=480&h=320&fit=crop&auto=format',
  eggCurry:       'https://images.unsplash.com/photo-1565557623262-b51c2513a1d5?w=480&h=320&fit=crop&auto=format',
  chickenSaag:    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=480&h=320&fit=crop&auto=format',
  naan:           'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=480&h=320&fit=crop&auto=format',
  garlicNaan:     'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=480&h=320&fit=crop&auto=format',
  roti:           'https://images.unsplash.com/photo-1626132647523-66a8c0dce5e8?w=480&h=320&fit=crop&auto=format',
  paratha:        'https://images.unsplash.com/photo-1626132647523-66a8c0dce5e8?w=480&h=320&fit=crop&auto=format',
  puri:           'https://images.unsplash.com/photo-1626132647523-66a8c0dce5e8?w=480&h=320&fit=crop&auto=format',
  missiRoti:      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=480&h=320&fit=crop&auto=format',
  jeeraRice:      'https://images.unsplash.com/photo-1536304993881-ff86e6d29d61?w=480&h=320&fit=crop&auto=format',
  vegBiryani:     'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=480&h=320&fit=crop&auto=format',
  chickenBiryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=480&h=320&fit=crop&auto=format',
  muttonBiryani:  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=480&h=320&fit=crop&auto=format',
  pulao:          'https://images.unsplash.com/photo-1536304993881-ff86e6d29d61?w=480&h=320&fit=crop&auto=format',
  eggBiryani:     'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=480&h=320&fit=crop&auto=format',
  gulabJamun:     'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=480&h=320&fit=crop&auto=format',
  rasmalai:       'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=480&h=320&fit=crop&auto=format',
  halwa:          'https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=480&h=320&fit=crop&auto=format',
  kheer:          'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=480&h=320&fit=crop&auto=format',
  iceCream:       'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=480&h=320&fit=crop&auto=format',
  gajarHalwa:     'https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=480&h=320&fit=crop&auto=format',
  lassi:          'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=480&h=320&fit=crop&auto=format',
  limeSoda:       'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=480&h=320&fit=crop&auto=format',
  chaas:          'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=480&h=320&fit=crop&auto=format',
  mangoLassi:     'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=480&h=320&fit=crop&auto=format',
  roseSharbat:    'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=480&h=320&fit=crop&auto=format',
  coldCoffee:     'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=480&h=320&fit=crop&auto=format',
  aamPanna:       'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=480&h=320&fit=crop&auto=format',
  jalJeera:       'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=480&h=320&fit=crop&auto=format',
};

const menuData: MenuItem[] = [
  // ── STARTERS ──────────────────────────────────────────────────────────────
  { id:'s1',  name:'Paneer Tikka',          desc:'Marinated cottage cheese char-grilled in tandoor with spiced yogurt', price:280, type:'veg',     category:'Starters',       img:IMG.paneerTikka,    tag:'Best Seller' },
  { id:'s2',  name:'Hara Bhara Kebab',      desc:'Spinach, green peas & potato patties cooked on tawa',                price:240, type:'veg',     category:'Starters',       img:IMG.haraBhara },
  { id:'s3',  name:'Chicken Tikka',         desc:'Tender boneless chicken in classic red spiced marinade',             price:320, type:'non-veg', category:'Starters',       img:IMG.chickenTikka,   tag:'Best Seller' },
  { id:'s4',  name:'Fish Amritsari',        desc:'Batter-fried fish flavored with ajwain and coriander',               price:380, type:'non-veg', category:'Starters',       img:IMG.fishFry },
  { id:'s5',  name:'Crispy Corn',           desc:'Golden fried corn kernels tossed in tangy spice mix',                price:220, type:'veg',     category:'Starters',       img:IMG.crispyCorn },
  { id:'s6',  name:'Aloo Tikki',            desc:'Spiced potato patties topped with chutneys and sev',                 price:180, type:'veg',     category:'Starters',       img:IMG.alooTikki },
  { id:'s7',  name:'Seekh Kebab',           desc:'Minced mutton with ginger, garlic & green chilli on skewers',        price:350, type:'non-veg', category:'Starters',       img:IMG.seekhKebab },
  { id:'s8',  name:'Dahi Ke Sholey',        desc:'Hung curd filled bread slices shallow fried to perfection',          price:260, type:'veg',     category:'Starters',       img:IMG.dahiSholey },
  { id:'s9',  name:'Prawns Koliwada',       desc:'Mumbai-style crispy fried prawns in spiced batter',                  price:420, type:'non-veg', category:'Starters',       img:IMG.prawns },
  { id:'s10', name:'Veg Shammi Kebab',      desc:'Lentil and vegetable patties with mint and coriander',               price:230, type:'veg',     category:'Starters',       img:IMG.vegShammi },

  // ── MAIN VEG ──────────────────────────────────────────────────────────────
  { id:'v1',  name:'Dal Makhani',           desc:'Black lentils slow-simmered overnight with butter and cream',        price:260, type:'veg',     category:'Main Veg',       img:IMG.dalMakhani,     tag:'Chef\'s Special' },
  { id:'v2',  name:'Paneer Butter Masala',  desc:'Cottage cheese cubes in velvety tomato cashew gravy',               price:310, type:'veg',     category:'Main Veg',       img:IMG.paneerButter,   tag:'Best Seller' },
  { id:'v3',  name:'Kadhai Paneer',         desc:'Paneer tossed with capsicum & ground kadhai spices',                 price:300, type:'veg',     category:'Main Veg',       img:IMG.kadhaiPaneer },
  { id:'v4',  name:'Malai Kofta',           desc:'Soft potato-cheese dumplings in rich saffron cashew gravy',         price:320, type:'veg',     category:'Main Veg',       img:IMG.malaiKofta },
  { id:'v5',  name:'Mix Veg',               desc:'Seasonal fresh vegetables cooked in a home-style masala',           price:240, type:'veg',     category:'Main Veg',       img:IMG.mixVeg },
  { id:'v6',  name:'Shahi Paneer',          desc:'Royal cottage cheese in aromatic Mughal-style gravy',               price:330, type:'veg',     category:'Main Veg',       img:IMG.shahiPaneer },
  { id:'v7',  name:'Palak Paneer',          desc:'Fresh spinach purée gravy with soft paneer cubes',                  price:290, type:'veg',     category:'Main Veg',       img:IMG.palakPaneer },
  { id:'v8',  name:'Chana Masala',          desc:'Chickpeas cooked in tangy tomato and spice base',                   price:250, type:'veg',     category:'Main Veg',       img:IMG.chanaMasala },
  { id:'v9',  name:'Aloo Gobhi',            desc:'Cauliflower and potato dry-cooked with cumin and turmeric',         price:220, type:'veg',     category:'Main Veg',       img:IMG.alooGobhi },
  { id:'v10', name:'Matar Paneer',          desc:'Green peas and paneer in thick onion-tomato masala',                price:280, type:'veg',     category:'Main Veg',       img:IMG.matarPaneer },

  // ── MAIN NON-VEG ──────────────────────────────────────────────────────────
  { id:'nv1', name:'Butter Chicken',        desc:'Tandoori chicken in silky sweet & creamy tomato gravy',             price:380, type:'non-veg', category:'Main Non-Veg',   img:IMG.butterChicken,  tag:'Best Seller' },
  { id:'nv2', name:'Chicken Curry',         desc:'Traditional home-style spiced thin chicken gravy',                  price:350, type:'non-veg', category:'Main Non-Veg',   img:IMG.chickenCurry },
  { id:'nv3', name:'Mutton Rogan Josh',     desc:'Kashmiri style slow-cooked lamb with aromatic whole spices',        price:450, type:'non-veg', category:'Main Non-Veg',   img:IMG.muttonRogan,    tag:'Chef\'s Special' },
  { id:'nv4', name:'Kadhai Chicken',        desc:'Spicy chicken cooked with chunky bell peppers in wok',              price:370, type:'non-veg', category:'Main Non-Veg',   img:IMG.kadhaiChicken },
  { id:'nv5', name:'Chicken Do Pyaza',      desc:'Chicken cooked twice with layered caramelized onions',              price:360, type:'non-veg', category:'Main Non-Veg',   img:IMG.chickenDoPyaza },
  { id:'nv6', name:'Mutton Keema',          desc:'Minced lamb cooked with peas in spiced tomato base',                price:430, type:'non-veg', category:'Main Non-Veg',   img:IMG.muttonKeema },
  { id:'nv7', name:'Fish Curry',            desc:'Coastal style fish in tangy tomato and mustard gravy',              price:400, type:'non-veg', category:'Main Non-Veg',   img:IMG.fishCurry },
  { id:'nv8', name:'Prawn Masala',          desc:'Juicy prawns cooked in spiced coconut-tomato gravy',               price:480, type:'non-veg', category:'Main Non-Veg',   img:IMG.prawnMasala },
  { id:'nv9', name:'Egg Curry',             desc:'Boiled eggs in a thick onion-tomato masala gravy',                  price:280, type:'non-veg', category:'Main Non-Veg',   img:IMG.eggCurry },
  { id:'nv10',name:'Chicken Saagwala',      desc:'Tender chicken pieces in fresh spinach and fenugreek gravy',        price:370, type:'non-veg', category:'Main Non-Veg',   img:IMG.chickenSaag },

  // ── BREADS ────────────────────────────────────────────────────────────────
  { id:'b1',  name:'Butter Naan',           desc:'Soft pillowy leavened bread brushed with butter from tandoor',      price:60,  type:'veg',     category:'Breads',         img:IMG.naan,           tag:'Must Try' },
  { id:'b2',  name:'Garlic Naan',           desc:'Naan topped with minced garlic, butter and fresh cilantro',         price:75,  type:'veg',     category:'Breads',         img:IMG.garlicNaan },
  { id:'b3',  name:'Tandoori Roti',         desc:'Whole wheat unleavened bread baked in tandoor',                     price:30,  type:'veg',     category:'Breads',         img:IMG.roti },
  { id:'b4',  name:'Lachha Paratha',        desc:'Multi-layered flaky whole wheat bread with crisp edges',            price:70,  type:'veg',     category:'Breads',         img:IMG.paratha },
  { id:'b5',  name:'Puri',                  desc:'Deep-fried puffed whole wheat bread, served hot',                   price:40,  type:'veg',     category:'Breads',         img:IMG.puri },
  { id:'b6',  name:'Missi Roti',            desc:'Besan-wheat flour flatbread with carom seeds and herbs',            price:50,  type:'veg',     category:'Breads',         img:IMG.missiRoti },

  // ── RICE / BIRYANI ────────────────────────────────────────────────────────
  { id:'r1',  name:'Jeera Rice',            desc:'Fragrant long-grain basmati tossed with golden cumin',              price:160, type:'veg',     category:'Rice/Biryani',   img:IMG.jeeraRice },
  { id:'r2',  name:'Veg Dum Biryani',       desc:'Layered basmati rice with saffron and seasonal vegetables',        price:280, type:'veg',     category:'Rice/Biryani',   img:IMG.vegBiryani },
  { id:'r3',  name:'Chicken Dum Biryani',   desc:'Hyderabadi style slow-cooked chicken and aromatic basmati',        price:380, type:'non-veg', category:'Rice/Biryani',   img:IMG.chickenBiryani, tag:'Best Seller' },
  { id:'r4',  name:'Mutton Biryani',        desc:'Spiced tender lamb pieces layered with saffron basmati',           price:460, type:'non-veg', category:'Rice/Biryani',   img:IMG.muttonBiryani,  tag:'Chef\'s Special' },
  { id:'r5',  name:'Veg Pulao',             desc:'Basmati rice cooked with whole spices and vegetables',              price:200, type:'veg',     category:'Rice/Biryani',   img:IMG.pulao },
  { id:'r6',  name:'Egg Biryani',           desc:'Boiled eggs layered with spiced basmati and fried onions',         price:320, type:'non-veg', category:'Rice/Biryani',   img:IMG.eggBiryani },

  // ── DESSERTS ──────────────────────────────────────────────────────────────
  { id:'d1',  name:'Gulab Jamun',           desc:'Soft milk solid dumplings soaked in rose-cardamom sugar syrup',    price:90,  type:'veg',     category:'Desserts',       img:IMG.gulabJamun,     tag:'Must Try' },
  { id:'d2',  name:'Rasmalai',              desc:'Spongy cottage cheese rounds in chilled saffron-flavored milk',   price:120, type:'veg',     category:'Desserts',       img:IMG.rasmalai },
  { id:'d3',  name:'Moong Dal Halwa',       desc:'Rich lentil pudding slow-cooked in desi ghee with dry fruits',    price:140, type:'veg',     category:'Desserts',       img:IMG.halwa },
  { id:'d4',  name:'Kheer',                 desc:'Creamy rice pudding with cardamom, saffron and pistachios',       price:110, type:'veg',     category:'Desserts',       img:IMG.kheer },
  { id:'d5',  name:'Ice Cream (2 scoops)',  desc:'Mango, Vanilla or Strawberry — served with wafer',               price:100, type:'veg',     category:'Desserts',       img:IMG.iceCream },
  { id:'d6',  name:'Gajar Ka Halwa',        desc:'Grated carrot pudding cooked in milk, sugar and ghee',            price:130, type:'veg',     category:'Desserts',       img:IMG.gajarHalwa },

  // ── BEVERAGES ─────────────────────────────────────────────────────────────
  { id:'bev1', name:'Sweet Lassi',          desc:'Thick churned yogurt drink with sugar and rose water',             price:80,  type:'veg',     category:'Beverages',      img:IMG.lassi,          tag:'Best Seller' },
  { id:'bev2', name:'Fresh Lime Soda',      desc:'Freshly squeezed lime with soda — sweet or salted',               price:70,  type:'veg',     category:'Beverages',      img:IMG.limeSoda },
  { id:'bev3', name:'Masala Chaas',         desc:'Spiced buttermilk with roasted cumin and green chilli',           price:60,  type:'veg',     category:'Beverages',      img:IMG.chaas },
  { id:'bev4', name:'Mango Lassi',          desc:'Thick yogurt blended with fresh Alphonso mango pulp',             price:100, type:'veg',     category:'Beverages',      img:IMG.mangoLassi },
  { id:'bev5', name:'Rose Sharbat',         desc:'Chilled rose syrup drink with basil seeds and lemon',             price:80,  type:'veg',     category:'Beverages',      img:IMG.roseSharbat },
  { id:'bev6', name:'Cold Coffee',          desc:'Rich blended cold coffee with vanilla ice cream',                 price:120, type:'veg',     category:'Beverages',      img:IMG.coldCoffee },
  { id:'bev7', name:'Aam Panna',            desc:'Raw mango cooler with cumin, black salt and mint',                price:80,  type:'veg',     category:'Beverages',      img:IMG.aamPanna },
  { id:'bev8', name:'Jal Jeera',            desc:'Tangy cumin-mint chilled drink — a perfect appetite starter',     price:70,  type:'veg',     category:'Beverages',      img:IMG.jalJeera },
];

const categories = ['Starters', 'Main Veg', 'Main Non-Veg', 'Breads', 'Rice/Biryani', 'Desserts', 'Beverages'];
const filters = ['All', 'Veg', 'Non-Veg'];

const tagColors: Record<string, string> = {
  'Best Seller':    'bg-amber-500 text-white',
  "Chef's Special": 'bg-primary text-white',
  'Must Try':       'bg-green-600 text-white',
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMenu = menuData.filter(item => {
    const matchCategory = item.category === activeCategory;
    const matchFilter =
      activeFilter === 'All' ? true :
      activeFilter === 'Veg' ? item.type === 'veg' :
      item.type === 'non-veg';
    return matchCategory && matchFilter;
  });

  return (
    <div className="pt-24 pb-20 bg-[#fdfaf5] min-h-screen">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Our Menu</h1>
          <motion.div
            className="h-1 bg-secondary mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prepared fresh daily using authentic recipes and premium ingredients. <br className="hidden md:block" />
            <span className="font-medium text-primary">54 dishes</span> across 7 categories.
          </p>
        </motion.div>

        {/* Veg / Non-Veg filter pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white p-1.5 rounded-full shadow-sm border border-border inline-flex gap-1">
            {filters.map(filter => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all',
                  activeFilter === filter
                    ? 'bg-primary text-white shadow'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="mb-10 overflow-x-auto pb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-2 min-w-max mx-auto justify-start md:justify-center px-2">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-medium border transition-all whitespace-nowrap',
                  activeCategory === category
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
                )}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.13)' }}
                  className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <motion.img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1565557623262-b51c2513a1d5?w=480&h=320&fit=crop';
                      }}
                    />
                    {/* Tag badge */}
                    {item.tag && (
                      <span className={cn(
                        'absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full',
                        tagColors[item.tag] ?? 'bg-gray-700 text-white'
                      )}>
                        {item.tag}
                      </span>
                    )}
                    {/* Veg / Non-Veg dot top-right */}
                    <div className={cn(
                      'absolute top-2 right-2 w-5 h-5 border-2 rounded bg-white flex items-center justify-center',
                      item.type === 'veg' ? 'border-green-600' : 'border-red-600'
                    )}>
                      <div className={cn(
                        'w-2.5 h-2.5 rounded-full',
                        item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'
                      )} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-foreground text-base leading-snug mb-1">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-3 line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {item.type === 'veg'
                          ? <><Leaf className="h-3 w-3 text-green-600" /> <span className="text-green-700 font-medium">Veg</span></>
                          : <><Flame className="h-3 w-3 text-red-500" /> <span className="text-red-600 font-medium">Non-Veg</span></>
                        }
                      </div>
                      <motion.span
                        className="text-lg font-bold text-primary font-serif"
                        whileHover={{ scale: 1.1 }}
                      >
                        ₹{item.price}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <p className="text-muted-foreground text-lg mb-4">No items found.</p>
                <button
                  onClick={() => setActiveFilter('All')}
                  className="text-primary font-medium hover:underline"
                >
                  Clear Filter
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Item count */}
        <motion.p
          className="text-center text-muted-foreground text-sm mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Showing <span className="font-semibold text-primary">{filteredMenu.length}</span> items
          {activeFilter !== 'All' && ` · ${activeFilter} only`}
          {' · '}{activeCategory}
        </motion.p>
      </div>
    </div>
  );
}
