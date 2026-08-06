import { motion } from 'framer-motion';
import { Images } from 'lucide-react';

export default function Gallery() {
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
          className="mx-auto flex min-h-[260px] max-w-2xl flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/50 px-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Images className="mb-4 h-10 w-10 text-secondary" />
          <h2 className="mb-2 text-2xl font-serif font-semibold text-primary">Gallery coming soon</h2>
          <p className="text-muted-foreground">We’re updating our photo gallery. Please check back soon.</p>
        </motion.div>
      </div>
    </div>
  );
}
