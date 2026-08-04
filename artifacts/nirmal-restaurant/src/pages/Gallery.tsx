import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';
import { cn } from '@/lib/utils';

import galleryHallEvent    from '@assets/generated_images/gallery-hall-event.jpg';
import galleryEntrance     from '@assets/generated_images/gallery-entrance.jpg';
import galleryDecor        from '@assets/generated_images/gallery-decor.jpg';
import galleryHallEmpty    from '@assets/generated_images/gallery-hall-empty.jpg';
import galleryExtra        from '@assets/generated_images/gallery-extra.jpg';
import galleryNew3         from '@assets/generated_images/gallery-new-3.jpg';
import galleryNew4         from '@assets/generated_images/gallery-new-4.jpg';
import galleryNew5         from '@assets/generated_images/gallery-new-5.jpg';
import galleryB1           from '@assets/generated_images/gallery-b1.jpg';
import galleryB2           from '@assets/generated_images/gallery-b2.jpg';
import galleryB4           from '@assets/generated_images/gallery-b4.jpg';
import galleryB5           from '@assets/generated_images/gallery-b5.jpg';
import galleryB6           from '@assets/generated_images/gallery-b6.jpg';
import galleryB7           from '@assets/generated_images/gallery-b7.jpg';
import galleryB8           from '@assets/generated_images/gallery-b8.jpg';

type GalleryImage = { id: string; src: string; alt: string; category: 'Food' | 'Restaurant' | 'Events' };

const images: GalleryImage[] = [
  { id:'2',  src: galleryEntrance,    alt: 'Nirmal Family Restaurant — Welcome Entrance',  category:'Restaurant' },
  { id:'3',  src: galleryHallEmpty,   alt: 'Party Hall — Spacious Interior',               category:'Restaurant' },
  { id:'4',  src: galleryHallEvent,   alt: 'Grand Buffet Setup — Party Hall',              category:'Events'     },
  { id:'5',  src: galleryDecor,       alt: 'Beautiful Wall Decor & Floral Arrangement',    category:'Restaurant' },
  { id:'13', src: galleryNew3,        alt: 'Party Hall — Live Event Buffet',               category:'Events'     },
  { id:'14', src: galleryNew4,        alt: 'Nirmal Family Restaurant — Welcome Gate',      category:'Restaurant' },
  { id:'15', src: galleryNew5,        alt: 'Interior Wall Art & Floral Decor',             category:'Restaurant' },
  { id:'16', src: galleryB1,          alt: 'Restaurant Dining Hall — Live Event',          category:'Events'     },
  { id:'17', src: galleryB2,          alt: 'Banquet Hall — Corporate Gathering',           category:'Events'     },

  { id:'19', src: galleryB4,          alt: 'Nirmal Family Restaurant — Signage Art',       category:'Restaurant' },
  { id:'20', src: galleryB5,          alt: 'Dining Area — Interior Seating',               category:'Restaurant' },
  { id:'21', src: galleryB6,          alt: 'Nirmal Restaurant — Interior View',            category:'Restaurant' },
  { id:'22', src: galleryB7,          alt: 'Party Hall — Decorated Setup',                 category:'Events'     },
  { id:'23', src: galleryB8,          alt: 'Nirmal Restaurant — Ambience',                 category:'Restaurant' },
  { id:'12', src: galleryExtra,       alt: 'Hall Extra Setup',                             category:'Events'     },
];

const categories = ['All', 'Restaurant', 'Events'];

const categoryColors: Record<string, string> = {
  Restaurant: 'bg-blue-600',
  Events:     'bg-secondary',
  Food:       'bg-green-600',
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen]     = useState(false);
  const [currentIndex, setCurrentIndex]     = useState(0);
  const shouldReduce = useReducedMotion();

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => { setLightboxOpen(false); document.body.style.overflow = 'auto'; };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex(p => (p + 1) % filteredImages.length); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex(p => (p - 1 + filteredImages.length) % filteredImages.length); };

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Images className="h-4 w-4" /> Our Gallery
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Moments &amp; Memories</h1>
          <motion.div
            className="h-1 bg-secondary mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into the Nirmal experience — our space, our food, and the moments we help create.
          </p>
          {/* Count badge */}
          <motion.p
            className="text-sm text-muted-foreground mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-semibold text-primary">{filteredImages.length}</span> photos
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-6 py-2.5 rounded-full text-sm font-semibold border transition-all',
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
              )}
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="catIndicator"
                  className="sr-only"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -12 }}
                transition={{
                  duration: shouldReduce ? 0 : 0.4,
                  delay: shouldReduce ? 0 : (index % 9) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.18)' }}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer bg-muted mb-5"
                onClick={() => openLightbox(index)}
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover block"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  loading="lazy"
                />

                {/* Category pill */}
                <span className={cn(
                  'absolute top-3 left-3 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm',
                  categoryColors[image.category] ?? 'bg-black/50'
                )}>
                  {image.category}
                </span>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm p-3.5 rounded-full text-white border border-white/30"
                    initial={{ scale: 0.7 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <ZoomIn className="h-6 w-6" />
                  </motion.div>
                  <p className="text-white text-sm font-medium text-center px-6 leading-snug">{image.alt}</p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close */}
            <motion.button
              className="absolute top-5 right-5 text-white/70 hover:text-white p-2 z-10 bg-white/10 rounded-full"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-7 w-7" />
            </motion.button>

            {/* Prev */}
            <motion.button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full"
              onClick={prev}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-9 w-9" />
            </motion.button>

            {/* Image */}
            <div className="relative w-full max-w-5xl flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.94, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.94, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  src={filteredImages[currentIndex].src}
                  alt={filteredImages[currentIndex].alt}
                  className="max-w-full max-h-[82vh] object-contain shadow-2xl rounded-xl"
                />
              </AnimatePresence>
              <motion.div
                className="mt-4 text-white/70 text-sm text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {filteredImages[currentIndex].alt}&nbsp;·&nbsp;{currentIndex + 1} / {filteredImages.length}
              </motion.div>
            </div>

            {/* Next */}
            <motion.button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full"
              onClick={next}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-9 w-9" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
