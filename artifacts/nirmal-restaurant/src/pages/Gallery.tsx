import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

// Real restaurant photos
import galleryExteriorNight from '@assets/generated_images/gallery-exterior-night.jpg';
import galleryHallEvent from '@assets/generated_images/gallery-hall-event.jpg';
import galleryEntrance from '@assets/generated_images/gallery-entrance.jpg';
import galleryDecor from '@assets/generated_images/gallery-decor.jpg';
import galleryHallEmpty from '@assets/generated_images/gallery-hall-empty.jpg';
import galleryExtra from '@assets/generated_images/gallery-extra.jpg';

// AI-generated food photos
import dishBiryani from '@assets/generated_images/dish-biryani.jpg';
import dishButterChicken from '@assets/generated_images/dish-butter-chicken.jpg';
import dishPaneerTikka from '@assets/generated_images/dish-paneer-tikka.jpg';
import dishDalMakhani from '@assets/generated_images/dish-dal-makhani.jpg';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: 'Food' | 'Restaurant' | 'Events';
};

const images: GalleryImage[] = [
  { id: '1',  src: galleryExteriorNight, alt: 'Nirmal Restaurant — Building Exterior',      category: 'Restaurant' },
  { id: '2',  src: galleryEntrance,      alt: 'Nirmal Family Restaurant — Welcome Entrance', category: 'Restaurant' },
  { id: '3',  src: galleryHallEmpty,     alt: 'Party Hall — Spacious Interior',              category: 'Restaurant' },
  { id: '4',  src: galleryHallEvent,     alt: 'Grand Buffet Setup — Party Hall',             category: 'Events' },
  { id: '5',  src: galleryDecor,         alt: 'Beautiful Wall Decor & Floral Arrangement',   category: 'Restaurant' },
  { id: '6',  src: galleryExtra,         alt: 'Nirmal Restaurant',                           category: 'Restaurant' },
  { id: '7',  src: dishBiryani,          alt: 'Hyderabadi Dum Biryani',                      category: 'Food' },
  { id: '8',  src: dishButterChicken,    alt: 'Murgh Makhani',                               category: 'Food' },
  { id: '9',  src: dishPaneerTikka,      alt: 'Sizzling Paneer Tikka',                       category: 'Food' },
  { id: '10', src: dishDalMakhani,       alt: 'Rich Dal Makhani',                            category: 'Food' },
];

const categories = ['All', 'Restaurant', 'Events', 'Food'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Gallery</h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the Nirmal experience — our space, our food, and the moments we help create.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <div className="bg-white p-1.5 rounded-full shadow-sm border border-border inline-flex">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid — first real photo spans 2 columns */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={image.id}
                className={cn(
                  "group relative overflow-hidden rounded-lg cursor-pointer bg-muted",
                  // exterior photo gets a taller aspect to showcase the building
                  image.id === '1' ? "aspect-video sm:col-span-2 lg:col-span-2" : "aspect-square"
                )}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category pill */}
                <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {image.category}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
                    <ZoomIn className="h-6 w-6" />
                  </div>
                  <span className="text-white text-sm font-medium text-center px-4">{image.alt}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-10"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </button>

            <button
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 bg-black/20 hover:bg-black/40 rounded-full transition-all"
              onClick={prevImage}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <div
              className="relative w-full max-w-5xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                src={filteredImages[currentIndex].src}
                alt={filteredImages[currentIndex].alt}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-md"
              />
              <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/70 text-sm">
                {filteredImages[currentIndex].alt} &nbsp;·&nbsp; {currentIndex + 1} / {filteredImages.length}
              </div>
            </div>

            <button
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 bg-black/20 hover:bg-black/40 rounded-full transition-all"
              onClick={nextImage}
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
