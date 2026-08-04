import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Flame, Leaf, Star, ChefHat, Sparkles } from 'lucide-react';

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

// ── IMAGE MAP ──────────────────────────────────────────────────────────────
const IMG = {
  // Starters
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
  // Main Veg
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
  // Main Non-Veg
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
  // Breads
  naan:           'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=480&h=320&fit=crop&auto=format',
  garlicNaan:     'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=480&h=320&fit=crop&auto=format',
  roti:           'https://images.unsplash.com/photo-1626132647523-66a8c0dce5e8?w=480&h=320&fit=crop&auto=format',
  paratha:        'https://images.unsplash.com/photo-1626132647523-66a8c0dce5e8?w=480&h=320&fit=crop&auto=format',
  puri:           'https://images.unsplash.com/photo-1626132647523-66a8c0dce5e8?w=480&h=320&fit=crop&auto=format',
  missiRoti:      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=480&h=320&fit=crop&auto=format',
  // Rice/Biryani
  jeeraRice:      'https://images.unsplash.com/photo-1536304993881-ff86e6d29d61?w=480&h=320&fit=crop&auto=format',
  vegBiryani:     'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=480&h=320&fit=crop&auto=format',
  chickenBiryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=480&h=320&fit=crop&auto=format',
  muttonBiryani:  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=480&h=320&fit=crop&auto=format',
  pulao:          'https://images.unsplash.com/photo-1536304993881-ff86e6d29d61?w=480&h=320&fit=crop&auto=format',
  eggBiryani:     'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=480&h=320&fit=crop&auto=format',
  // Desserts
  gulabJamun:     'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=480&h=320&fit=crop&auto=format',
  rasmalai:       'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=480&h=320&fit=crop&auto=format',
  halwa:          'https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=480&h=320&fit=crop&auto=format',
  kheer:          'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=480&h=320&fit=crop&auto=format',
  iceCream:       'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=480&h=320&fit=crop&auto=format',
  gajarHalwa:     'https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=480&h=320&fit=crop&auto=format',
  // Beverages
  lassi:          'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=480&h=320&fit=crop&auto=format',
  limeSoda:       'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=480&h=320&fit=crop&auto=format',
  chaas:          'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=480&h=320&fit=crop&auto=format',
  mangoLassi:     'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=480&h=320&fit=crop&auto=format',
  roseSharbat:    'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=480&h=320&fit=crop&auto=format',
  coldCoffee:     'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=480&h=320&fit=crop&auto=format',
  aamPanna:       'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=480&h=320&fit=crop&auto=format',
  jalJeera:       'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=480&h=320&fit=crop&auto=format',
  // Sweets
  rasgulle:       'https://images.unsplash.com/photo-1632149877166-f75d49000351?w=480&h=320&fit=crop&auto=format',
  barfi:          'https://images.unsplash.com/photo-1571197119738-37e8d8cc4680?w=480&h=320&fit=crop&auto=format',
  kajuKatli:      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=480&h=320&fit=crop&auto=format',
  jalebi:         'https://images.unsplash.com/photo-1601050690117-a62d48f4ac50?w=480&h=320&fit=crop&auto=format',
  ladoo:          'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=480&h=320&fit=crop&auto=format',
  kulfi:          'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=480&h=320&fit=crop&auto=format',
  iceCreamScoop:  'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=480&h=320&fit=crop&auto=format',
  chocoIceCream:  'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=480&h=320&fit=crop&auto=format',
  mangoIceCream:  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=480&h=320&fit=crop&auto=format',
  halwaPoori:     'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=480&h=320&fit=crop&auto=format',
  peda:           'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=480&h=320&fit=crop&auto=format',
  imarti:         'https://images.unsplash.com/photo-1601050690117-a62d48f4ac50?w=480&h=320&fit=crop&auto=format',
  shrikhand:      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=480&h=320&fit=crop&auto=format',
  rabdi:          'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=480&h=320&fit=crop&auto=format',
  sandesh:        'https://images.unsplash.com/photo-1632149877166-f75d49000351?w=480&h=320&fit=crop&auto=format',
  balushahi:      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=480&h=320&fit=crop&auto=format',
  ghevar:         'https://images.unsplash.com/photo-1601050690117-a62d48f4ac50?w=480&h=320&fit=crop&auto=format',
  cham:           'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=480&h=320&fit=crop&auto=format',
  brownie:        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=480&h=320&fit=crop&auto=format',
  pastry:         'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=480&h=320&fit=crop&auto=format',
  chocoCake:      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=480&h=320&fit=crop&auto=format',
  fruitCake:      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=480&h=320&fit=crop&auto=format',
  // Fast Food
  vegPizza:       'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=480&h=320&fit=crop&auto=format',
  paneerPizza:    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=480&h=320&fit=crop&auto=format',
  chickenPizza:   'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=480&h=320&fit=crop&auto=format',
  pepperoniPizza: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=480&h=320&fit=crop&auto=format',
  bbqPizza:       'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=480&h=320&fit=crop&auto=format',
  vegBurger:      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=480&h=320&fit=crop&auto=format',
  chickenBurger:  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=480&h=320&fit=crop&auto=format',
  doubleBurger:   'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=480&h=320&fit=crop&auto=format',
  vegSandwich:    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=480&h=320&fit=crop&auto=format',
  clubSandwich:   'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=480&h=320&fit=crop&auto=format',
  frenchFries:    'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=480&h=320&fit=crop&auto=format',
  vegWrap:        'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=480&h=320&fit=crop&auto=format',
  chickenWrap:    'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=480&h=320&fit=crop&auto=format',
  hotdog:         'https://images.unsplash.com/photo-1612392166886-ee8475b03af2?w=480&h=320&fit=crop&auto=format',
  nachos:         'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=480&h=320&fit=crop&auto=format',
  pasta:          'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=480&h=320&fit=crop&auto=format',
  macaroni:       'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=480&h=320&fit=crop&auto=format',
  tacos:          'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=480&h=320&fit=crop&auto=format',
  quesadilla:     'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=480&h=320&fit=crop&auto=format',
  momos:          'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=480&h=320&fit=crop&auto=format',
  springRoll:     'https://images.unsplash.com/photo-1544025162-d76694265947?w=480&h=320&fit=crop&auto=format',
  popcorn:        'https://images.unsplash.com/photo-1585831741640-c66fd4765e43?w=480&h=320&fit=crop&auto=format',
  onionRings:     'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=480&h=320&fit=crop&auto=format',
};

// ── MENU DATA ──────────────────────────────────────────────────────────────
const menuData: MenuItem[] = [
  // ── STARTERS ──────────────────────────────────────────────────────────────
  { id:'s1',  name:'Paneer Tikka',          desc:'Marinated cottage cheese char-grilled in tandoor with spiced yogurt', price:280, type:'veg',     category:'Starters', img:IMG.paneerTikka,   tag:'Best Seller' },
  { id:'s2',  name:'Hara Bhara Kebab',      desc:'Spinach, green peas & potato patties cooked on tawa',                price:240, type:'veg',     category:'Starters', img:IMG.haraBhara },
  { id:'s3',  name:'Chicken Tikka',         desc:'Tender boneless chicken in classic red spiced marinade',             price:320, type:'non-veg', category:'Starters', img:IMG.chickenTikka,  tag:'Best Seller' },
  { id:'s4',  name:'Fish Amritsari',        desc:'Batter-fried fish flavored with ajwain and coriander',               price:380, type:'non-veg', category:'Starters', img:IMG.fishFry },
  { id:'s5',  name:'Crispy Corn',           desc:'Golden fried corn kernels tossed in tangy spice mix',                price:220, type:'veg',     category:'Starters', img:IMG.crispyCorn },
  { id:'s6',  name:'Aloo Tikki',            desc:'Spiced potato patties topped with chutneys and sev',                 price:180, type:'veg',     category:'Starters', img:IMG.alooTikki },
  { id:'s7',  name:'Seekh Kebab',           desc:'Minced mutton with ginger, garlic & green chilli on skewers',        price:350, type:'non-veg', category:'Starters', img:IMG.seekhKebab },
  { id:'s8',  name:'Dahi Ke Sholey',        desc:'Hung curd filled bread slices shallow fried to perfection',          price:260, type:'veg',     category:'Starters', img:IMG.dahiSholey },
  { id:'s9',  name:'Prawns Koliwada',       desc:'Mumbai-style crispy fried prawns in spiced batter',                  price:420, type:'non-veg', category:'Starters', img:IMG.prawns },
  { id:'s10', name:'Veg Shammi Kebab',      desc:'Lentil and vegetable patties with mint and coriander',               price:230, type:'veg',     category:'Starters', img:IMG.vegShammi },

  // ── MAIN VEG ──────────────────────────────────────────────────────────────
  { id:'v1',  name:'Dal Makhani',           desc:'Black lentils slow-simmered overnight with butter and cream',        price:260, type:'veg', category:'Main Veg', img:IMG.dalMakhani,    tag:"Chef's Special" },
  { id:'v2',  name:'Paneer Butter Masala',  desc:'Cottage cheese cubes in velvety tomato cashew gravy',               price:310, type:'veg', category:'Main Veg', img:IMG.paneerButter,  tag:'Best Seller' },
  { id:'v3',  name:'Kadhai Paneer',         desc:'Paneer tossed with capsicum & ground kadhai spices',                 price:300, type:'veg', category:'Main Veg', img:IMG.kadhaiPaneer },
  { id:'v4',  name:'Malai Kofta',           desc:'Soft potato-cheese dumplings in rich saffron cashew gravy',         price:320, type:'veg', category:'Main Veg', img:IMG.malaiKofta },
  { id:'v5',  name:'Mix Veg',               desc:'Seasonal fresh vegetables cooked in a home-style masala',           price:240, type:'veg', category:'Main Veg', img:IMG.mixVeg },
  { id:'v6',  name:'Shahi Paneer',          desc:'Royal cottage cheese in aromatic Mughal-style gravy',               price:330, type:'veg', category:'Main Veg', img:IMG.shahiPaneer },
  { id:'v7',  name:'Palak Paneer',          desc:'Fresh spinach purée gravy with soft paneer cubes',                  price:290, type:'veg', category:'Main Veg', img:IMG.palakPaneer },
  { id:'v8',  name:'Chana Masala',          desc:'Chickpeas cooked in tangy tomato and spice base',                   price:250, type:'veg', category:'Main Veg', img:IMG.chanaMasala },
  { id:'v9',  name:'Aloo Gobhi',            desc:'Cauliflower and potato dry-cooked with cumin and turmeric',         price:220, type:'veg', category:'Main Veg', img:IMG.alooGobhi },
  { id:'v10', name:'Matar Paneer',          desc:'Green peas and paneer in thick onion-tomato masala',                price:280, type:'veg', category:'Main Veg', img:IMG.matarPaneer },

  // ── MAIN NON-VEG ──────────────────────────────────────────────────────────
  { id:'nv1', name:'Butter Chicken',        desc:'Tandoori chicken in silky sweet & creamy tomato gravy',             price:380, type:'non-veg', category:'Main Non-Veg', img:IMG.butterChicken,  tag:'Best Seller' },
  { id:'nv2', name:'Chicken Curry',         desc:'Traditional home-style spiced thin chicken gravy',                  price:350, type:'non-veg', category:'Main Non-Veg', img:IMG.chickenCurry },
  { id:'nv3', name:'Mutton Rogan Josh',     desc:'Kashmiri style slow-cooked lamb with aromatic whole spices',        price:450, type:'non-veg', category:'Main Non-Veg', img:IMG.muttonRogan,    tag:"Chef's Special" },
  { id:'nv4', name:'Kadhai Chicken',        desc:'Spicy chicken cooked with chunky bell peppers in wok',              price:370, type:'non-veg', category:'Main Non-Veg', img:IMG.kadhaiChicken },
  { id:'nv5', name:'Chicken Do Pyaza',      desc:'Chicken cooked twice with layered caramelized onions',              price:360, type:'non-veg', category:'Main Non-Veg', img:IMG.chickenDoPyaza },
  { id:'nv6', name:'Mutton Keema',          desc:'Minced lamb cooked with peas in spiced tomato base',                price:430, type:'non-veg', category:'Main Non-Veg', img:IMG.muttonKeema },
  { id:'nv7', name:'Fish Curry',            desc:'Coastal style fish in tangy tomato and mustard gravy',              price:400, type:'non-veg', category:'Main Non-Veg', img:IMG.fishCurry },
  { id:'nv8', name:'Prawn Masala',          desc:'Juicy prawns cooked in spiced coconut-tomato gravy',               price:480, type:'non-veg', category:'Main Non-Veg', img:IMG.prawnMasala },
  { id:'nv9', name:'Egg Curry',             desc:'Boiled eggs in a thick onion-tomato masala gravy',                  price:280, type:'non-veg', category:'Main Non-Veg', img:IMG.eggCurry },
  { id:'nv10',name:'Chicken Saagwala',      desc:'Tender chicken pieces in fresh spinach and fenugreek gravy',        price:370, type:'non-veg', category:'Main Non-Veg', img:IMG.chickenSaag },

  // ── BREADS ────────────────────────────────────────────────────────────────
  { id:'b1',  name:'Butter Naan',           desc:'Soft pillowy leavened bread brushed with butter from tandoor',      price:60,  type:'veg', category:'Breads', img:IMG.naan,      tag:'Must Try' },
  { id:'b2',  name:'Garlic Naan',           desc:'Naan topped with minced garlic, butter and fresh cilantro',         price:75,  type:'veg', category:'Breads', img:IMG.garlicNaan },
  { id:'b3',  name:'Tandoori Roti',         desc:'Whole wheat unleavened bread baked in tandoor',                     price:30,  type:'veg', category:'Breads', img:IMG.roti },
  { id:'b4',  name:'Lachha Paratha',        desc:'Multi-layered flaky whole wheat bread with crisp edges',            price:70,  type:'veg', category:'Breads', img:IMG.paratha },
  { id:'b5',  name:'Puri',                  desc:'Deep-fried puffed whole wheat bread, served hot',                   price:40,  type:'veg', category:'Breads', img:IMG.puri },
  { id:'b6',  name:'Missi Roti',            desc:'Besan-wheat flour flatbread with carom seeds and herbs',            price:50,  type:'veg', category:'Breads', img:IMG.missiRoti },

  // ── RICE / BIRYANI ────────────────────────────────────────────────────────
  { id:'r1',  name:'Jeera Rice',            desc:'Fragrant long-grain basmati tossed with golden cumin',              price:160, type:'veg',     category:'Rice/Biryani', img:IMG.jeeraRice },
  { id:'r2',  name:'Veg Dum Biryani',       desc:'Layered basmati rice with saffron and seasonal vegetables',        price:280, type:'veg',     category:'Rice/Biryani', img:IMG.vegBiryani },
  { id:'r3',  name:'Chicken Dum Biryani',   desc:'Hyderabadi style slow-cooked chicken and aromatic basmati',        price:380, type:'non-veg', category:'Rice/Biryani', img:IMG.chickenBiryani, tag:'Best Seller' },
  { id:'r4',  name:'Mutton Biryani',        desc:'Spiced tender lamb pieces layered with saffron basmati',           price:460, type:'non-veg', category:'Rice/Biryani', img:IMG.muttonBiryani,  tag:"Chef's Special" },
  { id:'r5',  name:'Veg Pulao',             desc:'Basmati rice cooked with whole spices and vegetables',              price:200, type:'veg',     category:'Rice/Biryani', img:IMG.pulao },
  { id:'r6',  name:'Egg Biryani',           desc:'Boiled eggs layered with spiced basmati and fried onions',         price:320, type:'non-veg', category:'Rice/Biryani', img:IMG.eggBiryani },

  // ── DESSERTS ──────────────────────────────────────────────────────────────
  { id:'d1',  name:'Gulab Jamun',           desc:'Soft milk solid dumplings soaked in rose-cardamom sugar syrup',    price:90,  type:'veg', category:'Desserts', img:IMG.gulabJamun,  tag:'Must Try' },
  { id:'d2',  name:'Rasmalai',              desc:'Spongy cottage cheese rounds in chilled saffron-flavored milk',   price:120, type:'veg', category:'Desserts', img:IMG.rasmalai },
  { id:'d3',  name:'Moong Dal Halwa',       desc:'Rich lentil pudding slow-cooked in desi ghee with dry fruits',    price:140, type:'veg', category:'Desserts', img:IMG.halwa },
  { id:'d4',  name:'Kheer',                 desc:'Creamy rice pudding with cardamom, saffron and pistachios',       price:110, type:'veg', category:'Desserts', img:IMG.kheer },
  { id:'d5',  name:'Ice Cream (2 scoops)',  desc:'Mango, Vanilla or Strawberry — served with wafer',               price:100, type:'veg', category:'Desserts', img:IMG.iceCream },
  { id:'d6',  name:'Gajar Ka Halwa',        desc:'Grated carrot pudding cooked in milk, sugar and ghee',            price:130, type:'veg', category:'Desserts', img:IMG.gajarHalwa },

  // ── BEVERAGES ─────────────────────────────────────────────────────────────
  { id:'bev1', name:'Sweet Lassi',          desc:'Thick churned yogurt drink with sugar and rose water',             price:80,  type:'veg', category:'Beverages', img:IMG.lassi,       tag:'Best Seller' },
  { id:'bev2', name:'Fresh Lime Soda',      desc:'Freshly squeezed lime with soda — sweet or salted',               price:70,  type:'veg', category:'Beverages', img:IMG.limeSoda },
  { id:'bev3', name:'Masala Chaas',         desc:'Spiced buttermilk with roasted cumin and green chilli',           price:60,  type:'veg', category:'Beverages', img:IMG.chaas },
  { id:'bev4', name:'Mango Lassi',          desc:'Thick yogurt blended with fresh Alphonso mango pulp',             price:100, type:'veg', category:'Beverages', img:IMG.mangoLassi },
  { id:'bev5', name:'Rose Sharbat',         desc:'Chilled rose syrup drink with basil seeds and lemon',             price:80,  type:'veg', category:'Beverages', img:IMG.roseSharbat },
  { id:'bev6', name:'Cold Coffee',          desc:'Rich blended cold coffee with vanilla ice cream',                 price:120, type:'veg', category:'Beverages', img:IMG.coldCoffee },
  { id:'bev7', name:'Aam Panna',            desc:'Raw mango cooler with cumin, black salt and mint',                price:80,  type:'veg', category:'Beverages', img:IMG.aamPanna },
  { id:'bev8', name:'Jal Jeera',            desc:'Tangy cumin-mint chilled drink — a perfect appetite starter',     price:70,  type:'veg', category:'Beverages', img:IMG.jalJeera },

  // ── SWEETS (50 items) ─────────────────────────────────────────────────────
  { id:'sw1',  name:'Rasgulla (4 pcs)',           desc:'Spongy soft cottage cheese balls soaked in light sugar syrup',           price:80,  type:'veg', category:'Sweets', img:IMG.rasgulle,     tag:'Must Try' },
  { id:'sw2',  name:'Kaju Katli (100g)',           desc:'Premium cashew fudge with silver vark — melts in the mouth',            price:180, type:'veg', category:'Sweets', img:IMG.kajuKatli,    tag:'Best Seller' },
  { id:'sw3',  name:'Milk Barfi (4 pcs)',          desc:'Rich khoya barfi with cardamom and pistachio garnish',                  price:120, type:'veg', category:'Sweets', img:IMG.barfi },
  { id:'sw4',  name:'Crispy Jalebi (200g)',        desc:'Crispy spiral fried dough soaked in warm saffron sugar syrup',          price:90,  type:'veg', category:'Sweets', img:IMG.jalebi,       tag:'Best Seller' },
  { id:'sw5',  name:'Motichoor Ladoo (2 pcs)',     desc:'Fine gram flour pearl ladoos with saffron and cardamom',                price:70,  type:'veg', category:'Sweets', img:IMG.ladoo },
  { id:'sw6',  name:'Besan Ladoo (2 pcs)',         desc:'Roasted gram flour ladoos made in pure desi ghee',                      price:60,  type:'veg', category:'Sweets', img:IMG.ladoo },
  { id:'sw7',  name:'Kesar Pista Kulfi',           desc:'Traditional saffron pistachio frozen dessert on stick',                 price:80,  type:'veg', category:'Sweets', img:IMG.kulfi,        tag:'Must Try' },
  { id:'sw8',  name:'Vanilla Ice Cream (2 scoops)',desc:'Creamy vanilla ice cream with wafer biscuit',                           price:80,  type:'veg', category:'Sweets', img:IMG.iceCreamScoop },
  { id:'sw9',  name:'Chocolate Ice Cream',         desc:'Rich dark chocolate ice cream with chocolate sauce drizzle',           price:90,  type:'veg', category:'Sweets', img:IMG.chocoIceCream },
  { id:'sw10', name:'Mango Ice Cream',             desc:'Fresh Alphonso mango flavoured ice cream — seasonal favourite',         price:90,  type:'veg', category:'Sweets', img:IMG.mangoIceCream },
  { id:'sw11', name:'Strawberry Ice Cream',        desc:'2 scoops of strawberry ice cream with fresh fruit topping',            price:90,  type:'veg', category:'Sweets', img:IMG.iceCreamScoop },
  { id:'sw12', name:'Gulab Jamun (2 pcs)',         desc:'Deep-fried milk dumplings in rose-cardamom sugar syrup',               price:70,  type:'veg', category:'Sweets', img:IMG.gulabJamun },
  { id:'sw13', name:'Rasmalai (2 pcs)',             desc:'Chilled cottage cheese rounds in saffron-flavored thickened milk',     price:110, type:'veg', category:'Sweets', img:IMG.rasmalai },
  { id:'sw14', name:'Gajar Ka Halwa',              desc:'Classic grated carrot pudding cooked in milk, sugar and ghee',         price:120, type:'veg', category:'Sweets', img:IMG.gajarHalwa },
  { id:'sw15', name:'Sooji Halwa + Puri',          desc:'Semolina pudding served with 2 hot puris — comfort combo',             price:100, type:'veg', category:'Sweets', img:IMG.halwaPoori },
  { id:'sw16', name:'Mathura Peda (4 pcs)',         desc:'Soft milk-solid sweets with cardamom, made in pure desi ghee',        price:100, type:'veg', category:'Sweets', img:IMG.peda },
  { id:'sw17', name:'Imarti (2 pcs)',               desc:'Delicate lentil-batter swirls fried and dipped in saffron syrup',     price:80,  type:'veg', category:'Sweets', img:IMG.imarti,       tag:'Must Try' },
  { id:'sw18', name:'Kesar Shrikhand',              desc:'Strained yogurt sweetened with sugar and saffron — served chilled',   price:90,  type:'veg', category:'Sweets', img:IMG.shrikhand },
  { id:'sw19', name:'Rabdi',                        desc:'Thickened sweetened milk with saffron, served with kesar',            price:110, type:'veg', category:'Sweets', img:IMG.rabdi },
  { id:'sw20', name:'Sandesh (4 pcs)',              desc:'Bengali cottage cheese sweet delicately flavored with rose',          price:100, type:'veg', category:'Sweets', img:IMG.sandesh },
  { id:'sw21', name:'Badam Halwa',                  desc:'Almond pudding slow-cooked in saffron milk and desi ghee',            price:160, type:'veg', category:'Sweets', img:IMG.halwa,        tag:"Chef's Special" },
  { id:'sw22', name:'Balushahi (2 pcs)',             desc:'Flaky deep-fried dough balls glazed with thick sugar syrup',         price:80,  type:'veg', category:'Sweets', img:IMG.balushahi },
  { id:'sw23', name:'Ghevar (1 pc)',                desc:'Rajasthani disc-shaped sweet topped with rabdi and dry fruits',       price:140, type:'veg', category:'Sweets', img:IMG.ghevar,       tag:'Best Seller' },
  { id:'sw24', name:'Cham Cham (2 pcs)',            desc:'Soft Bengali sweet rolls in sugar syrup, garnished with malai',      price:90,  type:'veg', category:'Sweets', img:IMG.cham },
  { id:'sw25', name:'Coconut Ladoo (2 pcs)',        desc:'Fresh grated coconut ladoos with cardamom and sugar',                price:70,  type:'veg', category:'Sweets', img:IMG.ladoo },
  { id:'sw26', name:'Chocolate Brownie',            desc:'Warm fudgy brownie with chocolate chips and vanilla ice cream',      price:130, type:'veg', category:'Sweets', img:IMG.brownie },
  { id:'sw27', name:'Red Velvet Pastry',            desc:'Moist red velvet cake slice with cream cheese frosting',             price:140, type:'veg', category:'Sweets', img:IMG.pastry,       tag:'New' },
  { id:'sw28', name:'Chocolate Truffle Cake',       desc:'Rich dark chocolate ganache cake — per slice with berry coulis',    price:150, type:'veg', category:'Sweets', img:IMG.chocoCake,    tag:'New' },
  { id:'sw29', name:'Black Forest Pastry',          desc:'Classic black forest cake slice with cherries and whipped cream',   price:140, type:'veg', category:'Sweets', img:IMG.fruitCake },
  { id:'sw30', name:'Pineapple Pastry',             desc:'Fluffy sponge cake with pineapple cream and fresh pineapple',       price:130, type:'veg', category:'Sweets', img:IMG.fruitCake },
  { id:'sw31', name:'Butterscotch Ice Cream',       desc:'Creamy butterscotch flavoured ice cream with crunchy praline',      price:90,  type:'veg', category:'Sweets', img:IMG.iceCreamScoop },
  { id:'sw32', name:'Kaju Anjeer Roll (100g)',      desc:'Stuffed cashew-fig rolls with cardamom and silver leaf',            price:200, type:'veg', category:'Sweets', img:IMG.kajuKatli },
  { id:'sw33', name:'Mango Kulfi',                  desc:'Alphonso mango kulfi on stick — smooth, creamy and chilled',        price:90,  type:'veg', category:'Sweets', img:IMG.kulfi },
  { id:'sw34', name:'Pista Kulfi',                  desc:'Rich pistachio kulfi on stick garnished with chopped pista',        price:90,  type:'veg', category:'Sweets', img:IMG.kulfi },
  { id:'sw35', name:'Chocolate Kulfi',              desc:'Dark cocoa kulfi on stick with chocolate chips',                    price:90,  type:'veg', category:'Sweets', img:IMG.kulfi },
  { id:'sw36', name:'Moong Dal Barfi (100g)',       desc:'Soft yellow lentil fudge with ghee, cardamom and dry fruits',      price:140, type:'veg', category:'Sweets', img:IMG.barfi },
  { id:'sw37', name:'Pista Barfi (100g)',           desc:'Green pistachio barfi with silver vark and rose petals',           price:180, type:'veg', category:'Sweets', img:IMG.barfi,        tag:'Best Seller' },
  { id:'sw38', name:'Coconut Barfi (100g)',         desc:'Sweet fresh coconut fudge with cardamom and a hint of rose',       price:130, type:'veg', category:'Sweets', img:IMG.barfi },
  { id:'sw39', name:'Rava Ladoo (2 pcs)',           desc:'Semolina ladoos made in ghee with coconut and cashews',            price:70,  type:'veg', category:'Sweets', img:IMG.ladoo },
  { id:'sw40', name:'Til Ladoo (2 pcs)',            desc:'Sesame and jaggery ladoos — traditional winter sweet',             price:60,  type:'veg', category:'Sweets', img:IMG.ladoo },
  { id:'sw41', name:'Doodh Jalebi',                 desc:'Crispy jalebi soaked in warm sweetened milk — a royal combo',     price:110, type:'veg', category:'Sweets', img:IMG.jalebi,       tag:'Must Try' },
  { id:'sw42', name:'Mysore Pak (100g)',            desc:'Crumbly gram flour fudge with generous ghee and cardamom',        price:150, type:'veg', category:'Sweets', img:IMG.peda },
  { id:'sw43', name:'Kalakand (100g)',              desc:'Grainy milk cake with saffron, cardamom and pistachio topping',   price:160, type:'veg', category:'Sweets', img:IMG.barfi },
  { id:'sw44', name:'Soan Papdi (100g)',            desc:'Light flaky cardamom sweet that melts in the mouth instantly',    price:100, type:'veg', category:'Sweets', img:IMG.peda },
  { id:'sw45', name:'Pantua (2 pcs)',               desc:'Bengali cousin of gulab jamun — fried chhena dipped in syrup',   price:80,  type:'veg', category:'Sweets', img:IMG.rasgulle },
  { id:'sw46', name:'Anjeer Roll (100g)',           desc:'Dried fig rolls stuffed with kaju and garnished with silver leaf', price:190, type:'veg', category:'Sweets', img:IMG.kajuKatli },
  { id:'sw47', name:'Choco Lava Cake',              desc:'Warm gooey chocolate cake with molten center, served with ice cream', price:160, type:'veg', category:'Sweets', img:IMG.brownie, tag:'New' },
  { id:'sw48', name:'Strawberry Cheesecake',        desc:'New York style cheesecake with fresh strawberry compote',         price:170, type:'veg', category:'Sweets', img:IMG.pastry },
  { id:'sw49', name:'Mango Halwa',                  desc:'Thick mango pudding cooked in desi ghee with cardamom',          price:130, type:'veg', category:'Sweets', img:IMG.halwa },
  { id:'sw50', name:'Khoya Ladoo (2 pcs)',          desc:'Milk solid ladoos with cardamom and dry fruit stuffing',         price:80,  type:'veg', category:'Sweets', img:IMG.ladoo,        tag:'Best Seller' },

  // ── FAST FOOD – PIZZA, BURGER, SANDWICH (50 items) ──────────────────────
  { id:'ff1',  name:'Margherita Pizza (7")',       desc:'Classic tomato sauce, mozzarella and fresh basil on thin crust',    price:220, type:'veg',     category:'Fast Food', img:IMG.vegPizza,      tag:'Best Seller' },
  { id:'ff2',  name:'Paneer Tikka Pizza (7")',     desc:'Spiced paneer chunks, capsicum and onion on cheesy base',            price:280, type:'veg',     category:'Fast Food', img:IMG.paneerPizza,   tag:"Chef's Special" },
  { id:'ff3',  name:'Veggie Delight Pizza (7")',   desc:'Loaded with fresh mushrooms, olives, peppers and corn',             price:260, type:'veg',     category:'Fast Food', img:IMG.vegPizza },
  { id:'ff4',  name:'Farm Fresh Pizza (7")',       desc:'Baby spinach, sun-dried tomatoes and bocconcini on pesto base',     price:270, type:'veg',     category:'Fast Food', img:IMG.vegPizza },
  { id:'ff5',  name:'Mexican Corn Pizza (7")',     desc:'Sweet corn, jalapeños, onion rings and Mexican salsa base',         price:260, type:'veg',     category:'Fast Food', img:IMG.bbqPizza },
  { id:'ff6',  name:'Double Cheese Pizza (7")',    desc:'Extra mozzarella, cheddar and parmesan on tomato base',             price:290, type:'veg',     category:'Fast Food', img:IMG.vegPizza,      tag:'Must Try' },
  { id:'ff7',  name:'Chicken BBQ Pizza (7")',      desc:'Smoky BBQ chicken, red onion and jalapeños on crispy crust',        price:350, type:'non-veg', category:'Fast Food', img:IMG.chickenPizza,  tag:'Best Seller' },
  { id:'ff8',  name:'Chicken Tikka Pizza (7")',    desc:'Tandoori chicken tikka with green chutney base and cheese',         price:370, type:'non-veg', category:'Fast Food', img:IMG.chickenPizza },
  { id:'ff9',  name:'Keema Pizza (7")',            desc:'Spiced minced chicken with onions and green chilli on pizza',       price:360, type:'non-veg', category:'Fast Food', img:IMG.chickenPizza },
  { id:'ff10', name:'Pepperoni Pizza (7")',        desc:'Classic pepperoni slices on tomato sauce with mozzarella',          price:380, type:'non-veg', category:'Fast Food', img:IMG.pepperoniPizza },
  { id:'ff11', name:'Margherita Pizza (12")',      desc:'Large classic pizza with mozzarella and fresh basil',               price:420, type:'veg',     category:'Fast Food', img:IMG.vegPizza },
  { id:'ff12', name:'Paneer Tikka Pizza (12")',    desc:'Large paneer tikka pizza loaded with spicy paneer and veggies',     price:520, type:'veg',     category:'Fast Food', img:IMG.paneerPizza },
  { id:'ff13', name:'Chicken BBQ Pizza (12")',     desc:'Large smoky BBQ chicken pizza — feeds 2 comfortably',              price:620, type:'non-veg', category:'Fast Food', img:IMG.chickenPizza,  tag:'Best Seller' },
  { id:'ff14', name:'Veg Supreme Pizza (12")',     desc:'Large pizza loaded with all veggies and extra cheese',              price:500, type:'veg',     category:'Fast Food', img:IMG.vegPizza },
  { id:'ff15', name:'Non-Veg Supreme Pizza (12")',desc:'Large pizza loaded with chicken, egg and all toppings',             price:680, type:'non-veg', category:'Fast Food', img:IMG.chickenPizza,  tag:"Chef's Special" },
  { id:'ff16', name:'Veg Burger',                  desc:'Crispy aloo-corn patty, lettuce, tomato and special sauce',         price:150, type:'veg',     category:'Fast Food', img:IMG.vegBurger },
  { id:'ff17', name:'Paneer Burger',               desc:'Grilled paneer patty with mint chutney, onions and coleslaw',       price:180, type:'veg',     category:'Fast Food', img:IMG.vegBurger,     tag:'Must Try' },
  { id:'ff18', name:'Mushroom Swiss Burger',       desc:'Sautéed mushrooms with melted Swiss cheese on toasted brioche',    price:200, type:'veg',     category:'Fast Food', img:IMG.vegBurger },
  { id:'ff19', name:'Crispy Corn Burger',          desc:'Crispy corn and cheese patty with honey mustard and lettuce',       price:170, type:'veg',     category:'Fast Food', img:IMG.vegBurger },
  { id:'ff20', name:'Double Cheese Veg Burger',    desc:'Two veggie patties stacked with double cheddar and special sauce',  price:220, type:'veg',     category:'Fast Food', img:IMG.doubleBurger },
  { id:'ff21', name:'Classic Chicken Burger',      desc:'Crispy fried chicken fillet with cheese and chipotle mayo',         price:220, type:'non-veg', category:'Fast Food', img:IMG.chickenBurger, tag:'Best Seller' },
  { id:'ff22', name:'Spicy Chicken Burger',        desc:'Fiery hot chicken patty with sriracha, pickles and coleslaw',       price:240, type:'non-veg', category:'Fast Food', img:IMG.chickenBurger },
  { id:'ff23', name:'Grilled Chicken Burger',      desc:'Tender grilled chicken with honey mustard and crisp lettuce',       price:250, type:'non-veg', category:'Fast Food', img:IMG.chickenBurger },
  { id:'ff24', name:'Double Chicken Burger',       desc:'Two chicken patties with cheese and special burger sauce',          price:300, type:'non-veg', category:'Fast Food', img:IMG.doubleBurger,  tag:'Must Try' },
  { id:'ff25', name:'Chicken Tikka Burger',        desc:'Tandoori chicken tikka patty with green chutney and onion rings',  price:260, type:'non-veg', category:'Fast Food', img:IMG.chickenBurger },
  { id:'ff26', name:'Veg Club Sandwich',           desc:'Triple-decker with cucumber, cheese, tomato and mustard',           price:160, type:'veg',     category:'Fast Food', img:IMG.vegSandwich },
  { id:'ff27', name:'Grilled Cheese Sandwich',     desc:'Paneer, veggies and cheese grilled in herbed butter bread',         price:140, type:'veg',     category:'Fast Food', img:IMG.vegSandwich },
  { id:'ff28', name:'Bombay Masala Toast',         desc:'Classic Bombay-style spiced veg and cheese toasted sandwich',       price:130, type:'veg',     category:'Fast Food', img:IMG.vegSandwich,   tag:'Best Seller' },
  { id:'ff29', name:'Paneer Grilled Sandwich',     desc:'Marinated paneer with capsicum and onion in toasted bread',         price:170, type:'veg',     category:'Fast Food', img:IMG.vegSandwich },
  { id:'ff30', name:'Corn Cheese Sandwich',        desc:'Sweet corn, cheese and herbs toasted in buttered bread',            price:150, type:'veg',     category:'Fast Food', img:IMG.vegSandwich },
  { id:'ff31', name:'Aloo Tikki Sandwich',         desc:'Spiced potato filling with chutneys in crisp grilled bread',        price:130, type:'veg',     category:'Fast Food', img:IMG.vegSandwich },
  { id:'ff32', name:'Chicken Club Sandwich',       desc:'Grilled chicken, egg, lettuce in a toasted triple-decker',          price:220, type:'non-veg', category:'Fast Food', img:IMG.clubSandwich },
  { id:'ff33', name:'Chicken Tikka Sandwich',      desc:'Tandoori chicken tikka with mint chutney and sliced onions',        price:200, type:'non-veg', category:'Fast Food', img:IMG.clubSandwich },
  { id:'ff34', name:'Chicken Cheese Melt',         desc:'Shredded spiced chicken with melted cheese on toasted bread',       price:210, type:'non-veg', category:'Fast Food', img:IMG.clubSandwich,  tag:'Must Try' },
  { id:'ff35', name:'BLT Sandwich',                desc:'Bacon, lettuce and tomato with chipotle mayo on sourdough',         price:230, type:'non-veg', category:'Fast Food', img:IMG.clubSandwich },
  { id:'ff36', name:'French Fries (Regular)',      desc:'Golden crispy fries with house seasoning and ketchup',              price:100, type:'veg',     category:'Fast Food', img:IMG.frenchFries },
  { id:'ff37', name:'French Fries (Large)',        desc:'Large golden fries with house seasoning and dipping sauce',          price:140, type:'veg',     category:'Fast Food', img:IMG.frenchFries,   tag:'Must Try' },
  { id:'ff38', name:'Peri Peri Fries',             desc:'Crispy fries tossed in fiery peri-peri spice mix',                  price:150, type:'veg',     category:'Fast Food', img:IMG.frenchFries },
  { id:'ff39', name:'Cheese Fries',                desc:'Thick-cut fries loaded with cheddar cheese sauce',                  price:160, type:'veg',     category:'Fast Food', img:IMG.frenchFries },
  { id:'ff40', name:'Loaded Nachos',               desc:'Crunchy tortilla chips with salsa, guacamole and cheese dip',       price:180, type:'veg',     category:'Fast Food', img:IMG.nachos,        tag:'Best Seller' },
  { id:'ff41', name:'Veg Wrap',                    desc:'Grilled paneer and veggies wrapped in a soft flavored tortilla',    price:170, type:'veg',     category:'Fast Food', img:IMG.vegWrap },
  { id:'ff42', name:'Chicken Wrap',                desc:'Shredded chicken tikka, lettuce and sriracha in whole-wheat wrap',  price:210, type:'non-veg', category:'Fast Food', img:IMG.chickenWrap },
  { id:'ff43', name:'Steamed Veg Momos (8 pcs)',   desc:'Tender steamed dumplings filled with spiced mixed vegetables',      price:150, type:'veg',     category:'Fast Food', img:IMG.momos,         tag:'Best Seller' },
  { id:'ff44', name:'Fried Veg Momos (8 pcs)',     desc:'Crispy deep-fried dumplings with spiced vegetable filling',         price:170, type:'veg',     category:'Fast Food', img:IMG.momos },
  { id:'ff45', name:'Chicken Momos (8 pcs)',        desc:'Steamed dumplings filled with seasoned minced chicken',             price:190, type:'non-veg', category:'Fast Food', img:IMG.momos },
  { id:'ff46', name:'Veg Spring Rolls (4 pcs)',    desc:'Crispy rolls stuffed with cabbage, carrot and glass noodles',       price:150, type:'veg',     category:'Fast Food', img:IMG.springRoll },
  { id:'ff47', name:'Chicken Spring Rolls (4 pcs)',desc:'Crunchy rolls filled with minced chicken and spiced veggies',       price:180, type:'non-veg', category:'Fast Food', img:IMG.springRoll },
  { id:'ff48', name:'Onion Rings (8 pcs)',          desc:'Beer-battered crispy golden onion rings with dipping sauce',        price:140, type:'veg',     category:'Fast Food', img:IMG.onionRings },
  { id:'ff49', name:'Pasta in Red Sauce',           desc:'Penne pasta in tangy tomato arrabiata sauce with herbs',            price:180, type:'veg',     category:'Fast Food', img:IMG.pasta },
  { id:'ff50', name:'Pasta in White Sauce',         desc:'Creamy béchamel pasta with mushrooms and parmesan',                price:190, type:'veg',     category:'Fast Food', img:IMG.pasta,         tag:'Must Try' },
  { id:'ff51', name:'Mac & Cheese',                 desc:'Elbow macaroni in velvety four-cheese sauce — comfort in a bowl',   price:200, type:'veg',     category:'Fast Food', img:IMG.macaroni },
  { id:'ff52', name:'Chicken Pasta Arrabbiata',     desc:'Spicy tomato pasta with grilled chicken strips and fresh basil',    price:230, type:'non-veg', category:'Fast Food', img:IMG.pasta },
  { id:'ff53', name:'Hot Dog',                      desc:'Grilled chicken sausage in a brioche bun with mustard and relish',  price:160, type:'non-veg', category:'Fast Food', img:IMG.hotdog },
  { id:'ff54', name:'Caramel Popcorn (Large)',      desc:'Buttery caramel-coated popcorn — perfect movie snack',              price:120, type:'veg',     category:'Fast Food', img:IMG.popcorn },
  { id:'ff55', name:'Masala Popcorn (Large)',       desc:'Spiced Indian masala flavored popcorn, freshly popped',             price:110, type:'veg',     category:'Fast Food', img:IMG.popcorn },
];

// ── CATEGORY CONFIG ────────────────────────────────────────────────────────
const categories = [
  { name: 'Starters',       emoji: '🔥' },
  { name: 'Main Veg',       emoji: '🌿' },
  { name: 'Main Non-Veg',   emoji: '🍗' },
  { name: 'Breads',         emoji: '🫓' },
  { name: 'Rice/Biryani',   emoji: '🍚' },
  { name: 'Sweets',         emoji: '🍬' },
  { name: 'Fast Food',      emoji: '🍕' },
  { name: 'Desserts',       emoji: '🍮' },
  { name: 'Beverages',      emoji: '🥤' },
];

const filters = ['All', 'Veg', 'Non-Veg'];

const tagColors: Record<string, string> = {
  'Best Seller':    'bg-amber-500 text-white',
  "Chef's Special": 'bg-primary text-white',
  'Must Try':       'bg-green-600 text-white',
  'New':            'bg-blue-500 text-white',
};

// ── ANIMATED CARD ─────────────────────────────────────────────────────────
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.14)' }}
      className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm flex flex-col group cursor-default"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <motion.img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1565557623262-b51c2513a1d5?w=480&h=320&fit=crop';
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tag badge */}
        {item.tag && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: Math.min(index * 0.05 + 0.15, 0.55) }}
            className={cn(
              'absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow',
              tagColors[item.tag] ?? 'bg-gray-700 text-white'
            )}
          >
            {item.tag}
          </motion.span>
        )}

        {/* Veg / Non-Veg indicator */}
        <div className={cn(
          'absolute top-2 right-2 w-5 h-5 border-2 rounded bg-white flex items-center justify-center shadow-sm',
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
        <h3 className="font-serif font-bold text-foreground text-base leading-snug mb-1 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-3 line-clamp-2">
          {item.desc}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-xs">
            {item.type === 'veg'
              ? <><Leaf className="h-3 w-3 text-green-600" /><span className="text-green-700 font-medium">Veg</span></>
              : <><Flame className="h-3 w-3 text-red-500" /><span className="text-red-600 font-medium">Non-Veg</span></>
            }
          </div>
          <motion.span
            className="text-lg font-bold text-primary font-serif"
            whileHover={{ scale: 1.12 }}
          >
            ₹{item.price}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────
export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMenu = menuData.filter(item => {
    const matchCategory = item.category === activeCategory;
    const matchFilter =
      activeFilter === 'All' ? true :
      activeFilter === 'Veg' ? item.type === 'veg' :
      item.type === 'non-veg';
    return matchCategory && matchFilter;
  });

  const currentCat = categories.find(c => c.name === activeCategory);

  return (
    <div className="pt-24 pb-20 bg-[#fdfaf5] min-h-screen">
      <div className="container mx-auto px-4">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating sparkle decoration */}
          <motion.div
            className="flex justify-center gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles className="h-5 w-5 text-secondary opacity-80" />
              </motion.div>
            ))}
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Our Menu</h1>
          <motion.div
            className="h-1 bg-secondary mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prepared fresh daily using authentic recipes and premium ingredients.{' '}
            <br className="hidden md:block" />
            <span className="font-medium text-primary">{menuData.length} dishes</span> across {categories.length} categories.
          </p>
        </motion.div>

        {/* ── Veg / Non-Veg filter ────────────────────────────────────── */}
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
                  'px-5 py-2 rounded-full text-sm font-medium transition-all relative',
                  activeFilter === filter
                    ? 'text-white shadow'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                {activeFilter === filter && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Category Tabs ────────────────────────────────────────────── */}
        <motion.div
          className="mb-10 overflow-x-auto pb-2 scrollbar-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-2 min-w-max mx-auto justify-start md:justify-center px-2">
            {categories.map(cat => (
              <motion.button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'px-4 py-2.5 rounded-full text-sm font-medium border transition-all whitespace-nowrap flex items-center gap-1.5',
                  activeCategory === cat.name
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
                )}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
                {activeCategory === cat.name && (
                  <motion.span
                    className="ml-1 bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {menuData.filter(i => i.category === cat.name).length}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Active category banner ───────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 mb-8 max-w-7xl mx-auto"
          >
            <span className="text-3xl">{currentCat?.emoji}</span>
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary">{activeCategory}</h2>
              <p className="text-sm text-muted-foreground">
                {filteredMenu.length} {activeFilter !== 'All' ? activeFilter.toLowerCase() + ' ' : ''}items available
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Special section header for Sweets & Fast Food ───────────── */}
        {(activeCategory === 'Sweets' || activeCategory === 'Fast Food') && (
          <motion.div
            key={activeCategory + '-banner'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto mb-8 rounded-2xl overflow-hidden"
          >
            <div className={cn(
              'p-5 flex items-center gap-4',
              activeCategory === 'Sweets'
                ? 'bg-gradient-to-r from-pink-50 to-amber-50 border border-pink-100'
                : 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100'
            )}>
              <div className="text-4xl">
                {activeCategory === 'Sweets' ? '🍬' : '🍕'}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ChefHat className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary uppercase tracking-wide">
                    {activeCategory === 'Sweets' ? 'Mithai & Desserts' : 'Pizza • Burger • Sandwich & More'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activeCategory === 'Sweets'
                    ? 'Traditional Indian sweets, ice creams, kulfis, cakes and mithai — 50+ choices to satisfy every sweet tooth'
                    : 'Street-style fast food, Italian classics, wraps, momos and more — 50+ options for every craving'}
                </p>
              </div>
              {/* Animated stars */}
              <div className="ml-auto hidden md:flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  >
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Menu Grid ────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item, index) => (
                <MenuCard key={item.id} item={item} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <p className="text-muted-foreground text-lg mb-4">No items found in this filter.</p>
                <button
                  onClick={() => setActiveFilter('All')}
                  className="text-primary font-medium hover:underline"
                >
                  Show All Items
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Item count footer ────────────────────────────────────────── */}
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
