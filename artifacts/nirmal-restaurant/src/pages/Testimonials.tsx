import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  { id:1, name:'Rajesh Kumar',   city:'New Delhi',  rating:5, text:'Hosted my daughter\'s first birthday at the banquet hall. The arrangements were impeccable. The food was the highlight — every guest complimented the Dal Makhani. Truly feels like a family restaurant.' },
  { id:2, name:'Priya Sharma',   city:'Gurgaon',    rating:5, text:'The Butter Chicken here is legendary! I\'ve been coming to Nirmal for over 10 years, and the taste hasn\'t changed a bit. Consistent, hygienic, and always welcoming.' },
  { id:3, name:'Amit Desai',     city:'Noida',      rating:4, text:'Great ambiance for family dinners. The staff is very courteous and the service is prompt even on busy weekends. The Paneer Tikka is a must-try for vegetarians.' },
  { id:4, name:'Sneha Gupta',    city:'New Delhi',  rating:5, text:'We booked the hall for our corporate annual dinner. Professional service, excellent decor, and the customized menu was a hit with the team. Highly recommended for corporate events.' },
  { id:5, name:'Vikram Singh',   city:'Faridabad',  rating:5, text:'Authentic flavors that remind you of home-cooked meals but with that restaurant touch. The Biryani is perfectly spiced. Love the heritage haveli vibe of the interiors.' },
  { id:6, name:'Anjali Verma',   city:'New Delhi',  rating:4, text:'A reliable spot for Sunday lunches. The portions are generous and the prices are reasonable for the quality they offer. Make sure to reserve a table as it gets crowded!' },
  { id:7, name:'Dr. Mehra',      city:'Gurgaon',    rating:5, text:'I am very particular about hygiene and Nirmal always exceeds expectations. The open kitchen concept is great, and the flavors are incredibly rich without being heavy.' },
  { id:8, name:'Kavita Rao',     city:'New Delhi',  rating:5, text:'Our wedding reception was hosted here. The team took care of everything from catering to floral setups. It was stress-free and absolutely beautiful. Thank you Nirmal family!' },
  { id:9, name:'Suresh Nair',    city:'Gurugram',   rating:5, text:'Celebrated our anniversary dinner here. The staff decorated our table with flowers and the chef prepared a special dessert for us. Incredibly thoughtful service.' },
];

function AnimatedStars({ rating, delay = 0 }: { rating: number; delay?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s, i) => (
        <motion.div
          key={s}
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, delay: delay + i * 0.06 }}
        >
          <Star className={cn('h-4 w-4', i < rating ? 'text-secondary fill-secondary' : 'text-gray-200 fill-gray-200')} />
        </motion.div>
      ))}
    </div>
  );
}

function ReviewCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6, boxShadow: '0 20px 44px rgba(0,0,0,0.10)' }}
      className="break-inside-avoid bg-white p-7 rounded-2xl shadow-sm border border-border relative group transition-shadow mb-5 cursor-default"
    >
      {/* Animated quote icon */}
      <motion.div
        className="absolute top-5 right-5"
        animate={{ rotate: [0, 8, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
      >
        <Quote className="h-8 w-8 text-secondary/20 group-hover:text-secondary/50 transition-colors" />
      </motion.div>

      {/* Stars */}
      <div className="mb-4">
        <AnimatedStars rating={t.rating} delay={(index % 3) * 0.1} />
      </div>

      {/* Review text */}
      <p className="text-foreground/80 leading-relaxed mb-6 font-medium text-sm">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <motion.div
          className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold font-serif text-base shrink-0"
          whileHover={{ scale: 1.15, backgroundColor: 'var(--primary)', color: '#fff' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {t.name.charAt(0)}
        </motion.div>
        <div>
          <div className="font-bold text-sm text-foreground">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.city}</div>
        </div>
        {t.rating === 5 && (
          <motion.div
            className="ml-auto"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
          >
            <ThumbsUp className="h-4 w-4 text-secondary" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <div className="pt-24 pb-20 bg-[#fdfaf5] min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <motion.span
            className="inline-block text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What Guests Say
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Guest Book</h1>
          <motion.div
            className="h-1 bg-secondary mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Don't just take our word for it. Here is what our extended family has to say about their experiences.
          </p>

          {/* Rating Summary Card */}
          <motion.div
            className="inline-flex items-center gap-5 bg-white px-8 py-5 rounded-2xl shadow-md border border-border"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
            whileHover={{ scale: 1.03, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
          >
            <div className="text-center">
              <motion.div
                className="text-5xl font-bold text-primary font-serif"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                4.8
              </motion.div>
              <div className="text-xs text-muted-foreground mt-1">out of 5</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-left">
              <div className="flex mb-1.5">
                {[1,2,3,4,5].map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 300 }}
                  >
                    <Star className="h-5 w-5 text-secondary fill-secondary" />
                  </motion.div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground font-medium">Based on 1,200+ Reviews</div>
              <div className="text-xs text-muted-foreground">Google · Zomato · Swiggy</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Cards — masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {testimonials.map((t, i) => (
            <ReviewCard key={t.id} t={t} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground mb-4 text-sm">Had a great experience? Share your review!</p>
          <motion.a
            href="https://wa.me/919813954399"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-sm font-medium hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm"
          >
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            Leave a Review
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
