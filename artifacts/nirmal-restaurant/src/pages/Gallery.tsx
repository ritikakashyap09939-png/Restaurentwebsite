import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, X } from 'lucide-react';

import diningCelebration from '@assets/WhatsApp_Image_2026-08-05_at_10.03.40_PM_(3)_1786041479374.jpeg';
import banquetDining from '@assets/WhatsApp_Image_2026-08-05_at_10.03.40_PM_(2)_1786041481390.jpeg';
import eveningExterior from '@assets/WhatsApp_Image_2026-08-05_at_10.03.40_PM_1786041494451.jpeg';
import restaurantFront from '@assets/WhatsApp_Image_2026-08-05_at_10.06.16_PM_1786041496891.jpeg';
import decoratedEntrance from '@assets/WhatsApp_Image_2026-07-22_at_10.40.32_PM_1786041694440.jpeg';
import colorfulBanquet from '@assets/WhatsApp_Image_2026-08-03_at_10.00.22_PM_1786041698497.jpeg';

const galleryImages = [
  {
    src: diningCelebration,
    alt: 'Elegant dining celebration in the banquet hall',
    label: 'Dining Celebration',
  },
  {
    src: banquetDining,
    alt: 'Guests enjoying a banquet dinner',
    label: 'Banquet Dining',
  },
  {
    src: eveningExterior,
    alt: 'Nirmal Family Restaurant exterior at sunset',
    label: 'Evening Exterior',
  },
  {
    src: restaurantFront,
    alt: 'Nirmal Family Restaurant and Party Hall entrance at night',
    label: 'Restaurant Front',
  },
  {
    src: decoratedEntrance,
    alt: 'Nirmal Family Restaurant and Party Hall decorated entrance',
    label: 'Decorated Entrance',
  },
  {
    src: colorfulBanquet,
    alt: 'Colorful banquet hall filled with guests',
    label: 'Banquet Hall',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
        </motion.div>

        <motion.div
          className="mb-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Images className="h-4 w-4 text-secondary" />
          <span><strong className="text-primary">{galleryImages.length}</strong> photos</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {galleryImages.map((image, index) => (
            <motion.button
              type="button"
              key={image.src}
              className="group relative overflow-hidden rounded-2xl bg-muted text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedImage(index)}
              aria-label={`Open ${image.label}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                loading={index > 1 ? 'lazy' : 'eager'}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-12 text-lg font-serif font-semibold text-white">
                {image.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image preview"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
