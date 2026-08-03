import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Star, Utensils, Users, Music, ChefHat, Award, CalendarCheck } from 'lucide-react';
import heroBg from '@assets/generated_images/restaurant-exterior.jpg';
const banquetWedding = '/images/hall-buffet.jpg';
const weddingPhoto = '/images/wedding.jpg';
import dishBiryani from '@assets/generated_images/dish-biryani.jpg';
import dishPaneer from '@assets/generated_images/dish-paneer-tikka.jpg';
import dishButterChicken from '@assets/generated_images/dish-butter-chicken.jpg';

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ── Floating decorative dot ───────────────────────────────────────────────────
function FloatingDot({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-secondary/30 pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export default function Home() {
  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${heroBg})`, y: heroY }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        </motion.div>

        {/* Floating dots decoration */}
        <FloatingDot x="8%" y="20%" size={12} delay={0} />
        <FloatingDot x="80%" y="15%" size={8} delay={1} />
        <FloatingDot x="90%" y="70%" size={14} delay={2} />
        <FloatingDot x="5%" y="75%" size={6} delay={0.5} />

        <motion.div
          className="container relative z-20 mx-auto px-8 md:px-16 mt-16"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl text-left"
          >
            <motion.span
              variants={fadeInUp}
              className="text-secondary font-medium tracking-[0.3em] uppercase text-sm md:text-base block mb-4"
            >
              Tradition in Every Bite
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold mb-6 leading-tight drop-shadow-lg"
            >
              Nirmal Family{' '}
              <motion.span
                className="text-secondary inline-block"
                animate={{ textShadow: ['0 0 0px #d4a853', '0 0 20px #d4a853', '0 0 0px #d4a853'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Restaurant
              </motion.span>{' '}
              and Party Hall
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/90 mb-10 font-light drop-shadow"
            >
              A heritage of authentic Indian flavors, serving families with love, warmth, and spices passed down through generations.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="bg-primary text-white px-8 py-4 rounded-sm font-medium hover:bg-primary/90 transition-all shadow-lg text-lg min-w-[200px] text-center block"
                >
                  Reserve a Table
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/menu"
                  className="bg-transparent border border-white text-white px-8 py-4 rounded-sm font-medium hover:bg-white hover:text-black transition-all text-lg min-w-[200px] text-center block"
                >
                  View Menu
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-0.5 h-8 bg-white/40 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-primary text-white py-10"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: ChefHat, value: 25, suffix: '+', label: 'Years of Legacy' },
              { icon: Utensils, value: 150, suffix: '+', label: 'Signature Dishes' },
              { icon: Users, value: 500, suffix: '', label: 'Guests Capacity' },
              { icon: Award, value: 10, suffix: 'K+', label: 'Happy Families' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <stat.icon className="h-7 w-7 text-secondary mb-1" />
                </motion.div>
                <span className="text-3xl md:text-4xl font-serif font-bold">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-white/70 text-sm uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-background text-foreground relative overflow-hidden">
        {/* Background decoration */}
        <motion.div
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 pointer-events-none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">
              The Nirmal Experience
            </motion.h2>
            {/* Animated underline */}
            <motion.div
              className="h-1 bg-secondary mx-auto rounded-full mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              We believe dining is an event. That's why we bring the finest ingredients, masterful chefs, and an ambiance that makes you feel at home.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Utensils, title: 'Heritage Recipes', desc: 'Our spice blends are made in-house using recipes perfected over decades.' },
              { icon: Users, title: 'Family Atmosphere', desc: 'Warm, welcoming spaces designed for celebrations and togetherness.' },
              { icon: Star, title: 'Premium Quality', desc: 'Uncompromising hygiene standards and the freshest local produce.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                className="bg-white p-8 rounded-lg shadow-sm border border-border text-center cursor-default transition-shadow"
              >
                <motion.div
                  className="h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-serif font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Dishes ── */}
      <section className="py-20 bg-[#fdfaf5] border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <motion.div variants={fadeInLeft} className="max-w-2xl">
              <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Our Signatures</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Flavors to Remember</h2>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/menu" className="group flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors">
                Explore Full Menu{' '}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: dishBiryani, name: 'Hyderabadi Dum Biryani', desc: 'Slow-cooked fragrant basmati rice with tender marinated meat.' },
              { img: dishButterChicken, name: 'Murgh Makhani', desc: 'Classic butter chicken in a rich, creamy tomato and cashew gravy.' },
              { img: dishPaneer, name: 'Sizzling Paneer Tikka', desc: 'Cottage cheese marinated in yogurt and spices, char-grilled to perfection.' },
            ].map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow"
              >
                <div className="h-64 overflow-hidden relative">
                  <motion.img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-primary/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{dish.name}</h3>
                  <p className="text-muted-foreground">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banquet Hall Teaser ── */}
      <section className="bg-muted/40 overflow-hidden">
        <div className="w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="bg-white w-full p-10 md:p-20 shadow-xl border-y border-border relative"
          >
            {/* Animated background accent */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/5 pointer-events-none"
              initial={{ x: '100%' }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.span variants={fadeInUp} className="flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-sm mb-4">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Music className="h-4 w-4" />
              </motion.span>
              Celebrate With Us
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
              Nirmal Party Hall
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-foreground/80 mb-10 leading-relaxed max-w-3xl">
              Make your special moments unforgettable. From grand weddings to intimate birthday parties, our elegant banquet hall accommodates up to 500 guests with premium catering, decoration, and impeccable service.
            </motion.p>

            {/* Event type chips */}
            <motion.div variants={staggerContainer} className="flex flex-wrap gap-3 mb-10">
              {['Weddings', 'Birthdays', 'Corporate Events', 'Anniversaries', 'Engagements'].map((tag, i) => (
                <motion.span
                  key={tag}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.08, backgroundColor: 'var(--primary)', color: '#fff' }}
                  className="px-4 py-1.5 border border-primary/30 text-primary rounded-full text-sm font-medium cursor-default transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  href="/banquet"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-sm font-medium hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm"
                >
                  View Hall Details
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <CalendarCheck className="h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-16 bg-secondary text-[#1a0f0f] text-center overflow-hidden relative">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)' }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="container mx-auto px-4 relative z-10"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready for a memorable meal?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg mb-8 max-w-xl mx-auto opacity-90">
            Join us at Nirmal for lunch or dinner. Walk-ins are welcome, but reservations are recommended for weekends.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="bg-[#1a0f0f] text-secondary px-8 py-4 rounded-sm font-bold hover:bg-[#2c1f1f] transition-colors uppercase tracking-wider block">
                Book A Table
              </Link>
            </motion.div>
            <motion.a
              href="tel:+919876543210"
              className="flex items-center gap-2 font-bold text-lg hover:underline underline-offset-4"
              whileHover={{ scale: 1.05 }}
            >
              Or call +91 98765 43210
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
